from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Game, Image, Set, Session, Player, Vote, Round
from .serializers import GameSerializer, ImageSerializer, SetSerializer
from api import serializers
from random import choice, sample
import random
import string


@api_view(["GET"])
def getGames(request):
    """Get all game modes."""
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def createGame(request):
    """Create a new game mode."""
    serializer = serializers.GameFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)



@api_view(["GET"])
def getGame(request, pk):
    """Get a random set of images for a game mode.

    pk: the id of the game mode to get the images for
    """
    sets_pks = Set.objects.filter(game_id=pk).values_list('pk', flat=True)
    random_set_pk = choice(sets_pks)

    images = list(Image.objects.filter(set_id=random_set_pk))

    limit = request.GET.get("limit") or 4
    limit = min(limit, len(images))

    selected_images = sample(images, limit)
    serializer = ImageSerializer(selected_images, many=True)
    return Response(serializer.data)


# unused for now 
@api_view(["GET", "POST"])
def images(request):
    """Get all images or upload a new image"""
    if request.method == "POST":
        serializer = serializers.ImageFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def uploadSet(request, id):
    """Upload a set of images for a game mode.

    id: the id of the game mode to upload the images for
    """

    image_set = Set(game_id=id)
    image_set.save()

    raw_images = request.FILES.getlist("media")
    raw_prompts = request.FILES.getlist("prompts")
    prompts = [p.read().decode() for p in raw_prompts]

    for raw_image, prompt in zip(raw_images, prompts):
        img = Image(set_id=image_set.id, prompt=prompt, image=raw_image)
        img.save()

    return Response({"status": "ok"})

def get_random_string(length):
    letters = string.ascii_uppercase
    return  ''.join(random.choice(letters) for i in range(length))

@api_view(['GET'])
def createMultiplayerSession(request):
    code = get_random_string(8)
    Session(code=code).save()
    return Response({"code": code})

