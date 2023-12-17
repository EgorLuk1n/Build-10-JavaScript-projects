const API_KEY = "a68d14e2-ea38-4430-8da4-a2e8c0442adc";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=1";
const API_URL_MOVIES_DETAILS = `https://kinopoiskapiunofficial.tech/api/v2.2/films/`

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          class="movie__cover"
          src="${movie.posterUrlPreview}"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
          (genres) => `${genres.genre}`
        )}</div>
        ${movie.ratingKinopoisk ? `<div class="movie__average movie__average--${getClassByRate(
            movie.ratingKinopoisk
          )}">${movie.ratingKinopoisk}</div>` : ''}
      </div>
        `;

    movieEl.addEventListener('click', () => {
        openModal(movie.kinopoiskId)
    })
    moviesEl.appendChild(movieEl);
  });
}

//Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
const resp = await fetch(API_URL_MOVIES_DETAILS + id, {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      });
      const respData = await resp.json();
  modalEl.classList.add("modal--show");
  document.body.classList.add('stop-scrolling')
  modalEl.innerHTML = `
<div class="modal__card">
<img src="${respData.posterUrl}" alt="${respData.nameRu}" class="modal__movie-backdrop">
<h2>
    <span class="modal__movie-title">${respData.nameRu}</span>
    <span class="modal__movie-release-year">${respData.year}</span>
</h2>
<ul class="modal__movie-info">
    <div class="loader"></div>
    <li class="modal__movie-genre">${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
    ${respData.filmLength ? `<li class="modal__movie-runtime">Продолжительность ${respData.filmLength} минут</li>` : ''}
    
    <li>Сайт <a href="${respData.webUrl}" class="modal__movie-site">${respData.webUrl}</a></li>
    <li class="modal__movie-overview">${respData.description}</li>
</ul>
<button class="modal__button-close">Закрыть окно</button>
</div> 
`;
const btnClose = document.querySelector('.modal__button-close')
btnClose.addEventListener('click', () => {
    closeModal()
})
}

function closeModal () {
    modalEl.classList.remove('modal--show')
    document.body.classList.remove('stop-scrolling')
}
window.addEventListener('click', (e) => {
    if (e.target === modalEl) {
        closeModal()
    }
})
