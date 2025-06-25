from django.http import JsonResponse
from django.conf import settings
import os, random

num_qstns = 10
num_optns = 4

def get_biomes():
    return os.listdir(os.path.join(settings.MEDIA_ROOT, "data"))

def get_formatted_biomes():
    return [
        biome.replace("_", " ").capitalize()
        for biome in get_biomes()
    ]

def get_test(request):
    test = []
    biomes = get_biomes()
    f_biomes = get_formatted_biomes()
    for i in range(num_qstns):
        answer = random.choice(biomes)
        img_url = os.path.join(
            settings.MEDIA_URL, "data", answer,
            random.choice(os.listdir(
                os.path.join(settings.MEDIA_ROOT, "data", answer)
            ))
        )
        options = [f_biomes[biomes.index(answer)],]
        j = 1
        while j != num_optns:
            option = random.choice(biomes)
            if option != answer:
                options.append(f_biomes[biomes.index(option)])
                j += 1
        test.append({
            "img": img_url,
            "options": options,
            "answer": answer,
        })
    
    return JsonResponse({
        "success": True,
        "test": test,
    })
