from django.urls import include, path

from .views import PromptView

urlpatterns = [
    path("prompt/<int:id>", PromptView.as_view()),
]
