from django import template
from main.models import Reviews

register = template.Library()


@register.simple_tag()
def get_reviews():
    return Reviews.objects.all()
