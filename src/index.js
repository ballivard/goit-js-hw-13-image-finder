import service from './apiService';
import imagesTemplate from './templates/template.hbs';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('button[data-action="load-more"]');

searchForm.addEventListener('submit', onSubmit);
loadMoreButton.addEventListener('click', onLoadButton);

function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();
  service.resetPage();
  service.searchQuerry = input.value;
  service.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    listItems(markup);
  });

  input.value = '';
}

function onLoadButton() {
  service.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    listItems(markup);
  });
  scrollIntoView();
}

function scrollIntoView() {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 250);
}

function listItems(items) {
  gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return imagesTemplate(items);
}

function clearListItems() {
  gallery.innerHTML = '';
}