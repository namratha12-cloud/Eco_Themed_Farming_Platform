from flask import Blueprint, request, jsonify  # pyre-ignore[21]
import random
import datetime

chatbot_bp = Blueprint("chatbot", __name__)

# --- AGRO KNOWLEDGE BASE ---
CROP_SEASON_DATA = {
    "en": {
        "rabi": ["Wheat", "Barley", "Gram", "Peas", "Mustard", "Lentil"],
        "kharif": ["Rice", "Maize", "Cotton", "Soybean", "Bajra", "Jowar"]
    },
    "kn": {
        "rabi": ["ಗೋಧಿ", "ಬಾರ್ಲಿ", "ಕಡಲೆ", "ಬಟಾಣಿ", "ಸಾಸಿವೆ", "ಹೆಸರು ಬೇಳೆ"],
        "kharif": ["ಅಕ್ಕಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಹತ್ತಿ", "ಸೋಯಾಬೀನ್", "ಸಜ್ಜೆ", "ಜೋಳ"]
    },
    "hi": {
        "rabi": ["गेंहू", "जौ", "चना", "मटर", "सरसों", "दाल"],
        "kharif": ["चावल", "मक्का", "कपास", "सोयाबीन", "बाजरा", "ज्वार"]
    }
}

RESPONSES = {
    "en": {
        "default": "Hello! I am KrishiSarthi AI. Ask me about seasonal crops, market prices, or scan your crops for diseases!",
        "no_message": "Hello! I didn't catch that. How can I help you today?",
        "market_match": "Currently, {term} prices{loc} are showing a strong trend according to recent Mandi reports. You can find the exact daily rates in our Market section!",
        "market_help": "I can help with market rates. Which crop or commodity are you asking about? (e.g., 'price of wheat')",
        "weather": "Weather conditions affect crops significantly. For detailed forecasts and climate-smart irrigation alerts, please check our Weather & Climate tab.",
        "season_recommend": "We are currently in the {season} window. I recommend planting {crops} for the best yield based on current climate trends.",
        "rabi_info": "Rabi season typically starts in October. Recommended crops are: {crops}.",
        "kharif_info": "Kharif season starts with the Monsoons (June). Best crops are: {crops}.",
        "fallbacks": [
            "That's an interesting question. While I'm still learning, I can give you advice on seasonal crops, market rates, or help you scan for plant diseases.",
            "I'm not exactly sure how to answer that yet. Try asking about current mandi prices or what to plant this season!",
            "Could you rephrase that? I'm best at market prices, weather alerts, and crop diagnosis."
        ]
    },
    "kn": {
        "default": "ನಮಸ್ಕಾರ! ನಾನು ಕೃಷಿಸಾರಥಿ AI. ಕಾಲೋಚಿತ ಬೆಳೆಗಳು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ ಅಥವಾ ಬೆಳೆ ರೋಗಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ!",
        "no_message": "ನಮಸ್ಕಾರ! ನೀವು ಹೇಳಿದ್ದು ನಮಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ನಾನು ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
        "market_match": "ಪ್ರಸ್ತುತ, {term} ಬೆಲೆಗಳು{loc} ಇತ್ತೀಚಿನ ಮಂಡಿ ವರದಿಗಳ ಪ್ರಕಾರ ಬಲವಾದ ಪ್ರವೃತ್ತಿಯನ್ನು ತೋರಿಸುತ್ತಿವೆ. ನಿಖರವಾದ ದೈನಂದಿನ ದರಗಳನ್ನು ನಮ್ಮ ಮಾರುಕಟ್ಟೆ ವಿಭಾಗದಲ್ಲಿ ನೀವು ಕಾಣಬಹುದು!",
        "market_help": "ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಯಾವ ಬೆಳೆ ಅಥವಾ ಪದಾರ್ಥದ ಬಗ್ಗೆ ಕೇಳುತ್ತಿದ್ದೀರಿ? (ಉದಾಹರಣೆಗೆ, 'ಗೋಧಿಯ ಬೆಲೆ')",
        "weather": "ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ಬೆಳೆಗಳ ಮೇಲೆ ಗಮನಾರ್ಹವಾಗಿ ಪರಿಣಾಮ ಬೀರುತ್ತವೆ. ವಿವರವಾದ ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ನೀರಾವರಿ ಎಚ್ಚರಿಕೆಗಳಿಗಾಗಿ, ದಯವಿಟ್ಟು ನಮ್ಮ ಹವಾಮಾನ ಟ್ಯಾಬ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ.",
        "season_recommend": "ನಾವು ಪ್ರಸ್ತುತ {season} ಹಂಗಾಮಿನಲ್ಲಿದ್ದೇವೆ. ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಉತ್ತಮ ಇಳುವರಿಗಾಗಿ ನಾನು {crops} ಬೆಳೆಯಲು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.",
        "rabi_info": "ರಬಿ ಹಂಗಾಮು ಸಾಮಾನ್ಯವಾಗಿ ಅಕ್ಟೋಬರ್‌ನಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು: {crops}.",
        "kharif_info": "ಖಾರಿಫ್ ಹಂಗಾಮು ಮುಂಗಾರಿನೊಂದಿಗೆ (ಜೂನ್) ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಉತ್ತಮ ಬೆಳೆಗಳು: {crops}.",
        "fallbacks": [
            "ಅದು ಆಸಕ್ತಿದಾಯಕ ಪ್ರಶ್ನೆ. ನಾನು ಇನ್ನೂ ಕಲಿಯುತ್ತಿದ್ದೇನೆ, ಆದರೆ ಕಾಲೋಚಿತ ಬೆಳೆಗಳು, ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ನಾನು ನಿಮಗೆ ಸಲಹೆ ನೀಡಬಲ್ಲೆ.",
            "ಅದಕ್ಕೆ ಹೇಗೆ ಉತ್ತರಿಸಬೇಕೆಂದು ನನಗೆ ಇನ್ನೂ ಖಚಿತವಾಗಿ ತಿಳಿದಿಲ್ಲ. ಪ್ರಸ್ತುತ ಮಂಡಿ ಬೆಲೆಗಳು ಅಥವಾ ಈ ಹಂಗಾಮಿನಲ್ಲಿ ಏನು ಬೆಳೆಯಬೇಕು ಎಂಬುದರ ಬಗ್ಗೆ ಕೇಳಲು ಪ್ರಯತ್ನಿಸಿ!",
            "ದಯವಿಟ್ಟು ಅದನ್ನು ಮರುಹೊಂದಿಸಿ ಹೇಳಬಹುದೇ? ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಬೆಳೆ ರೋಗ ಪತ್ತೆಹಚ್ಚುವಲ್ಲಿ ನಾನು ಉತ್ತಮವಾಗಿದ್ದೇನೆ."
        ]
    },
    "hi": {
        "default": "नमस्ते! मैं कृषिसारथी AI हूँ। मौसमी फसलों, बाजार की कीमतों के बारे में मुझसे पूछें, या अपनी फसलों के रोगों के लिए स्कैन करें!",
        "no_message": "नमस्ते! मुझे समझ नहीं आया। मैं आज आपकी क्या मदद कर सकता हूँ?",
        "market_match": "वर्तमान में, हाल की मंडी रिपोर्टों के अनुसार {term} की कीमतें{loc} मजबूत रुझान दिखा रही हैं। आप हमारे बाजार अनुभाग में सटीक दैनिक दरें पा सकते हैं!",
        "market_help": "मैं बाजार दरों में मदद कर सकता हूं। आप किस फसल या वस्तु के बारे में पूछ रहे हैं? (जैसे, 'गेहूं की कीमत')",
        "weather": "मौसम की स्थिति फसलों को महत्वपूर्ण रूप से प्रभावित करती है। विस्तृत पूर्वानुमान और सिंचाई अलर्ट के लिए, कृपया हमारे मौसम और जलवायु टैब की जांच करें।",
        "season_recommend": "हम वर्तमान में {season} सीजन में हैं। मैं वर्तमान जलवायु प्रवृत्तियों के आधार पर सर्वोत्तम उपज के लिए {crops} लगाने की सलाह देता हूं।",
        "rabi_info": "रबी का मौसम आमतौर पर अक्टूबर में शुरू होता है। अनुशंसಿತ फसलें हैं: {crops}।",
        "kharif_info": "खरीफ का मौसम मानसून (जून) के साथ शुरू होता है। सबसे अच्छी फसलें हैं: {crops}।",
        "fallbacks": [
            "यह एक दिलचस्प सवाल है। जब मैं अभी भी सीख रहा हूं, मैं आपको मौसमी फसलों, बाजार दरों पर सलाह दे सकता हूं या पौधों की बीमारियों के लिए स्कैन करने में आपकी मदद कर सकता हूं।",
            "मुझे अभी तक यह नहीं पता है कि इसका उत्तर कैसे दिया जाए। वर्तमान मंडी कीमतों या इस सीजन में क्या लगाया जाए, इसके बारे में पूछें!",
            "क्या आप उसे फिर से कह सकते हैं? मैं बाजार की कीमतों, मौसम की चेतावनी और फसल निदान में सबसे अच्छा हूं।"
        ]
    }
}

