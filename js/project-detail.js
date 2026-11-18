// Build a table-of-contents for project pages by scanning .text-card .card-heading
(function(){
  function slugify(s){
    return s.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }

  function initImageLightbox(){
    const images = document.querySelectorAll('#project-page .in-card-image');
    if(!images.length) return;

    let dialog = document.querySelector('#project-image-lightbox');
    if(!dialog){
      dialog = document.createElement('dialog');
      dialog.id = 'project-image-lightbox';
      dialog.className = 'project-image-lightbox';
      dialog.setAttribute('aria-label', 'Enlarged project image');
      dialog.innerHTML = `
        <button class="image-lightbox-close" type="button" aria-label="Close enlarged image">&times;</button>
        <img src="" alt="">
      `;
      document.body.appendChild(dialog);
    }

    const enlargedImage = dialog.querySelector('img');
    const closeButton = dialog.querySelector('.image-lightbox-close');

    function closeLightbox(){
      if(dialog.open) dialog.close();
      document.body.classList.remove('image-lightbox-open');
    }

    closeButton.addEventListener('click', closeLightbox);
    dialog.addEventListener('close', () => {
      document.body.classList.remove('image-lightbox-open');
    });
    dialog.addEventListener('click', event => {
      if(event.target === dialog) closeLightbox();
    });

    images.forEach(image => {
      if(image.dataset.lightboxInitialized) return;
      image.dataset.lightboxInitialized = 'true';
      image.setAttribute('role', 'button');
      image.setAttribute('tabindex', '0');
      image.setAttribute('aria-label', `Enlarge image: ${image.alt}`);

      function openLightbox(){
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt;
        dialog.showModal();
        document.body.classList.add('image-lightbox-open');
        closeButton.focus();
      }

      image.addEventListener('click', openLightbox);
      image.addEventListener('keydown', event => {
        if(event.key === 'Enter' || event.key === ' '){
          event.preventDefault();
          openLightbox();
        }
      });
    });
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
        a.blur();
      });
      li.appendChild(a);
      toc.appendChild(li);
    });
  }

  // build after includes load and DOM ready
  function init(){
    buildTOC();
    initImageLightbox();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('includes:loaded', ()=> setTimeout(buildTOC,10));
})();
