from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
import os, random, json
from .models import *

num_qstns, num_optns = 10, 4

def get_biomes():
    return os.listdir(os.path.join(settings.MEDIA_ROOT, "data"))

def get_formatted_biomes():
    return [
        biome.replace("_", " ").capitalize()
        for biome in get_biomes()
    ]

@csrf_exempt
def get_test(request):
    if request.method == "GET":
        try:
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
                while len(options) < num_optns:
                    option = random.choice(biomes)
                    formatted = f_biomes[biomes.index(option)]
                    if formatted not in options:
                        options.append(formatted)
                random.shuffle(options)
                test.append({
                    "img": img_url,
                    "options": options,
                    "answer": f_biomes[biomes.index(answer)],
                })
            
            return JsonResponse({
                "success": True,
                "test": test,
            }, status=200)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "something went wrong",
                "error": str(e),
            }, status=400)
    else:
        return JsonResponse({
            "success": False,
            "message": "only GET requests allowed",
        }, status=405)

@csrf_exempt
def create_username(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            username = body["username"]
            player_obj = Player.objects.create(username=username)
            return JsonResponse({
                "success": True,
                "player": {
                    "username": player_obj.username,
                    "total_score": player_obj.total_score,
                    "total_tests": player_obj.total_tests,
                }
            }, status=200)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "something went wrong",
                "error": str(e),
            }, status=400)
    else:
        return JsonResponse({
            "success": False,
            "message": "only POST requests allowed",
        }, status=405)

@csrf_exempt
def submit_score(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            score = int(body["score"])
            username = body["username"]
            player_obj = Player.objects.get(username=username)
            player_obj.total_score += score
            player_obj.total_tests += 1
            player_obj.save()
            return JsonResponse({
                "success": True,
                "player": {
                    "username": player_obj.username,
                    "total_score": player_obj.total_score,
                    "total_tests": player_obj.total_tests,
                    "score": score,
                }
            }, status=200)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "something went wrong",
                "error": str(e),
            }, status=400)
    else:
        return JsonResponse({
            "success": False,
            "message": "only POST requests allowed",
        }, status=405)

@csrf_exempt
def get_leaderboard(request):
    if request.method == "GET":
        try:
            leaderboard = [{
                    "username": player.username,
                    "total_score": player.total_score,
                    "total_tests": player.total_tests,
                    "accuracy": player.total_score / (player.total_tests * num_qstns),
                }
                for player in Player.objects.all()
                if player.total_tests > 0
            ]
            return JsonResponse({
                "success": True,
                "leaderboard": leaderboard,
            }, status=200)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "something went wrong",
                "error": str(e),
            }, status=400)
    else:
        return JsonResponse({
            "success": False,
            "message": "only GET requests allowed",
        }, status=405)

