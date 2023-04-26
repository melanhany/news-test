from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import News
from .serializers import NewsSerializer
from .filters import TagsFilter
from .pagination import DefaultPagination

class NewsViewSet(ModelViewSet):
    # queryset = News.objects.filter(tags__name__in=["python"])
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filter_backends = [TagsFilter]
    pagination_class = DefaultPagination

def news(request):
    return render(request, "newsapp/news.html")

def news_detail(request, pk):
    return render(request, "newsapp/newsDetail.html")