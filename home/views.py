from django.shortcuts import render
from .models import Trainer


# Create your views here.
# Create your views here.
def home__page(request):
    trainers = Trainer.objects.all()
    context = {
        "trainers": trainers,
    }
    return render(request, "home.html", context)


def pricing__page(request):
    trainers = Trainer.objects.all()
    context = {
        "trainers": trainers,
    }
    return render(request, "pricing.html", context)


def features__page(request):
    return render(request, "features.html")


def download__page(request):
    return render(request, "download.html")


def lifestyle__page(request):
    return render(request, "lifestyle.html")


def singleblog__page(request):
    return render(request, "single_blog.html")


def class01__page(request):
    trainers = Trainer.objects.all()
    context = {
        "trainers": trainers,
    }
    return render(request, "class_01.html", context)


def class01detail__page(request):
    return render(request, "class_01_detail.html")


def class02__page(request):
    return render(request, "class_02.html")


def class02detail__page(request):
    return render(request, "class_02_detail.html")
