from django import template
from main.models import Services

register = template.Library()


@register.simple_tag()
def get_services():
    return Services.objects.all()


