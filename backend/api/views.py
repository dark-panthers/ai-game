from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Game, Image, ImageSet
from .serializers import GameSerializer, ImageSerializer
from api import serializers
import random

@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getGame(request, pk):
    gameImageSets = ImageSet.objects.filter(game=pk)
    gameImageSet = gameImageSets[random.randint(0, len(gameImageSets)-1)]
    images = gameImageSet.image.all()
    
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)
