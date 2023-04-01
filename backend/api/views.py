from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from django.http import Http404
from .models import Prompt

class PromptView(views.APIView):
    def get(self, request, id, format=None):
        try:
            prompt = Prompt.objects.get(id=id)
            return Response({"prompt": prompt.text})
        except Prompt.DoesNotExist:
            raise Http404
