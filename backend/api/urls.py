from django.urls import include, path
from . import views


urlpatterns = [
    path('games/', views.getGames, name="game modes"),
    path('games/create', views.createGame, name="create"),
    path('games/<int:pk>', views.getGame, name="random game"),
    path('upload/<int:id>', views.uploadSet, name="upload")
]
