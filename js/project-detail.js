// Build a table-of-contents for project pages by scanning .text-card .card-heading
(function(){
  function slugify(s){
    return s.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  function buildTOC(){
    const toc = document.querySelector('#project-toc ul');
    if(!toc) return;
    toc.innerHTML = '';
    // find headings inside .text-card elements, but skip the TOC card itself
    const cards = document.querySelectorAll('#project-page .text-card');
    cards.forEach(card => {
      if(card.closest && card.closest('#project-toc')) return; // skip TOC card
      const h = card.querySelector('.card-heading');
      if(!h) return;
      const title = h.textContent.trim();
      let id = card.id || slugify(title);
      // ensure unique id
      let uniq = id; let i=1;
      while(document.getElementById(uniq)) { uniq = id + '-' + i; i++; }
      id = uniq;
      card.id = id;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + id;
      a.textContent = title;
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
        // update active state
        document.querySelectorAll('#project-toc a').forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      });
      li.appendChild(a);
      toc.appendChild(li);
    });
  }

  // build after includes load and DOM ready
  function init(){
    buildTOC();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('includes:loaded', ()=> setTimeout(buildTOC,10));
})();
