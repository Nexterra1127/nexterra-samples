const header=document.querySelector('header'),menu=document.querySelector('.menu'),nav=document.querySelector('nav'),bar=document.querySelector('.progress');addEventListener('scroll',()=>{header.classList.toggle('solid',scrollY>24);const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h?scrollY/h*100:0)+'%'});menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open);document.body.classList.toggle('locked',!open)});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('locked')}));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('section:not(.hero):not(.page-hero),article').forEach(el=>{el.classList.add('reveal');io.observe(el)});document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const m=e.currentTarget.querySelector('.success');m.hidden=false;m.scrollIntoView({behavior:'smooth',block:'nearest'})});
/* Keep industry terms intact on narrow screens without fixing whole sentences. */
(() => {
  const terms = [
    "高圧受変電設備", "自動火災報知設備", "非常用発電設備", "給排水衛生設備工事",
    "業務用空調設備工事", "換気・排煙設備工事", "ウレタン塗膜防水", "フレキシブルダクト",
    "パッケージエアコン", "給排水衛生設備", "受変電・幹線設備", "非常用電源・防災設備",
    "ダクト製作・取付", "空調・換気設備工事", "空調・換気ダクト", "冷媒・ドレン配管工事",
    "アスファルト防水", "ベランダ・廊下防水", "漏水調査・部分補修", "古民家再生",
    "給水ポンプ設備", "給水ポンプ更新", "給水設備工事", "排水設備", "通気設備",
    "衛生設備工事", "衛生器具", "給湯設備", "給水方式", "受水槽", "排水ポンプ",
    "受変電設備", "幹線・分電盤設備", "LED照明設備", "照明・動力設備", "弱電・通信設備",
    "防犯カメラ設備", "コンセント設備", "電気設備工事", "電気設備", "分電盤",
    "シート防水", "屋上防水", "防水工事", "防水工法", "防水性能", "防水層",
    "劣化状況調査", "散水調査", "現地調査", "施工計画", "改修工事",
    "給排気設備", "排煙ダクト工事", "厨房排気・フード工事", "保温・防露工事",
    "ドレン配管", "冷媒配管", "空調設備", "換気設備", "既存設備", "設備改修",
    "注文住宅", "外壁塗装", "耐震基準", "修繕計画", "定期点検"
  ].sort((a, b) => b.length - a.length);
  const escape = term => term.replace(/[.*+?^$()|[\]\\{}]/g, "\\$&");
  const pattern = new RegExp(terms.map(escape).join("|"), "g");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      pattern.lastIndex = 0;
      return parent && !parent.closest("script,style,textarea,.term-keep,.phrase-heading") && pattern.test(node.data)
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    pattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let last = 0;
    for (const match of node.data.matchAll(pattern)) {
      fragment.append(node.data.slice(last, match.index));
      const span = document.createElement("span");
      span.className = "term-keep";
      span.textContent = match[0];
      fragment.append(span);
      last = match.index + match[0].length;
    }
    fragment.append(node.data.slice(last));
    node.replaceWith(fragment);
  });
})();
