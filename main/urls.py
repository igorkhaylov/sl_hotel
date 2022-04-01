from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("available_rooms/", views.av_rooms, name="available_rooms"),
]
