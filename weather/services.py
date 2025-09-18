# services.py
from .models import WeatherData

class WeatherService:
    def save_weather(self, data):
        weather = WeatherData.objects.create(
            city=data["city"],
            temperature=data["temperature"],
            humidity=data["humidity"],
            pressure=data["pressure"],
            description=data["description"],
            wind_speed=data["wind_speed"],
            visibility=data.get("visibility", None)
        )
        return weather
