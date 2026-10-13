"""Validate local HTML/CSS/JS references without third-party dependencies."""
import json, re, sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
SAMPLES = ['simple-1', 'simple-2', 'strength-1', 'strength-2', 'trust-1', 'trust-2', 'modern-1', 'modern-2', 'craftsman-1', 'craftsman-2', 'craftsman-3']
errors, external = [], set()
checked = anchors = 0

class Page(HTMLParser):
 def __init__(self, text):
  super().__init__(); self.ids=set(); self.refs=[]; self.styles=[]; self.feed(text)
 def handle_starttag(self, tag, attrs):
  a=dict(attrs)
  for key in ('id', 'name'):
   if a.get(key): self.ids.add(a[key])
  for key in ('href','src','action','poster','data-src'):
   if a.get(key): self.refs.append(a[key])
  if a.get('srcset'):
   self.refs.extend(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
  if a.get('style'): self.styles.append(a['style'])
 def handle_startendtag(self, tag, attrs): self.handle_starttag(tag,attrs)

pages={p:Page(p.read_text(encoding='utf-8')) for p in ROOT.rglob('*.html')}
url_pattern=re.compile(r'url\(\s*[\"\']?([^\)\"\']+)',re.I)
def check(source, value):
 global checked, anchors
 value=value.strip()
 if not value or value=='#':return
 u=urlsplit(value)
 if u.scheme or u.netloc:
  if u.scheme in ('http','https') or u.netloc:external.add(value)
  return
 target=((ROOT/unquote(u.path.lstrip('/'))) if u.path.startswith('/') else source.parent/unquote(u.path)).resolve() if u.path else source
 try:target.relative_to(ROOT)
 except ValueError:
  errors.append({'file':str(source.relative_to(ROOT)),'url':value,'error':'outside public root'});return
 if target.is_dir():target=target/'index.html'
 checked+=1
 if not target.is_file():errors.append({'file':str(source.relative_to(ROOT)),'url':value,'error':'missing file'});return
 if u.fragment and target in pages:
  anchors+=1
  if unquote(u.fragment) not in pages[target].ids:errors.append({'file':str(source.relative_to(ROOT)),'url':value,'error':'missing anchor'})

for sample in SAMPLES:
 if not (ROOT/sample/'index.html').is_file():errors.append({'sample':sample,'error':'missing homepage'})
for p,page in pages.items():
 for ref in page.refs:check(p,ref)
 for ref in url_pattern.findall(p.read_text(encoding='utf-8')):check(p,ref)
for p in ROOT.rglob('*'):
 if p.suffix not in ('.css','.js','.svg'):continue
 text=p.read_text(encoding='utf-8')
 if p.suffix in ('.css','.svg'):
  for ref in url_pattern.findall(text):check(p,ref)
 if p.suffix=='.css':
  for ref in re.findall(r'@import\s+[\"\']([^\"\']+)',text):check(p,ref)
 if p.suffix=='.js':
  for ref in re.findall(r'(?:fetch|import)\s*\(\s*[\"\']([^\"\']+)',text):check(p,ref)
report={'samples':len(SAMPLES),'html_pages':len(pages),'local_references':checked,'anchors':anchors,'errors':errors,'external_urls':sorted(external)}
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(bool(errors))
