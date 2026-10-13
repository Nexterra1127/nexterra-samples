const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

const syncMobileNavPosition = () => {
  if (!siteNav || !siteHeader) return;
  if (window.innerWidth <= 760) {
    siteNav.style.top = `${siteHeader.offsetHeight}px`;
  } else {
    siteNav.style.top = '';
    siteNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
};

syncMobileNavPosition();
window.addEventListener('resize', syncMobileNavPosition);

menuButton?.addEventListener('click', () => {
  syncMobileNavPosition();
  const open = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#contact-demo-button')?.addEventListener('click', () => {
  alert('この入力欄はサンプル表示用です。入力内容は送信・保存されません。');
});
