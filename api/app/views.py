from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def sample_view(request):
    data = [
        {"id": 1, "name": "John"},
        {"id": 2, "name": "Jane"},
        {"id": 3, "name": "Bob"}
    ]
    return Response(data)