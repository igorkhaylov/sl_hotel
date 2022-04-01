from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError


def validate_room_number(value):
    if not 100 > value > 0:
        raise ValidationError("Номер комнаты вне предела")


def validate_stars(value):
    if not 6 > value > 0:
        raise ValidationError("Можно указать значение только от 1 до 5")


def validate_adult_children(value):
    if not 10 > value > 0:
        raise ValidationError("Можно выбрать только до 10 человек")


def validate_size(value):
    if not 150 >= value >= 10:
        raise ValidationError("Можно выбать только от 10 до 150 метров")


def validate_price(value):
    if not 1000 >= value >= 5:
        raise ValidationError("Можно выбрать только от 1 до 1000")


class Categories(models.Model):
    title = models.CharField(max_length=25, )
    slug = models.SlugField(max_length=30, db_index=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class RoomDetails(models.Model):
    image = models.FileField(upload_to="ico_details/", null=True)
    title = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Room Detail"
        verbose_name_plural = "Room Details"


class Rooms(models.Model):
    title = models.CharField(max_length=50, null=True)
    number_of_room = models.PositiveSmallIntegerField(validators=[validate_room_number], unique=True, null=True)
    slug = models.SlugField(max_length=60, db_index=True)
    categories = models.ForeignKey("Categories", on_delete=models.PROTECT)
    pic1 = models.ImageField(upload_to="rooms/", help_text="Recommended image size 340x460", null=True)
    pic2 = models.ImageField(upload_to="rooms/", help_text="Recommended image size 340x460", null=True)
    pic3 = models.ImageField(upload_to="rooms/", help_text="Recommended image size 340x460", null=True)
    stars = models.PositiveSmallIntegerField(validators=[validate_stars], default=5, null=True)
    size = models.PositiveSmallIntegerField(validators=[validate_size], default=48, null=True)
    adult = models.PositiveSmallIntegerField(validators=[validate_adult_children], default=2, null=True)
    children = models.PositiveSmallIntegerField(validators=[validate_adult_children], default=0, null=True)
    price = models.PositiveSmallIntegerField(validators=[validate_price], null=True)
    is_non_smoking = models.BooleanField(default=True)
    is_breakfast = models.BooleanField(default=True)
    room_details = models.ManyToManyField("RoomDetails", related_name="room_details", blank=True)
    book_in = models.DateField(null=True, blank=True)
    book_out = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Room"
        verbose_name_plural = "Rooms"


class Reviews(models.Model):
    name = models.CharField(max_length=60, null=True)
    image = models.ImageField(upload_to="reviews/")
    text = models.TextField(max_length=150, null=True)
    stars = models.PositiveSmallIntegerField(validators=[validate_stars], default=5, null=True)
    date_created = models.DateField(default=timezone.now, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"


class Services(models.Model):
    title = models.CharField(max_length=50, null=True)
    image = models.FileField(upload_to="services/", help_text="Required svg", null=True)
    description = models.TextField(max_length=60, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ["-id"]
