from flask import Blueprint, request, jsonify  # pyre-ignore[21]
import requests  # pyre-ignore[21]
from difflib import get_close_matches

import time

market_bp = Blueprint("market", __name__)

API_KEY = "579b464db66ec23bdd00000133b7171dbff644fc56fcaf9edfb59f18"
BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

# Global cache to ensure lightning fast response (<0.1s after first load)
market_cached_records = []
market_last_updated = 0
CACHE_EXPIRY = 21600  # 6 hours

def fetch_raw_records(limit=500):
    global market_cached_records, market_last_updated
    now = time.time()
    
    # If cache is valid, return it immediately (under 1ms response)
    if market_cached_records and (now - market_last_updated < CACHE_EXPIRY):
        return market_cached_records

    try:
        url = f"{BASE_URL}?api-key={API_KEY}&format=json&limit={limit}"
        r = requests.get(url, timeout=5)
        data = r.json()
        records = data.get("records", [])
        if records:
            market_cached_records = records
            market_last_updated = now
        return records
    except Exception as e:
        print(f"Cache refresh failed: {e}")
        return market_cached_records # Return stale cache on error


@market_bp.route("/market", methods=["GET"])
def get_market_data():
    commodity = request.args.get("commodity", "").strip()
    state = request.args.get("state", "").strip()
    district = request.args.get("district", "").strip()

    if not commodity or not state:
        return jsonify({"error": "commodity and state are required"}), 400

    # Step 1 — Load ~500 records
    records = fetch_raw_records()

    if not records:
        return jsonify({"error": "API returned no records"}), 502

    # Step 2 — Filter by state
    state_records = [r for r in records if r["state"].lower() == state.lower()]

    if not state_records:
        return jsonify({"message": "No records for this state"}), 404

    # Step 3 — Commodity fuzzy match
    all_commodities = sorted({r["commodity"] for r in state_records})
    best_match = get_close_matches(commodity, all_commodities, n=1, cutoff=0.3)

    if not best_match:
        return jsonify({"message": f"No commodity close to '{commodity}'"}), 404

    commodity_matched = best_match[0]
    filtered = [r for r in state_records if r["commodity"] == commodity_matched]

    # Step 4 — Optional district fuzzy match
    if district:
        all_districts = sorted({r["district"] for r in filtered})
        district_match = get_close_matches(district, all_districts, n=1, cutoff=0.3)
        if district_match:
            district_matched = district_match[0]
            filtered = [r for r in filtered if r["district"] == district_matched]

    if not filtered:
        return jsonify({
            "message": "Commodity found, but no matching district. Showing state-wide results.",
            "commodity_used": commodity_matched,
            "results": state_records
        })

    return jsonify({
        "commodity_used": commodity_matched,
        "count": len(filtered),
        "results": filtered
    })