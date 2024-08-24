from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from home.models import *


# Create your views here.
def filter_by_categry(request, category):
    print(f"filter text: {category} ")

    if request.method == "POST":
        try:
            trainer = Trainer.objects.filter(category=category).values()
            trainer_list = list(trainer)

            return JsonResponse(trainer_list, safe=False)
        except:
            return print("eerr-------------------------")
    else:
        return JsonResponse({"error": "Bad request"}, status=400)
