from flask import Flask  # pyre-ignore[21]
from routes.auth import auth  # pyre-ignore[21]
from routes.crop_classification import crop_classify  # pyre-ignore[21]
from flask_cors import CORS  # pyre-ignore[21]

from routes.weather_routes import weather_bp  # pyre-ignore[21]
from routes.market_routes import market_bp  # pyre-ignore[21]
from routes.crop_routes import crop  # pyre-ignore[21]
from routes.chatbot_routes import chatbot_bp  # pyre-ignore[21]
from routes.wildlife_routes import wildlife_bp  # pyre-ignore[21]


app = Flask(__name__)
CORS(app)

app.register_blueprint(weather_bp)
app.register_blueprint(market_bp)
app.register_blueprint(auth)
app.register_blueprint(crop_classify)
app.register_blueprint(crop)
app.register_blueprint(chatbot_bp)
app.register_blueprint(wildlife_bp)

if __name__ == "__main__":
    app.run(debug=True)