def get_current_season():
    month = datetime.datetime.now().month
    if 10 <= month or month <= 3:
        return "rabi"
    return "kharif"

@chatbot_bp.route("/chatbot", methods=["POST"])
def chat():
    data = request.json or {}
    message = str(data.get("message", "")).lower().strip()
    lang = str(data.get("lang", "en"))
    
    # Fallback to English if language not supported
    if lang not in RESPONSES:
        lang = "en"
    
    res = RESPONSES[lang]

    if not message:
        return jsonify({"message": str(res["no_message"])})

    # 1. Intent: MARKET/PRICE
    market_keywords = ["price", "market", "cost", "mandi", "rate", "sell", "buy", "ಬೆಲೆ", "ಮಾರುಕಟ್ಟೆ", "ಕಡಿಮೆ", "ದರ", "ಮಾರಾಟ", "ಖರೀದಿ", "कीमत", "बाजार", "मंडी", "दर", "बिक्री", "खरीद"]
    if any(word in message for word in market_keywords):
        commodity_map = {
            "en": {
                "wheat": ["wheat", "gehu", "kanaka"],
                "rice": ["rice", "paddy", "chawal"],
                "coconut": ["coconut", "nariyal"],
                "onion": ["onion", "pyaz"]
            },
            "kn": {
                "ಗೋಧಿ": ["ಗೋಧಿ", "ಗೋದಿ", "wheat"],
                "ಅಕ್ಕಿ": ["ಅಕ್ಕಿ", "ಭತ್ತ", "rice"],
                "ತೆಂಗಿನಕಾಯಿ": ["ತೆಂಗಿನಕಾಯಿ", "ತೆಂಗು", "coconut"],
                "ಈರುಳ್ಳಿ": ["ಈರುಳ್ಳಿ", "ಉಳ್ಳಾಗಡ್ಡಿ", "onion"]
            },
            "hi": {
                "गेहूं": ["गेहूं", "wheat"],
                "चावल": ["चावल", "धान", "rice"],
                "नारियल": ["नारियल", "coconut"],
                "प्याज": ["प्याज", "onion"]
            }
        }

        current_map = commodity_map.get(lang, {})
        matched_term = ""
        for key, aliases in current_map.items():
            if any(str(alias) in message for alias in aliases):
                matched_term = key
                break

        state_found = ""
        states_list = ["karnataka", "kamataka", "ಕರ್ನಾಟಕ", "कर्नाटक"]
        for s in states_list:
            if str(s) in message:
                if lang == "en":
                    state_found = "Karnataka"
                elif lang == "kn":
                    state_found = "ಕರ್ನಾಟಕ"
                else:
                    state_found = "कर्नाटक"
                break

        if matched_term:
            if state_found:
                if lang == "en":
                    loc_str = f" in {state_found}"
                elif lang == "kn":
                    loc_str = f" {state_found}ದಲ್ಲಿ"
                else:
                    loc_str = f" {state_found} में"
            else:
                loc_str = ""
            return jsonify({"message": str(res["market_match"]).format(term=matched_term, loc=loc_str)})
        else:
            return jsonify({"message": str(res["market_help"])})

    # 2. Intent: WEATHER
    weather_keywords = ["weather", "forecast", "rain", "temp", "ಹವಾಮಾನ", "ಮಳೆ", "ಗಾಳಿ", "ಬಿಸಿಲು", "मौसम", "पूर्वानुमान", "बारिश", "तापमान"]
    if any(str(word) in message for word in weather_keywords):
        return jsonify({"message": str(res["weather"])})

    # 3. Intent: CROP/SEASON
    crop_keywords = ["crop", "plant", "grow", "farm", "season", "seed", "ಬೆಳೆ", "ಸಸ್ಯ", "ಕೃಷಿ", "ಹಂಗಾಮು", "ಬೀಜ", "ಫಸಲು", "ಫಸಲವ", "फसल", "पौधा", "खेती", "सीजन", "सीज़न", "बीज"]
    if any(str(word) in message for word in crop_keywords):
        current_s = get_current_season()
        season_name = "Rabi" if current_s == "rabi" else "Kharif"
        if lang == "kn":
            season_name = "ರಬಿ" if current_s == "rabi" else "ಖಾರಿಫ್"
        elif lang == "hi":
            season_name = "रबी" if current_s == "rabi" else "खरीफ"
            
        crops_str = ", ".join(CROP_SEASON_DATA[lang][current_s])
        
        if any(str(w) in message for w in ["rabi", "ರಬಿ", "रबी"]):
            rabi_crops = ", ".join(CROP_SEASON_DATA[lang]["rabi"])
            return jsonify({"message": str(res["rabi_info"]).format(crops=rabi_crops)})
        elif any(str(w) in message for w in ["kharif", "ಖಾರಿಫ್", "खरीफ"]):
            kharif_crops = ", ".join(CROP_SEASON_DATA[lang]["kharif"])
            return jsonify({"message": str(res["kharif_info"]).format(crops=kharif_crops)})
        else:
            return jsonify({"message": str(res["season_recommend"]).format(season=season_name, crops=crops_str)})

    # 4. BASIC GREETINGS
    if any(str(word) in message for word in ["hi", "hello", "hey", "who are you", "ನಮಸ್ಕಾರ", "ಹಲೋ", "नमस्ते"]):
        return jsonify({"message": str(res["default"])})

    # Fallback
    return jsonify({"message": str(random.choice(res["fallbacks"]))})

