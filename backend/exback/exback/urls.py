from django.contrib import admin
from django.urls import include, path
from django.urls import path
import market.urls,userauth.urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('market/', include(market.urls)),
    path('userauth/', include(userauth.urls))
    
]
