from django.db import models

class WeatherData(models.Model):
    city = models.CharField(max_length=100)
    temperature = models.FloatField()
    humidity = models.IntegerField()
    pressure = models.FloatField()
    description = models.CharField(max_length=200)
    wind_speed = models.FloatField()
    visibility = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Weather Data"

    def __str__(self):
        return f"{self.city} - {self.temperature}°C - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
