import galleryItems from './gallery-items.js';

const galleryList = document.querySelector('.js-gallery');
const cardsMarkup = createPicturesGallery(galleryItems);

galleryList.insertAdjacentHTML("beforeend", cardsMarkup);

function createPicturesGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

//клик по картинке
const lightboxImgEl = document.querySelector('.lightbox__image');
const closeButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightBoxEl = document.querySelector('.js-lightbox');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

galleryList.addEventListener('click', onGalleryElClick);

function onGalleryElClick (evt) {
  evt.preventDefault();
  const isGalleryImageEl = evt.target.classList.contains('gallery__image');
  if(isGalleryImageEl){
    isModalOpen(evt)
  }
  return;
}

closeButtonEl.addEventListener('click', isModalClose)
lightBoxEl.addEventListener("click", modalCloseOverlayClick);
window.addEventListener("keydown", modalCloseEscClick);

function isModalOpen (evt) {
  lightBoxEl.classList.add("is-open");
  imgUpdateAttributes (evt.target.dataset.source, evt.target.attributes.alt.nodeValue)
}

function isModalClose (evt) {
  lightBoxEl.classList.remove("is-open");
  imgUpdateAttributes('','')
}

function modalCloseEscClick(evt) {
  if (evt.code === "Escape") {
    isModalClose(evt);
  }
}

function modalCloseOverlayClick(evt) {
  const isLightboxOverlayEl = evt.target.classList.contains('lightbox__overlay');
  if (isLightboxOverlayEl) {
    isModalClose(evt);
  }      
  return;
}

function imgUpdateAttributes(src, alt) {
  lightboxImgEl.src = src;
  lightboxImgEl.alt = alt;
}