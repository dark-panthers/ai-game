from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Game, Image, ImageSet
from .serializers import GameSerializer, ImageSerializer, ImageSetSerializer
from api import serializers
import random

@api_view(['GET'])
def getGames(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getGame(request, pk):
    limit = int(request.GET.get('limit', 5))
    gameImageSets = ImageSet.objects.filter(game=pk)
    images = []
    
    for imageSet in gameImageSets:
        images.extend(imageSet.image.all())

    selected_images = random.sample(images, min(limit, len(images)))

    serializer = ImageSerializer(selected_images, many=True)
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



@api_view(['POST', 'GET'])
def imageSets(request):
    if request.method == 'GET':
        imageSets = ImageSet.objects.all()
        serializer = ImageSetSerializer(imageSets, many=True)
        return Response(serializer.data)
    serializer = serializers.ImageSetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)