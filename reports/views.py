# from django.http import JsonResponse
# from tasks.models import Task
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.db.models import Count, Q
# from django.utils import timezone
# from datetime import timedelta, datetime
# from tasks.models import Task

# class TaskSummaryView(APIView):
#     def get(self, request):
#         """Get comprehensive task summary statistics"""
#         total_tasks = Task.objects.count()
        
#         # Status distribution
#         status_counts = Task.objects.values('status').annotate(count=Count('status'))
#         status_distribution = {item['status']: item['count'] for item in status_counts}
        
#         # Priority distribution
#         priority_counts = Task.objects.values('priority').annotate(count=Count('priority'))
#         priority_distribution = {item['priority']: item['count'] for item in priority_counts}
        
#         # Completion rate
#         completed_tasks = Task.objects.filter(status='completed').count()
#         completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
#         # Overdue tasks
#         overdue_tasks = Task.objects.filter(
#             due_date__lt=timezone.now(),
#             status__in=['pending', 'in_progress']
#         ).count()
        
#         return Response({
#             'total_tasks': total_tasks,
#             'status_distribution': status_distribution,
#             'priority_distribution': priority_distribution,
#             'completion_rate': round(completion_rate, 2),
#             'overdue_tasks': overdue_tasks,
#         })

# class TaskChartsView(APIView):
#     def get(self, request):
#         """Get data formatted for charts"""
        
#         # Task completion trend over last 30 days
#         end_date = timezone.now().date()
#         start_date = end_date - timedelta(days=30)
        
#         completion_trend = []
#         current_date = start_date
#         while current_date <= end_date:
#             completed_count = Task.objects.filter(
#                 completed_at__date=current_date
#             ).count()
#             completion_trend.append({
#                 'date': current_date.strftime('%Y-%m-%d'),
#                 'completed': completed_count
#             })
#             current_date += timedelta(days=1)
        
#         # Priority distribution for pie chart
#         priority_data = []
#         priorities = ['low', 'medium', 'high', 'urgent']
#         colors = ['#28a745', '#17a2b8', '#ffc107', '#dc3545']
        
#         for i, priority in enumerate(priorities):
#             count = Task.objects.filter(priority=priority).count()
#             priority_data.append({
#                 'label': priority.title(),
#                 'value': count,
#                 'color': colors[i]
#             })
        
#         # Status distribution for bar chart
#         status_data = []
#         statuses = ['pending', 'in_progress', 'completed', 'cancelled']
#         status_colors = ['#6c757d', '#007bff', '#28a745', '#dc3545']
        
#         for i, status in enumerate(statuses):
#             count = Task.objects.filter(status=status).count()
#             status_data.append({
#                 'label': status.replace('_', ' ').title(),
#                 'value': count,
#                 'color': status_colors[i]
#             })
        
#         # Tasks by location
#         location_data = Task.objects.exclude(location='').values('location').annotate(
#             count=Count('location')
#         ).order_by('-count')[:10]
        
#         return Response({
#             'completion_trend': completion_trend,
#             'priority_distribution': priority_data,
#             'status_distribution': status_data,
#             'location_distribution': list(location_data)
#         })

# def reports_api(request):
#     total = Task.objects.count()
#     completed = Task.objects.filter(status="completed").count()
#     pending = Task.objects.filter(status="pending").count()
#     return JsonResponse({
#         "total": total,
#         "completed": completed,
#         "pending": pending,
#     })


from django.http import JsonResponse
from tasks.models import Task
from django.db.models import Count

# Task Status API
def task_status(request):
    status_counts = (
        Task.objects.values("status")
        .annotate(count=Count("status"))
        .order_by("status")
    )

    data = {}
    for entry in status_counts:
        status = entry["status"].capitalize()
        data[status] = entry["count"]

    return JsonResponse(data)

# Top Locations API
def top_locations(request):
    location_counts = (
        Task.objects.values("location")
        .annotate(count=Count("location"))
        .order_by("-count")[:5]   # Top 5
    )

    data = {}
    for entry in location_counts:
        data[entry["location"]] = entry["count"]

    return JsonResponse(data)
