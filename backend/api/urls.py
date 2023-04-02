from django.urls import include, path, re_path
from . import views
from . import consumers


urlpatterns = [
    path('games/', views.getGames, name="game modes"),
    path('games/create', views.createGame, name="create"),
    path('games/<int:pk>', views.getGame, name="random game"),
    path('upload/<int:id>', views.uploadSet, name="upload")
]


websocket_urlpatterns = [
    re_path(r"ws/game/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
]