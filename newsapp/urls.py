from rest_framework import routers
from django.urls import path, include
from . import views

backend_router = routers.DefaultRouter()
backend_router.register('news', views.NewsViewSet)

urlpatterns = [
    path('api/', include(backend_router.urls)),
    path('news/', views.news),
    path('news/<int:pk>/', views.news_detail),
]