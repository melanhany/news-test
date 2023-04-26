from rest_framework import serializers
from taggit.serializers import (TagListSerializerField, TaggitSerializer)

from .models import News


class NewsSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = News
        fields = ['id', 'title', 'text', 'image', 'tags']