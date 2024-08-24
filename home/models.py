from django.db import models

# Create your models here.
from django.db import models


# choices: Provides a list of choices for the field
# SKILL_CHOICES = [
#     ("Yoga trainer", "Yoga"),
#     ("personal trainer", "Personal Trainer"),
#     ("Boxer Trainer", "Boxer"),
#     ("Business Analytic", "Business Analytic"),
# ]
class Category(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self) -> str:
        return f"{self.name}"


class Profession(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"{self.name}"


# Create your models here.
class Trainer(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    profession = models.ForeignKey(Profession, on_delete=models.SET_NULL, null=True)

    # profession = models.CharField(max_length=40, choices=SKILL_CHOICES)
    image = models.ImageField(
        upload_to="trainer/%Y/%m/%d/", default="profile_avatar.jpg"
    )
    

    facebook = models.URLField(
        max_length=100, blank=True, null=True, default="https://www.facebook.com/"
    )
    twitter = models.URLField(
        max_length=100, blank=True, null=True, default="https://twitter.com/"
    )
    instagram = models.URLField(
        max_length=100, blank=True, null=True, default="https://www.instagram.com/"
    )

    def __str__(self) -> str:
        return f"{self.first_name} | {self.last_name}"
