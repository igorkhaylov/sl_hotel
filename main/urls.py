from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("av_rooms/", views.av_rooms, name="av_rooms"),
]
