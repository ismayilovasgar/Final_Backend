from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from home.models import Trainer
from django.views.generic import View, TemplateView
import json


# Create your views here.
def filter_by_category(request, category):
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


def filter_by_main_category(request, lifestyle):

    print(f"filter text: {lifestyle} ----------------------------------")

    if request.method == "POST":
        try:
            trainers = Trainer.objects.filter(main_category=lifestyle)
            trainer_data = filter_select_values(trainers)

            return JsonResponse({"trainer_data": trainer_data})

        except:
            return print("eerr-------------------------")
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


def filter_by_main(request, text):

    if request.method == "POST":
        try:
            trainers = Trainer.objects.filter(category=text)

            trainer_data = filter_select_values(trainers)

            return JsonResponse({"trainer_data": trainer_data})

        except:
            return print("eerr-------------------------")
    else:
        return JsonResponse({"error": "Bad request"}, status=400)


def filter_select_values(trainers):
    trainer_data = [
        {
            # key : value
            "id": trainer.id,
            "firstname": trainer.first_name,
            "lastname": trainer.last_name,
            "profession": trainer.profession,
            "started_date": trainer.started_date.strftime("%b %d, %Y"),
            "move_title": trainer.move_title,
            "trainer_category": trainer.category.replace(" & ", "_"),
            "trainer_image_url": trainer.image.url,
            "move_image_url": trainer.move_image.url,
            "move_level": trainer.intensity_level,
        }
        for trainer in trainers
    ]

    return trainer_data
