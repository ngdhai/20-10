"""Sinh ảnh placeholder cho mọi đường dẫn images/... trong src/data/family.ts,
cùng og-image.jpg (1200x630) và apple-touch-icon.png.
Chạy lại an toàn: KHÔNG ghi đè ảnh đã có (ảnh thật của bạn).
    python3 scripts/make-placeholders.py
"""
import math, os, random, re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
data = open(os.path.join(ROOT, 'src/data/family.ts'), encoding='utf-8').read()

FONT_PATHS = ['/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf',
              '/System/Library/Fonts/Supplemental/Georgia Italic.ttf',
              '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf']
def font(size):
    for p in FONT_PATHS:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

PALETTES = {'ba-noi': ((214, 208, 180), (169, 179, 148)), 'ba-ngoai': ((236, 214, 196), (196, 150, 128)),
            'vo': ((240, 218, 214), (201, 138, 138)), 'em-vo': ((242, 228, 196), (210, 176, 120)),
            'family': ((236, 226, 208), (190, 168, 140))}

def soft(w, h, c1, c2, seed):
    rnd = random.Random(seed)
    img = Image.new('RGB', (w, h), c1)
    d = ImageDraw.Draw(img)
    for _ in range(5):
        r = rnd.randint(w // 5, w // 2)
        x, y = rnd.randint(0, w), rnd.randint(0, h)
        mix = rnd.random() * 0.7
        col = tuple(int(a + (b - a) * mix) for a, b in zip(c1, c2))
        d.ellipse((x - r, y - r, x + r, y + r), fill=col)
    img = img.filter(ImageFilter.GaussianBlur(w // 8))
    noise = Image.effect_noise((w, h), 18).convert('RGB')
    return Image.blend(img, noise, 0.04)

def centered(d, w, y, text, f, fill):
    tw = d.textlength(text, font=f)
    d.text(((w - tw) / 2, y), text, font=f, fill=fill)

made = 0
for path in sorted(set(re.findall(r"'(images/[^']+\.jpg)'", data))):
    out = os.path.join(PUBLIC, path)
    if os.path.exists(out):
        continue
    name = os.path.basename(path)
    key = next((k for k in sorted(PALETTES, key=len, reverse=True) if f'-{k}-' in name), 'family')
    c1, c2 = PALETTES[key]
    w, h = (1000, 1250) if 'cover' in name else (1200, 900) if key != 'family' else (1000, 1000)
    img = soft(w, h, c1, c2, name)
    d = ImageDraw.Draw(img)
    ink = (107, 86, 72)
    centered(d, w, h / 2 - 40, 'thay ảnh tại đây', font(w // 16), ink)
    centered(d, w, h / 2 + 30, name, font(w // 26), ink)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, 'JPEG', quality=72, optimize=True, progressive=True)
    made += 1

# OpenGraph 1200x630
og = os.path.join(PUBLIC, 'og-image.jpg')
if not os.path.exists(og):
    img = soft(1200, 630, (246, 239, 228), (226, 196, 180), 'og')
    d = ImageDraw.Draw(img)
    ink = (59, 42, 34)
    centered(d, 1200, 150, '20 · 10', font(190), ink)
    d.line((570, 385, 630, 385), fill=(201, 138, 138), width=2)
    centered(d, 1200, 420, 'Gửi những người phụ nữ của gia đình', font(54), (107, 86, 72))
    img.save(og, 'JPEG', quality=86, optimize=True)
    made += 1

# Apple touch icon 180x180 (bông hoa nhỏ giống favicon)
icon = os.path.join(PUBLIC, 'apple-touch-icon.png')
if not os.path.exists(icon):
    s = 4  # vẽ to rồi thu nhỏ cho mịn
    img = Image.new('RGB', (180 * s, 180 * s), (246, 239, 228))
    d = ImageDraw.Draw(img)
    cx, cy = 90 * s, 82 * s
    for i in range(5):
        a = math.radians(72 * i - 90)
        px, py = cx + math.cos(a) * 26 * s, cy + math.sin(a) * 26 * s
        d.ellipse((px - 22 * s, py - 22 * s, px + 22 * s, py + 22 * s), fill=(201, 138, 138))
    d.ellipse((cx - 14 * s, cy - 14 * s, cx + 14 * s, cy + 14 * s), fill=(233, 201, 143))
    d.line((cx, cy + 50 * s, cx, cy + 82 * s), fill=(138, 154, 110), width=7 * s)
    img.resize((180, 180), Image.LANCZOS).save(icon)
    made += 1

print(f'created {made} file(s)')
