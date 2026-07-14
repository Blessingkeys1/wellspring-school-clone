import os
import re
from pathlib import Path

root = Path.cwd()
html_files = sorted(root.rglob('*.html'))

anchor_re = re.compile(r'<a\b([^>]*)>(.*?)</a>', re.I | re.S)
attr_re = re.compile(r'href\s*=\s*(["\'])(.*?)\1', re.I)

for path in html_files:
    try:
        text = path.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        continue

    seen = set()

    def replace_anchor(match):
        tag = match.group(0)
        attrs = match.group(1)
        inner = match.group(2)
        href_match = attr_re.search(attrs)
        href = href_match.group(2) if href_match else ''
        if not href:
            return tag

        if href.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:', 'data:', '#')):
            return tag

        key = href.split('#', 1)[0].split('?', 1)[0]
        if key in seen:
            return inner

        seen.add(key)

        if href.startswith('/'):
            target = (root / href.lstrip('/')).resolve()
        else:
            target = (path.parent / href).resolve()

        if target.exists():
            return tag
        return inner

    new_text = anchor_re.sub(replace_anchor, text)

    # remove any remaining empty anchor tags from the previous replacements
    new_text = re.sub(r'<a\b[^>]*></a>', '', new_text, flags=re.I | re.S)

    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
