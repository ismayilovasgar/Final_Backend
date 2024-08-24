from django.shortcuts import render
from django.http import JsonResponse


# Create your views here.
def filter_by_categry(request, category):
    print(f"come to {category} ")
    data = {
        "message": "Hello, world!",
        "status": "success",
    }
    return JsonResponse(data)
