from django.shortcuts import render
from .models import Rooms, Services, Reviews, Categories
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import datetime


def index(request):
    rooms = Rooms.objects.all()
    # services = Services.objects.all()
    categories = Categories.objects.all()
    # reviews = Reviews.objects.all()

    return render(request, "main/index.html", {"rooms": rooms,
                                               "categories": categories,
                                               # "services": services,
                                               # "reviews": reviews,
                                               })


@csrf_exempt
def av_rooms(request):
    if request.method == "POST":
        print(request.POST)
        dateIn = request.POST["dateIn"]
        dateOut = request.POST["dateOut"]
        modalDateIn = request.POST["modalDateIn"]
        modalDateOut = request.POST["modalDateOut"]
        deluxe = request.POST["deluxe"]
        econom = request.POST["econom"]
        adults = request.POST["adults"]
        children = request.POST["children"]

        try:
            day_in, month_in, year_in = dateIn.split(".")
            day_out, month_out, year_out = dateOut.split(".")
        except ValueError:
            day_in, month_in, year_in = modalDateIn.split(".")
            day_out, month_out, year_out = modalDateOut.split(".")

        print("split dateIn", year_in, month_in, day_in)
        print("split dateOut", year_out, month_out, day_out)
        rooms = Rooms.objects.all()

        if deluxe == "true":
            rooms = rooms.filter(categories__rooms=1)
            print(rooms)
        elif econom == "true":
            rooms = rooms.filter(categories__rooms=2)
            print(rooms)

        from django.db.models import Q
        rooms = rooms.filter(Q(book_in__gt=datetime.date(int(year_out), int(month_out), int(day_out))) |
                             Q(book_out__lt=datetime.date(int(year_in), int(month_in), int(day_in)))
                             )
        data = []
        if not rooms:
            return JsonResponse({"data": False},)
        for room in rooms:
            obj = {
                "id": room.id,
                "IN": room.book_in,
                "OUT": room.book_out,
                "category": room.categories.title
            }
            data.append(obj)

        return JsonResponse({"data": data})

    return JsonResponse({"data": "request is not POST"})

