from django.http import HttpResponse
import urllib
from xml.dom import minidom
from pprint import pprint

def index(request):
    WEATHER_URL = 'http://xml.weather.yahoo.com/forecastrss?p=%s'
    WEATHER_NS = 'http://xml.weather.yahoo.com/ns/rss/1.0'
    url = WEATHER_URL % '47330'
    dom = minidom.parse(urllib.urlopen(url))
    forecasts = []
    for node in dom.getElementsByTagNameNS(WEATHER_NS, 'forecast'):
        forecasts.append({
            'date': node.getAttribute('date'),
            'low': node.getAttribute('low'),
            'high': node.getAttribute('high'),
            'condition': node.getAttribute('text')
        })
    ycondition = dom.getElementsByTagNameNS(WEATHER_NS, 'condition')[0]
    return HttpResponse(
        ycondition.getAttribute('text')
        + ycondition.getAttribute('temp')
        + forecasts
    )
