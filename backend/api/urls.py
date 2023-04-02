from django.urls import include, path, re_path
from . import views
from . import consumers


urlpatterns = [
    path('games/', views.getGames, name="game modes"),
    path('games/create', views.createGame, name="create"),
    path('games/<int:pk>', views.getGame, name="random game"),
    path('upload/<int:id>', views.uploadSet, name="upload"),
    path('multiplayer/create', views.createMultiplayerSession, name="multiplayer"),
]


websocket_urlpatterns = [
    re_path(r"ws/game/host/(?P<code>\w+)/(?P<nick>\w+)/$", consumers.HostConsumer.as_asgi()),
    re_path(r"ws/game/player/(?P<code>\w+)/(?P<nick>\w+)/$", consumers.PlayerConsumer.as_asgi()),
]