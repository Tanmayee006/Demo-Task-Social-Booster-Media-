from django.urls import path
from .views import TaskSummaryView, TaskChartsView

urlpatterns = [
    path('summary/', TaskSummaryView.as_view(), name='task-summary'),
    path('charts/', TaskChartsView.as_view(), name='task-charts'),
]