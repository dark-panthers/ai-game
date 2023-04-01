from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Game, Image, Set
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
    gameImageSets = Set.objects.filter(game=pk)
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



@api_view(['GET'])
def imageSets(request):
    if request.method == 'GET':
        imageSets = Set.objects.all()
        serializer = ImageSetSerializer(imageSets, many=True)
        return Response(serializer.data)
    serializer = serializers.ImageSetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(["POST"])
def uploadSet(request, id):
    image_set = Set(game_id=id)
    image_set.save()

    raw_images = request.FILES.getlist('media')
    for i, raw_image in enumerate(raw_images):
        img = Image(set_id=image_set.id, prompt=f"Prompt {i}", image=raw_image)
        img.save()

    return Response({"status": "ok"})