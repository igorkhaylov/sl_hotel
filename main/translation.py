from modeltranslation.translator import register, TranslationOptions
from .models import Rooms, Categories, RoomDetails, Services, Reviews


@register(Categories)
class CategoriesTranslationOptions(TranslationOptions):
    fields = ('title', )


@register(RoomDetails)
class RoomDetailsTranslationOptions(TranslationOptions):
    fields = ("title", )


@register(Rooms)
class RoomsTranslationOptions(TranslationOptions):
    fields = ("title", )


@register(Services)
class ServicesTranslationOptions(TranslationOptions):
    fields = ("title", "description", )


@register(Reviews)
class ReviewsTranslationOptions(TranslationOptions):
    fields = ("name", "text")





