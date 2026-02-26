import os
import re
import glob
import html
import sys
from PIL import Image
import pytesseract
import difflib

IMAGE_DIR = os.path.join('capturas', 'ultimo archivo')
VUE_PATH = os.path.join('app', 'components', 'Documento80Paginas.vue')
OUT_DIR = os.path.join('tmp', 'ocr_compare')
os.makedirs(OUT_DIR, exist_ok=True)

def list_images(path):
    exts = ('*.png','*.jpg','*.jpeg','*.tif','*.tiff','*.bmp')
    files = []
    for e in exts:
        files.extend(glob.glob(os.path.join(path, e)))
    return sorted(files)

def read_vue_pages(vue_path):
    if not os.path.exists(vue_path):
        print('ERROR: no existe', vue_path)
        return []
    s = open(vue_path, 'r', encoding='utf-8').read()
    m = re.search(r'<template>(.*?)</template>', s, re.S)
    if not m:
        content = s
    else:
        content = m.group(1)
    # find positions of containers with class contenedor-principal
    pattern = re.compile(r'<div[^>]*class="[^"]*contenedor-principal[^"]*"', re.I)
    starts = [m.start() for m in pattern.finditer(content)]
    pages = []
    if not starts:
        # fallback: return full content stripping tags
        txt = re.sub(r'<[^>]+>', '', content)
        txt = html.unescape(txt)
        txt = re.sub(r'\s+', ' ', txt).strip()
        return [txt]
    for i, st in enumerate(starts):
        end = starts[i+1] if i+1 < len(starts) else len(content)
        block = content[st:end]
        # strip tags
        txt = re.sub(r'<[^>]+>', '', block)
        txt = html.unescape(txt)
        txt = re.sub(r'\s+', ' ', txt).strip()
        pages.append(txt)
    return pages


def ocr_image(path):
    try:
        img = Image.open(path)
    except Exception as e:
        return ''
    text = pytesseract.image_to_string(img, lang='spa')
    text = html.unescape(text)
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def save(path, text):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def main():
    imgs = list_images(IMAGE_DIR)
    if not imgs:
        print('No encontré imágenes en', IMAGE_DIR)
        sys.exit(1)
    pages = read_vue_pages(VUE_PATH)
    if not pages:
        print('No pude extraer páginas del componente Vue en', VUE_PATH)
    print(f'Imágenes encontradas: {len(imgs)}; Páginas extraídas: {len(pages)}')
    for i, img in enumerate(imgs):
        page_index = i if i < len(pages) else len(pages)-1
        ocr = ocr_image(img)
        save(os.path.join(OUT_DIR, f'ocr_page_{i+1}.txt'), ocr)
        ref = pages[page_index] if pages else ''
        save(os.path.join(OUT_DIR, f'ref_page_{page_index+1}.txt'), ref)
        # diff
        a = ref.splitlines()
        b = ocr.splitlines()
        diff = list(difflib.unified_diff(a, b, fromfile='ref', tofile='ocr', lineterm=''))
        diff_path = os.path.join(OUT_DIR, f'diff_page_{i+1}.txt')
        if diff:
            save(diff_path, '\n'.join(diff))
            print(f'Página {i+1}: diferencias encontradas -> {diff_path}')
        else:
            save(diff_path, '')
            print(f'Página {i+1}: sin diferencias relevantes')
    print('Resultados guardados en', OUT_DIR)

if __name__ == '__main__':
    main()
