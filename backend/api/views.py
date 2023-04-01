from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Game, Image, ImageSet
from .serializers import GameSerializer, ImageSerializer, ImageSetSerializer, ImageSetSerializerNames
from api import serializers
import random

@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def randomGameSet(request, pk):
    limit = int(request.GET.get('limit', 5))    
    gameImageSets = ImageSet.objects.filter(game=pk)
    gameImageSet = gameImageSets[random.randint(0, len(gameImageSets)-1)]
    gameImages = gameImageSet.image.all()
    gameImages = random.sample(list(gameImages), min(limit, len(gameImages)))
    serializer = ImageSerializer(gameImages, many=True)
    return Response(serializer.data)
    


@api_view(['GET', 'POST'])
def images(request):
    if request.method == 'POST':
        serializer = serializers.ImageFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def possibleGameSets(request, pk):
    gameImageSets = ImageSet.objects.filter(game=pk)
    serializer = ImageSetSerializerNames(gameImageSets, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def uploadImageSets(request):
    serializer = serializers.ImageSetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)



@api_view(['GET'])
def imageSets(request):
    imageSets = ImageSet.objects.all()
    serializer = ImageSetSerializer(imageSets, many=True)
    return Response(serializer.data)
