from django.shortcuts import render
from .models import Rooms, Services, Reviews, Categories
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import datetime
from django.core.mail import send_mail


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

        # On the server change the category 2 for deluxe and 1 for econom
        if deluxe == "true":
            rooms = rooms.filter(categories__rooms=1)
            print(rooms)
        elif econom == "true":
            rooms = rooms.filter(categories__rooms=2)
            print(rooms)

        from django.db.models import Q
        rooms_av = rooms.filter(Q(book_in__gt=datetime.date(int(year_out), int(month_out), int(day_out))) |
                             Q(book_out__lt=datetime.date(int(year_in), int(month_in), int(day_in)))
                             )

        rooms = rooms_av.union(rooms.filter(Q(book_in=None) & Q(book_out=None)))
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


@csrf_exempt
def send_message(request):
    if request.method == "POST":
        dateIn = request.POST["dateIn"]
        dateOut = request.POST["dateOut"]
        deluxe = request.POST["deluxe"]
        econom = request.POST["econom"]
        adults = request.POST["adults"]
        children = request.POST["children"]
        room = request.POST["room"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        email = request.POST["email"]
        phone = request.POST["phone"]

        if deluxe == "true":
            type_of_room = '????????????'
        elif econom == "true":
            type_of_room = '????????????'
        else:
            type_of_room = "???? ????????????"

        message = f"    ???????????????????????? ???????????? ?? ??????????    " \
                  f"\n??????: {first_name}" \
                  f"\n??????????????: {last_name}" \
                  f"\nE-mail: {email}" \
                  f"\n??????????????: {phone}" \
                  f"\n???????????????????????? ?? {dateIn} ???? {dateOut}" \
                  f"\n{'???????????????? ??????????????: ' if room == '???????????????? ??????????????' or room == 'Choose a Room' else '???????????????? ??????????????: ' + room}" \
                  f"\n?????? ??????????????: {type_of_room}" \
                  f"\n????????????????: {adults}, ??????????: {children}"

        print(message)
        mail = send_mail('Our Palace Hotel', message, 'totpravka@gmail.com', ['igorkhaylov@yandex.com', ], fail_silently=True)
        # mail = True
        if mail:
            print("?????????????????? ?????????????? ????????????????????")
            return JsonResponse({"data": True})
        else:
            print("???????????? ???????????????? ??????????????????")
            return JsonResponse({"data": False})

    return JsonResponse({"data": False})


