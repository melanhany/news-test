from rest_framework import filters
from .models import News 


class TagsFilter(filters.BaseFilterBackend):
    """
    Return all objects which match any of the provided tags
    """

    def filter_queryset(self, request, queryset, view):
        tags = request.query_params.get('tags', None)
        if tags:
            print(tags)
            tags = tags.split(',')
            queryset = queryset.filter(tags__name__in=tags).distinct()

        return queryset
