// Back-to-top floating button: show when scrolled down, smooth-scroll to top on click
(function(){
  const ID = 'scroll-top';
  const VISIBLE_CLASS = 'visible';
  const SHOW_PX = 120;

  function onScroll(){
    const btn = document.getElementById(ID);
    if(!btn) return;
    if(window.scrollY > SHOW_PX) btn.classList.add(VISIBLE_CLASS);
    else btn.classList.remove(VISIBLE_CLASS);
  }

  function init(){
    const btn = document.getElementById(ID);
    if(!btn) return;
    btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
    // accessibility: allow Enter/Space on focused button (button already supports it)
    window.addEventListener('scroll', onScroll, {passive:true});
    // initial state
    onScroll();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
