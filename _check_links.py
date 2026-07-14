import os, glob, re
html_files = glob.glob('**/*.html', recursive=True)
for f in html_files:
    if not os.path.isfile(f):
        continue
    with open(f, 'r', encoding='utf-8', errors='ignore') as fh:
        text = fh.read()
    for m in re.finditer(r'href=["\']([^"\']+)["\']', text):
        href = m.group(1)
        if href.startswith(('http://', 'https://', 'mailto:', '#', 'javascript:', 'tel:')):
            continue
        if href.startswith('/'):
            path = href[1:]
        else:
            path = os.path.normpath(os.path.join(os.path.dirname(f), href))
        if not os.path.exists(path):
            print(f'{f}: {href}')
