from django.db import models
import os


# choices: Provides a list of choices for the field
# SKILL_CHOICES = [
#     ("Yoga trainer", "Yoga"),
#     ("personal trainer", "Personal Trainer"),
#     ("Boxer Trainer", "Boxer"),
#     ("Business Analytic", "Business Analytic"),
# ]
# class Category(models.Model):
#     name = models.CharField(max_length=40)

#     def __str__(self) -> str:
#         return f"{self.name}"


# class Profession(models.Model):
#     name = models.CharField(max_length=50)
#     category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)

#     def __str__(self) -> str:
#         return f"{self.name}"


def get_image_upload_path(instance, filename):
    """
    Generate the upload path for the image based on the product's name.
    Spaces in the name are replaced with underscores.
    """
    # Generate folder name by replacing spaces with underscores
    folder_name = instance.first_name.replace(" ", "_")

    # Construct the full upload path
    return os.path.join("move", folder_name, filename)


# Create your models here.
class Trainer(models.Model):

    PROFESSION_CHOICES = [
        ("Yoga Master", "Yoga Master"),
        ("Personal trainer", "Personal Trainer"),
        ("Boxer", "Boxer"),
        ("Business Analytic", "Business Analytic"),
        ("Other", "Other"),
    ]
    # user  info
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    profession = models.CharField(
        max_length=25,
        choices=PROFESSION_CHOICES,
        default="Yoga Master",
        help_text="Select the one profession from these.",
    )
    # profession = models.ForeignKey(Profession, on_delete=models.SET_NULL, null=True)

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

    # ?  move info
    DIFFICULTY_CHOICES = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
    ]

    TIME_OF_DAY_CHOICES = [
        ("Morning", "Morning"),
        ("Afternoon", "Afternoon"),
        ("Evening", "Evening"),
    ]

    YOGA_STYLE_CHOICES = [
        ("Morning Yoga", "Morning Yoga"),
        ("Vinyasa Yoga", "Vinyasa Yoga"),
        ("Acro Yoga", "Acro Yoga"),
    ]

    INTENSITY_CHOICES = [
        ("Level 1", "Level 1"),
        ("Level 2", "Level 2"),
        ("Level 3", "Level 3"),
    ]

    CATEGORY_CHOICES = [
        ("Yoga", "Yoga"),
        ("Fitness & Gym", "Fitness & Gym"),
        ("Gymnastics", "Gymnastics"),
        ("Running", "Running"),
    ]

    move_title = models.CharField(max_length=40, null=True)
    move_image = models.ImageField(
        upload_to=get_image_upload_path, default="move_avatar.jpg"
    )
    started_date = models.DateTimeField(auto_now_add=True)

    # Add the difficulty level field to the model
    difficulty_level = models.CharField(
        max_length=25,
        choices=DIFFICULTY_CHOICES,
        default="Intermediate",
        help_text="Select the difficulty level of the task.",
    )

    # Add the time of day field to the model
    time_of_day = models.CharField(
        max_length=25,
        choices=TIME_OF_DAY_CHOICES,
        default="morning",
        help_text="Select the time of day for this schedule.",
    )

    # Add the yoga style field to the model
    yoga_style = models.CharField(
        max_length=25,
        choices=YOGA_STYLE_CHOICES,
        default="morning",
        help_text="Select the style of yoga for this session.",
    )

    # Add the intensity level field to the model
    intensity_level = models.CharField(
        max_length=25,
        choices=INTENSITY_CHOICES,
        default="level_2",
        help_text="Select the intensity level of the exercise.",
    )

    # Add the category field to the model
    category = models.CharField(
        max_length=25,
        choices=CATEGORY_CHOICES,
        default="Yoga",
        help_text="Select the category of the product.",
    )

    def __str__(self) -> str:
        return f"{self.first_name} | {self.last_name}"
