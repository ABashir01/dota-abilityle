from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import json
from .abilitydata.JsonHandler import JsonHandler
# Create your views here.

def get_hashmap(request):
#     example_hashmap = {"id": 651, 
# "name": "Tree Volley", 
# "hero": "Tiny", 
# "hero_img": "Tiny.jpg", 
# "ability_img": "Tree-Volley.jpg", 
# "description": "Tiny Throws trees within range towards the targeted aoe. Deals Tiny's attack damage plus a bonus to enemies in that area with each tree thrown.", 
# "mana_cost": "200", 
# "cooldown": "17", 
# "ability_list": "Target AOE:400;;Tree Grab Radius:525;;Throw Interval:0.5;;Max Channel Time:2.5"}
    handler = JsonHandler()
    example_hashmap = handler.sql_handler()
    return HttpResponse(json.dumps(example_hashmap))

