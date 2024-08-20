from django.http import JsonResponse
from .models import Dota2Ability

def get_random_ability(request):
    # Fetch a random ability
    random_ability = Dota2Ability.objects.order_by('?').first()

    # Prepare the response data
    data = {
        'id': random_ability.id,
        'name': random_ability.name,
        'hero': random_ability.hero,
        'description': random_ability.description,
        'mana_cost': random_ability.mana_cost,
        'cooldown': random_ability.cooldown,
        'ability_list': random_ability.ability_list,
    }

    # Return the data as JSON response
    return JsonResponse(data)
