(() => {
 const ids = ["simple-1", "simple-2", "strength-1", "strength-2", "trust-1", "trust-2", "modern-1", "modern-2", "craftsman-1", "craftsman-2", "craftsman-3"];
 const parts = location.pathname.split('/').filter(Boolean);
 const id = ids.includes(parts[0]) ? parts[0] : parts[1];
 if (!ids.includes(id)) return;
 const bar = document.createElement('aside');
 bar.className = 'nexterra-sample-guide'; bar.setAttribute('aria-label','Nexterra制作サンプルのご案内');
 const label = document.createElement('span'); label.textContent = 'Nexterra制作サンプル：' + id + '｜掲載企業・フォームは架空です。'; bar.append(label);
 for (const [text, href] of [['11種類を比較','https://sample.nexterra-llc.jp/'],['このデザインで無料相談','https://nexterra-llc.jp/contact/?service=website&intent=consult&source=samples&design='+id],['制作を依頼する','https://nexterra-llc.jp/contact/?service=website&intent=request&source=samples&design='+id]]) {
   const a=document.createElement('a'); a.href=href; a.textContent=text; bar.append(a);
 }
 const style=document.createElement('style');style.textContent='.nexterra-sample-guide{position:fixed;inset:auto 0 0;z-index:9999;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 20px;padding:14px 18px!important;background:#102f42!important;color:#fff!important;font:13px/1.6 system-ui,sans-serif!important;box-sizing:border-box!important;min-height:60px}.nexterra-sample-guide a{color:#fff!important;text-decoration:underline!important;font:inherit!important;padding:6px 3px}.nexterra-sample-guide a:focus-visible{outline:3px solid #f3cd5e;outline-offset:3px}@media(max-width:600px){.nexterra-sample-guide span{width:100%;text-align:center}.nexterra-sample-guide{font-size:11px!important;gap:4px 12px}}';
 document.head.append(style);const originalPadding=parseFloat(getComputedStyle(document.body).paddingBottom)||0;document.body.append(bar);new ResizeObserver(()=>{document.body.style.paddingBottom=(originalPadding+bar.getBoundingClientRect().height)+'px'}).observe(bar);
})();
