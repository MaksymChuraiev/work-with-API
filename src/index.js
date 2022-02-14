import './sass/main.scss';
import { fetchApi } from './js/fetch';
import itemsTemplate from './template/markup.hbs';
// import modalTemplate from './template/modal-markup.hbs';

const LOCAL_DATA = 'allArticles';
const MY_ARTICLE = 'myArticle';

const refs = {
  input: document.querySelector('.search-input'),
  allButton: document.querySelector('.header-list__button-all'),
  form: document.querySelector('.form'),
  formButton: document.querySelector('.header-list__button-nothing'),
  cabinetButton: document.querySelector('.header-list__button-my'),
  closeCabinetButton: document.querySelector('.modal__btn-close'),
  articleList: document.querySelector('.inform-list'),
  filterEnglish: document.querySelector('.inform__english-button'),
  filterBusiness: document.querySelector('.inform__business-button'),
  filterUS: document.querySelector('.inform__us-button'),
  filterGen: document.querySelector('.inform__general-button'),
  filterMyArticle: document.querySelector('.inform-button'),
  formModal: document.querySelector('[data-form]'),
  formButtonClose: document.querySelector('.form__btn-close'),
  formButtonSave: document.querySelector('.form__button-save'),
  modal: document.querySelector('[data-modal]'),
  modalList: document.querySelector('.modal-list'),
};

refs.allButton.addEventListener('click', onCreateMarkup);
refs.formButton.addEventListener('click', onFormOpen);
refs.formButtonClose.addEventListener('click', onFormClose);

refs.cabinetButton.addEventListener('click', onModalOpen);
refs.closeCabinetButton.addEventListener('click', onModalClose);
refs.input.addEventListener('change', onSearchElement);
refs.filterEnglish.addEventListener('click', onEnglishLang);
refs.filterBusiness.addEventListener('click', onBusinessCategory);
refs.filterUS.addEventListener('click', onUsCategory);
refs.filterGen.addEventListener('click', onGeneralCategory);
refs.filterMyArticle.addEventListener('click', onMyCategory);

renderAll();

function onCreateMarkup(e) {
  renderAll();
}

function renderAll() {
  fetchApi()
    .then(responce => {
      refs.input.value = '';
      renderMarkup(responce.sources);
      localStorage.setItem(LOCAL_DATA, JSON.stringify(responce.sources));
    })
    .then(() => {
      const saveButton = refs.articleList.querySelectorAll('.article-button');
      saveButton.forEach(button => button.addEventListener('click', onSaveArticle));
    });
}

function onFormOpen() {
  refs.formModal.classList.remove('is-hidden');

  const newArticle = {
    name: '',
    category: '',
    description: '',
    url: '',
    language: '',
    country: '',
  };

  formFuncional(newArticle);

  refs.formButtonSave.addEventListener('click', onFormSave);

  function onFormSave(e) {
    e.preventDefault();

    if (
      newArticle.name &&
      newArticle.category &&
      newArticle.description &&
      newArticle.url &&
      newArticle.language &&
      newArticle.country
    ) {
      const localStorageData = JSON.parse(localStorage.getItem(LOCAL_DATA));
      const newLS = [...localStorageData, newArticle];
      localStorage.setItem(LOCAL_DATA, JSON.stringify(newLS));
      // myArticle();

      refs.form.reset();
      onFormClose();
    }
  }
}

function onSaveArticle(e) {
  const selectedArticle = e.currentTarget.parentNode.parentNode;
  const chelemText = selectedArticle.childNodes[1].textContent;

  const localData = JSON.parse(localStorage.getItem(LOCAL_DATA));
  const myData = JSON.parse(localStorage.getItem(MY_ARTICLE));

  const edit = localData.find(elem => {
    if (chelemText === elem.name) {
      return elem;
    }
  });

  if (myData === null) {
    const favotiteArticle = [];
    favotiteArticle.push(edit);

    localStorage.setItem(MY_ARTICLE, JSON.stringify(favotiteArticle));

    return;
  }

  const favotiteArticles = [...myData, edit];
  localStorage.setItem(MY_ARTICLE, JSON.stringify(favotiteArticles));
}

function myArticle() {
  const myData = JSON.parse(localStorage.getItem(MY_ARTICLE));

  if (myData === null || myData === undefined) {
    return;
  }
  refs.modalList.innerHTML = itemsTemplate(myData);
  // refs.modalList.insertAdjacentHTML('beforeend', itemsTemplate(myData));

  const modalListButton = refs.modalList.querySelectorAll('.article-button');
  const modalListButtonText = refs.modalList.querySelectorAll('.article-button__text');
  modalListButtonText.forEach(text => (text.textContent = 'удалить'));
  modalListButton.forEach(button => button.addEventListener('click', onDeleteMyList));
}

