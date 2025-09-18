from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from tasks.models import Task
from .services import WeatherService

class WeatherView(APIView):
    def get(self, request, city):
        """Get weather data for a specific city"""
        weather_data = WeatherService.get_weather_data(city)
        return Response(weather_data)

class TaskWeatherView(APIView):
    def get(self, request, task_id):
        """Get weather data for a task's location"""
        task = get_object_or_404(Task, id=task_id)
        
        if not task.location:
            return Response(
                {'error': 'Task has no location specified'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        weather_data = WeatherService.get_weather_data(task.location)
        
        # Add task information to the response
        response_data = {
            'task': {
                'id': task.id,
                'title': task.title,
                'location': task.location,
                'priority': task.priority,
                'status': task.status
            },
            'weather': weather_data
        }
        
        return Response(response_data)