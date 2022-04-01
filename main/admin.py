from django.contrib import admin
from .models import Rooms, RoomDetails, Categories, Reviews, Services
from modeltranslation.admin import TranslationAdmin


@admin.register(Rooms)
class RoomsAdmin(TranslationAdmin):
    list_display = ("title", "book_in", "book_out", "categories", )
    prepopulated_fields = {"slug": ("title", "number_of_room")}
    list_editable = ('book_in', 'book_out', "categories", )


@admin.register(Categories)
class CategoriesAdmin(TranslationAdmin):
    list_display = ("title", )
    readonly_fields = ("slug", )














# admin.site.register(Categories)
admin.site.register(Reviews)
admin.site.register(Services)




# admin.site.register(RoomDetails)
