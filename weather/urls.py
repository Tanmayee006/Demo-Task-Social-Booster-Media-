from django.urls import path
from .views import WeatherView, TaskWeatherView

urlpatterns = [
    path('<str:city>/', WeatherView.as_view(), name='weather-city'),
    path('task/<int:task_id>/', TaskWeatherView.as_view(), name='task-weather'),
]