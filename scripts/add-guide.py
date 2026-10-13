"""Add Nexterra intake navigation to the deployment copy only."""
from pathlib import Path
root=Path('_site')
for directory in root.iterdir():
 if not directory.is_dir():continue
 for page in directory.glob('*.html'):
  text=page.read_text(encoding='utf-8')
  tag='<script src="../nexterra-guide.js"></script>'
  if tag not in text:text=text.replace('</body>',tag+'</body>')
  page.write_text(text,encoding='utf-8')
