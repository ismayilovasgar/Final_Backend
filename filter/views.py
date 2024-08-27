from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from home.models import Trainer
from django.views.generic import View, TemplateView
import json
from django.db.models import Q


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


def filter_by_text(request, text):
    pre_text = text.split("_")[0]
    suf_text = text.split("_")[1]
    print(suf_text, "+")
    results = []
    if text.split("_")[0].startswith("name"):
        print("1")
        results = Trainer.objects.filter(
            Q(first_name__startswith=suf_text) | Q(last_name__startswith=suf_text)
        )
        print(results)
    if text.split("_")[0].startswith("category"):
        print("2")
        results = Trainer.objects.filter(category=suf_text)

    data = filter_select_values(results)

    return JsonResponse({"data": data}, safe=False)


def filter_by_list(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse the JSON body
            list = data.get("data")
            result = Trainer.objects.filter(
                Q(yoga_style__contains=list[0])
                & Q(time_of_day__iexact=list[1])
                & Q(difficulty_level__iexact=list[2])
                & Q(intensity_level__iexact=list[3])
            )
            results = filter_select_values(result)

            return JsonResponse({"data": results})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


# ! Other def use for format data as json
def filter_select_values(trainers):
    trainer_data = [
        {
            # key : value
            # User
            "id": trainer.id,
            "firstname": trainer.first_name,
            "lastname": trainer.last_name,
            "profession": trainer.profession,
            "trainer_image_url": trainer.image.url,
            "facebook": trainer.facebook,
            "twitter": trainer.twitter,
            "instagram": trainer.instagram,
            # Move
            "move_title": trainer.move_title,
            "move_image_url": trainer.move_image.url,
            "started_date": trainer.started_date.strftime("%b %d, %Y"),
            "move_difficulty": trainer.difficulty_level,
            "move_time_of_day": trainer.time_of_day,
            "move_yoga_style": trainer.yoga_style,
            "trainer_category": trainer.category.replace(" & Gym", ""),
            "main_category": trainer.main_category,
            "move_level": trainer.intensity_level,
        }
        for trainer in trainers
    ]

    return trainer_data
