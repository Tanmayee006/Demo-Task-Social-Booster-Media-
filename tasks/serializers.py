from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    days_until_due = serializers.SerializerMethodField()
    is_overdue = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'status', 
            'location', 'due_date', 'created_at', 'updated_at', 
            'completed_at', 'days_until_due', 'is_overdue'
        ]
    
    def get_days_until_due(self, obj):
        if obj.due_date:
            from django.utils import timezone
            delta = obj.due_date.date() - timezone.now().date()
            return delta.days
        return None
    
    def get_is_overdue(self, obj):
        if obj.due_date and obj.status != 'completed':
            from django.utils import timezone
            return obj.due_date < timezone.now()
        return False

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'title', 'description', 'priority', 'status', 
            'location', 'due_date'
        ]