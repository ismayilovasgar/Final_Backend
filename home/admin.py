from django.contrib import admin
from .models import *


# Register your models here.
@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):

    class Meta:
        model = Trainer


# @admin.register(Profession)
# class ProfessionAdmin(admin.ModelAdmin):

#     class Meta:
#         model = Profession


# @admin.register(Category)
# class TagAdmin(admin.ModelAdmin):

#     class Meta:
#         model = Category


# admin.site.register(Trainer, TrainerAdmin)
# admin.site.register(Profession, ProfessionAdmin)
# admin.site.register(Category, CategoryAdmin)
