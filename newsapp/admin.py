from django.contrib import admin
from django.utils.html import format_html
from . import models

@admin.register(models.News)
class NewsAdmin(admin.ModelAdmin):
    autocomplete_fields = ['tags']
    readonly_fields = ['thumbnail']

    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''
    
    class Media:
        css = {
            'all': ['newsapp/css/styles.css']
        }