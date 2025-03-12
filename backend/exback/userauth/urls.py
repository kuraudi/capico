from django.contrib import admin
from django.urls import include, path
from django.urls import path
from . import views



urlpatterns = [
    path('', views.getMessage),
    path('register/', views.getData),
    path('logout/', views.user_logout),
   
]
