from PIL import Image, ImageFilter
from django.conf import settings
import sys, os, django

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

def get_biomes():
    return os.listdir(os.path.join(settings.MEDIA_ROOT, "data"))

def fast_blur_and_resize_img(source, dest, size, radius):
    with Image.open(source) as img:
        img = img.convert("RGB")
        img = img.resize(size)
        blurred = img.filter(ImageFilter.GaussianBlur(radius=radius))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        blurred.save(dest)

if __name__ == "__main__":
    size = (1920, 1017)
    radius = 10
    for biome in get_biomes():
        src_dir = os.path.join(settings.MEDIA_ROOT, "blurred", biome)
        dst_dir = os.path.join(settings.MEDIA_ROOT, "blurred", biome)
        for img_name in os.listdir(src_dir):
            source_path = os.path.join(src_dir, img_name)
            dest_path = os.path.join(dst_dir, img_name)
            fast_blur_and_resize_img(
                source=source_path, dest=dest_path,
                size=size, radius=radius,
            )
        print(f"{biome} resized and blurred")