// myArticle();

function onSearchElement(e) {
  e.preventDefault();
  let search = refs.input.value;

  const localSearch = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.name === search,
  );

  renderMarkup(localSearch);

  // fetchApi()
  //   .then((responce) => {
  //     let article = responce.sources;
  //     const filterArticle = article.filter((value) => value.name === search);
  //     renderMarkup(filterArticle);
  //   })
  //   .then(() => {
  //     const saveButton = refs.articleList.querySelectorAll('.article-button');
  //     saveButton.forEach((button) =>
  //       button.addEventListener('click', onSaveArticle)
  //     );
  //   })
  //   .catch('1111');
}

function onEnglishLang(e) {
  const localEnglish = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.language === 'en',
  );
  renderMarkup(localEnglish);

  // fetchApi()
  //   .then((responce) => {
  //     let article = responce.sources;
  //     const enlishArticle = article.filter((value) => value.language === 'en');
  //     renderMarkup(enlishArticle);
  //   })
  //   .then(() => {
  //     const saveButton = refs.articleList.querySelectorAll('.article-button');
  //     saveButton.forEach((button) =>
  //       button.addEventListener('click', onSaveArticle)
  //     );
  //   })
  //   .catch('1111');
}

function onBusinessCategory(e) {
  const localBusiness = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.category === 'business',
  );
  renderMarkup(localBusiness);
  // fetchApi()
  //   .then((responce) => {
  //     let article = responce.sources;
  //     const businessArticle = article.filter(
  //       (value) => value.category === 'business'
  //     );
  //     renderMarkup(businessArticle);
  //   })
  //   .then(() => {
  //     const saveButton = refs.articleList.querySelectorAll('.article-button');
  //     saveButton.forEach((button) =>
  //       button.addEventListener('click', onSaveArticle)
  //     );
  //   })
  //   .catch('1111');
}

function onUsCategory(e) {
  const localUs = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.country === 'us',
  );
  renderMarkup(localUs);
  // fetchApi()
  //   .then((responce) => {
  //     let article = responce.sources;
  //     const usArticle = article.filter((value) => value.country === 'us');
  //     renderMarkup(usArticle);
  //   })
  //   .then(() => {
  //     const saveButton = refs.articleList.querySelectorAll('.article-button');
  //     saveButton.forEach((button) =>
  //       button.addEventListener('click', onSaveArticle)
  //     );
  //   })
  //   .catch('1111');
}

function onGeneralCategory(e) {
  const localGeneral = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.category === 'general',
  );
  renderMarkup(localGeneral);
  // fetchApi()
  //   .then((responce) => {
  //     let article = responce.sources;
  //     const generalArticle = article.filter(
  //       (value) => value.category === 'general'
  //     );
  //     renderMarkup(generalArticle);
  //   })
  //   .then(() => {
  //     const saveButton = refs.articleList.querySelectorAll('.article-button');
  //     saveButton.forEach((button) =>
  //       button.addEventListener('click', onSaveArticle)
  //     );
  //   })
  //   .catch('1111');
}

function onMyCategory(e) {
  const localMyArticle = JSON.parse(localStorage.getItem(LOCAL_DATA)).filter(
    article => article.name === 'Maksym',
  );
  renderMarkup(localMyArticle);
}

function onDeleteMyList(e) {
  const myItem = e.currentTarget.parentNode.parentNode;
  myItem.remove();
  localStorage.removeItem(MY_ARTICLE);
}

function renderMarkup(articles) {
  refs.articleList.innerHTML = '';
  const markup = itemsTemplate(articles);

  refs.articleList.innerHTML = markup;
}

function onFormClose(e) {
  refs.formModal.classList.add('is-hidden');
}

function onModalOpen(e) {
  refs.modal.classList.remove('is-hidden');
  myArticle();
}

function onModalClose(e) {
  refs.modal.classList.add('is-hidden');
}

function formFuncional(newArticle) {
  const input = refs.form.querySelectorAll('input');

  input.forEach(el => {
    el.addEventListener('change', onInputChange);
    console.log(el);
  });

  function onInputChange(e) {
    newArticle[e.target.name] = e.target.value;
  }
}
