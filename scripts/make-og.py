"""Sinh ảnh preview Zalo/Facebook riêng cho từng người: public/og/<code>.jpg (1200x630).
Đọc code/vai/tên/ảnh bìa từ src/data/family.ts. Đổi ảnh bìa hay tên thì chạy lại:
    python3 scripts/make-og.py
"""
import os, re
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data = open(os.path.join(ROOT, 'src/data/family.ts'), encoding='utf-8').read()
people = re.findall(r"code: '([^']+)',.*?role: '([^']+)',\s*name: '([^']+)',.*?cover: '([^']+)'", data, re.S)

def font(size, italic=True):
    names = ['Times New Roman Italic.ttf', 'Georgia Italic.ttf'] if italic else ['Times New Roman.ttf', 'Georgia.ttf']
    for n in names:
        p = '/System/Library/Fonts/Supplemental/' + n
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

INK, SOFT, ROSE = (59, 42, 34), (107, 86, 72), (201, 138, 138)
os.makedirs(os.path.join(ROOT, 'public/og'), exist_ok=True)
for code, role, name, cover in people:
    bg = Image.open(os.path.join(ROOT, 'public/og-image.jpg')).convert('RGB').resize((1200, 630))
    # xoá chữ cũ của og-image: phủ nền mờ
    bg = bg.filter(ImageFilter.GaussianBlur(60))
    d = ImageDraw.Draw(bg)
    d.text((90, 150), '20 · 10', font=font(120), fill=INK)
    d.line((94, 300, 154, 300), fill=ROSE, width=2)
    d.text((90, 330), 'Món quà nhỏ dành riêng cho', font=font(40), fill=SOFT)
    d.text((90, 390), f'{role} {name}', font=font(72, italic=False), fill=INK)

    src = os.path.join(ROOT, 'public', cover)
    if os.path.exists(src):
        photo = ImageOps.fit(ImageOps.exif_transpose(Image.open(src)).convert('RGB'), (320, 400), centering=(0.5, 0.35))
        card = Image.new('RGB', (348, 470), (251, 247, 240))
        card.paste(photo, (14, 14))
        shadow = Image.new('RGBA', (420, 540), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rectangle((36, 44, 384, 514), fill=(59, 42, 34, 90))
        shadow = shadow.filter(ImageFilter.GaussianBlur(14)).rotate(4, resample=Image.BICUBIC)
        bg.paste(shadow, (735, 50), shadow)
        card = card.convert('RGBA').rotate(4, expand=True, resample=Image.BICUBIC)
        bg.paste(card, (760, 60), card)
    bg.save(os.path.join(ROOT, f'public/og/{code}.jpg'), 'JPEG', quality=85, optimize=True)
    print(code, role, name)
