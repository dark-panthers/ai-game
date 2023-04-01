from django.urls import include, path
from . import views


urlpatterns = [
    path('games/', views.getGames, name="games"),
    path('games/<int:pk>/randomGameSet/', views.randomGameSet, name="games"),
    path('games/<int:pk>/possibleGameSets/', views.possibleGameSets, name="possibleGameSets"),
    path('uploadImageSets/', views.uploadImageSets, name="uploadImageSets"),
    path('images/', views.images, name="images")
]
