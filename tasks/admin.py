from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'priority', 'status', 'location', 'due_date', 'created_at']
    list_filter = ['priority', 'status', 'created_at', 'due_date']
    search_fields = ['title', 'description', 'location']
    list_editable = ['status', 'priority']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'priority', 'status')
        }),
        ('Location & Timing', {
            'fields': ('location', 'due_date'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',),
            'description': 'Automatically managed timestamps'
        })
    )
    
    readonly_fields = ['created_at', 'updated_at', 'completed_at']