from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', include('tasks.urls')),
    path('api/weather/', include('weather.urls')),
    path('api/reports/', include('reports.urls')),

    # Root URL → dashboard
    path('', TemplateView.as_view(template_name='dashboard.html'), name='home'),

    path('dashboard.html', TemplateView.as_view(template_name='dashboard.html'), name='dashboard'),
    path('reports.html', TemplateView.as_view(template_name='reports.html'), name='reports'),

]
