from django.contrib import admin
from .models import WeatherData

@admin.register(WeatherData)
class WeatherDataAdmin(admin.ModelAdmin):
    list_display = ['city', 'temperature', 'humidity', 'description', 'created_at']
    list_filter = ['created_at', 'city']
    search_fields = ['city', 'description']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Location', {
            'fields': ('city',)
        }),
        ('Weather Conditions', {
            'fields': ('temperature', 'humidity', 'pressure', 'description', 'wind_speed', 'visibility')
        }),
        ('Timestamp', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        })
    )