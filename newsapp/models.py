from django.db import models
from taggit.managers import TaggableManager

class News(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    image = models.ImageField(upload_to='newsapp/images')
    tags = TaggableManager()

    def __str__(self) -> str:
        return self.title