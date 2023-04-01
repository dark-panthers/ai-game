from django.urls import include, path
from . import views


urlpatterns = [
    path('games/', views.getGames, name="games"),
    path('games/<int:pk>', views.getGame, name="games"),
    path('imageset/', views.imageSets, name="imageset"),
    path('images/', views.images, name="images")
]
