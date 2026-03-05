from flask import Blueprint, request, jsonify  # pyre-ignore[21]
import requests  # pyre-ignore[21]

weather_bp = Blueprint("weather", __name__)

API_KEY = "YOUR_WEATHER_API_KEY"

def generate_climate_alerts(forecast):
    alerts = []

    for day in forecast:
        temp = day.get("temp", 0)
        rain = day.get("rain", 0)
        humidity = day.get("humidity", 0)
        wind = day.get("wind", 0)

        # Heavy rain / flood
        if rain >= 80:
            alerts.append({
                "type": "flood",
                "severity": "high",
                "title": "Heavy Rainfall Alert",
                "description": f"Expected rainfall of {rain} mm",
                "icon": "rain"
            })

        # Heatwave
        if temp >= 38:
            alerts.append({
                "type": "heat",
                "severity": "medium",
                "title": "Heatwave Warning",
                "description": f"Temperature may reach {temp}°C",
                "icon": "sun"
            })

        # Drought conditions
        if rain < 5 and humidity < 40:
            alerts.append({
                "type": "drought",
                "severity": "low",
                "title": "Dry Spell Warning",
                "description": "Very low rainfall and low humidity expected",
                "icon": "tree"
            })

        # Strong winds
        if wind > 40:
            alerts.append({
                "type": "storm",
                "severity": "medium",
                "title": "Strong Wind Warning",
                "description": f"Winds up to {wind} km/h expected",
                "icon": "wind"
            })

    return alerts

def generate_recommendations(alerts):
    tips = []

    for a in alerts:
        if a["type"] == "flood":
            tips.append("Ensure proper field drainage to avoid root rotting.")
            tips.append("Harvest matured crops early to avoid flood loss.")

        if a["type"] == "heat":
            tips.append("Irrigate during early morning or late evening.")
            tips.append("Use shade nets for vegetables during peak afternoon.")

        if a["type"] == "drought":
            tips.append("Use drip irrigation to minimize water loss.")
            tips.append("Mulching is recommended to retain soil moisture.")

        if a["type"] == "storm":
            tips.append("Support tall crops like banana, sugarcane.")
            tips.append("Secure polyhouse structures properly.")

    return tips



@weather_bp.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city", "Mysore")

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    forecast = []
    for item in data.get("list", []):
        entry = {
            "day": item["dt_txt"][:10],
            "temp": item["main"]["temp"],
            "humidity": item["main"]["humidity"],
            "rain": item.get("rain", {}).get("3h", 0),
            "wind": item["wind"]["speed"],
            "condition": item["weather"][0]["main"].lower()
        }
        forecast.append(entry)

    alerts = generate_climate_alerts(forecast)
    recommendations = generate_recommendations(alerts)

    return jsonify({
        "forecast": forecast,
        "alerts": alerts,
        "recommendations": recommendations
    })

# CROP WATER NEEDS (Base mm per day at optimal 25C)
CROP_WATER_NEEDS = {
    'rice': {'base': 12.0, 'temp_factor': 0.5, 'stage_multiplier': {'germination': 1.2, 'vegetative': 1.5, 'flowering': 2.0, 'fruiting': 1.8}},
    'sugarcane': {'base': 8.0, 'temp_factor': 0.4, 'stage_multiplier': {'germination': 1.0, 'vegetative': 1.6, 'flowering': 1.8, 'fruiting': 1.5}},
    'cotton': {'base': 6.0, 'temp_factor': 0.3, 'stage_multiplier': {'germination': 0.8, 'vegetative': 1.2, 'flowering': 1.5, 'fruiting': 1.0}},
    'wheat': {'base': 5.0, 'temp_factor': 0.2, 'stage_multiplier': {'germination': 0.9, 'vegetative': 1.3, 'flowering': 1.6, 'fruiting': 1.1}},
    'tomato': {'base': 5.5, 'temp_factor': 0.35, 'stage_multiplier': {'germination': 0.7, 'vegetative': 1.2, 'flowering': 1.7, 'fruiting': 1.9}},
    'potato': {'base': 4.5, 'temp_factor': 0.25, 'stage_multiplier': {'germination': 0.8, 'vegetative': 1.4, 'flowering': 1.6, 'fruiting': 1.3}}
}

@weather_bp.route("/irrigation", methods=["POST"])
def calculate_irrigation():
    data = request.json or {}
    crop = data.get("crop", "wheat").lower()
    stage = data.get("stage", "vegetative").lower()
    temp = float(data.get("temperature", 25.0))
    moisture = float(data.get("soilMoisture", 50.0))

    crop_profile = CROP_WATER_NEEDS.get(crop, CROP_WATER_NEEDS['wheat'])
    
    base_need = crop_profile['base']
    stage_mult = crop_profile['stage_multiplier'].get(stage, 1.0)
    temp_diff = max(0, temp - 25.0)
    temp_add = temp_diff * crop_profile['temp_factor']
    
    raw_need_mm = (base_need * stage_mult) + temp_add
    moisture_factor = (100 - moisture) / 50.0
    final_amount_mm = max(0.0, raw_need_mm * moisture_factor)
    
    freq = "every3"
    level = "low"
    if final_amount_mm > 15:
        freq = "daily"
        level = "high"
    elif final_amount_mm > 7:
        freq = "every2"
        level = "medium"

    percentage = min(100.0, (final_amount_mm / 25.0) * 100)
    
    tips = [
        f"The {stage} stage for {crop.title()} requires precise watering.",
        f"Current moisture is {moisture}%, adjusted need is {final_amount_mm:.1f} mm.",
        "Consider drip irrigation to maximize absorption." if final_amount_mm > 5 else "Light sprinkling is sufficient."
    ]

    return jsonify({
        "waterLevel": percentage,
        "amount": round(final_amount_mm, 1),
        "frequency": freq,
        "status": level,
        "tips": tips
    })
