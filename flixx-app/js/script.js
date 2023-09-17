const global = {
  currentPage: window.location.pathname,
  api: {
    apiKey: '4ab5862a5adc673134e05793e467432b',
    apiURL: 'https://api.themoviedb.org/3/',
  },
};
const popularMovies = document.querySelector('#popular-movies');
const popularShows = document.querySelector('#popular-shows');

async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;
  showSpinner();

  try {
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Request Failed');
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function searchDataAPI(type, searchTerm) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;
  showSpinner();

  try {
    const response = await fetch(
      `${API_URL}search/${type}?query=${searchTerm}&api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error('Request Failed');
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayPopularMovies() {
  const response = await fetchAPIData('movie/popular');
  const movies = response.results;
  //const popularMovies = document.querySelector('#popular-movies');
  popularMovies.innerHTML = '';

  movies.forEach((movie) => {
    const a = document.createElement('a');
    a.setAttribute('href', `movie-details.html?id=${movie.id}`);

    const img = document.createElement('img');
    if (movie.poster_path) {
      img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${movie.poster_path}`
      );
    } else {
      img.setAttribute('src', 'images/no-image.jpg');
    }
    img.className = 'card-img-top';
    img.setAttribute('alt', movie.title);
    a.appendChild(img);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = movie.title;

    const text = document.createTextNode(
      'Release: ' +
        movie.release_date.substring(8) +
        '/' +
        movie.release_date.substring(5, 7) +
        '/' +
        movie.release_date.substring(0, 4)
    );

    const small = document.createElement('small');
    small.className = 'text-muted';
    small.appendChild(text);

    const p = document.createElement('p');
    p.className = 'card-text';
    p.appendChild(small);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.appendChild(h5);
    cardBody.appendChild(p);

    const card = document.createElement('div');
    card.className = 'card';
    card.appendChild(a);
    card.appendChild(cardBody);

    popularMovies.appendChild(card);
  });
}

async function displayPopularTVShows() {
  const response = await fetchAPIData('tv/popular');
  const shows = response.results;
  //const popularShows = document.querySelector('#popular-shows');
  popularShows.innerHTML = '';

  shows.forEach((show) => {
    const a = document.createElement('a');
    a.setAttribute('href', `tv-details.html?id=${show.id}`);

    const img = document.createElement('img');
    if (show.poster_path) {
      img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${show.poster_path}`
      );
    } else {
      img.setAttribute('src', 'images/no-image.jpg');
    }
    img.className = 'card-img-top';
    img.setAttribute('alt', show.title);
    a.appendChild(img);

    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = show.name;

    const text = document.createTextNode(
      'Aired: ' +
        show.first_air_date.substring(8) +
        '/' +
        show.first_air_date.substring(5, 7) +
        '/' +
        show.first_air_date.substring(0, 4)
    );

    const small = document.createElement('small');
    small.className = 'text-muted';
    small.appendChild(text);

    const p = document.createElement('p');
    p.className = 'card-text';
    p.appendChild(small);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.appendChild(h5);
    cardBody.appendChild(p);

    const card = document.createElement('div');
    card.className = 'card';
    card.appendChild(a);
    card.appendChild(cardBody);

    popularShows.appendChild(card);
  });
}

async function displayMovieDetails() {
  const movieID = window.location.href.split('=')[1];
  const movieDetails = await fetchAPIData('movie/' + movieID);

  let movieDetailsDiv = document.querySelector('#movie-details');
  movieDetailsDiv.innerHTML = `
    <div class="details-top">
        <div>
        <img src=${
          movieDetails.poster_path
            ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`
            : 'images/no-image.jpg'
        } class="card-img-top" alt=${movieDetails.title} />
        </div>
        <div>
        <h2>${movieDetails.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>${movieDetails.vote_average.toFixed(
              2
            )}/10
        </p>
        <p class="text-muted">${
          'Release Date: ' +
          movieDetails.release_date.substring(8) +
          '/' +
          movieDetails.release_date.substring(5, 7) +
          '/' +
          movieDetails.release_date.substring(0, 4)
        }</p>
        <p>${movieDetails.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${movieDetails.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="#" target="_blank" class="btn">
            Visit Movie Homepage
        </a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li>
            <span class="text-secondary">Budget:</span> $${movieDetails.budget}
        </li>
        <li>
            <span class="text-secondary">Revenue:</span> $${
              movieDetails.revenue
            }
        </li>
        <li>
            <span class="text-secondary">Runtime:</span> ${
              movieDetails.runtime
            } minutes
        </li>
        <li>
            <span class="text-secondary">Status:</span> ${movieDetails.status}
        </li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
        ${movieDetails.production_companies
          .map((company) => `${company.name}`)
          .join(', ')}
        </div>
    </div>`;
  addOverlayDiv('movie', movieDetails.backdrop_path);
}

async function displayShowDetails() {
  const showID = window.location.href.split('=')[1];
  const showDetails = await fetchAPIData('tv/' + showID);

  let showDetailsDiv = document.querySelector('#show-details');
  showDetailsDiv.innerHTML = `
      <div class="details-top">
          <div>
          <img src=${
            showDetails.poster_path
              ? `https://image.tmdb.org/t/p/original/${showDetails.poster_path}`
              : 'images/no-image.jpg'
          } class="card-img-top" alt=${showDetails.name} />
          </div>
          <div>
          <h2>${showDetails.name}</h2>
          <p>
              <i class="fas fa-star text-primary"></i>${showDetails.vote_average.toFixed(
                2
              )}/10
          </p>
          <p class="text-muted">${
            'Release Date: ' +
            showDetails.first_air_date.substring(8) +
            '/' +
            showDetails.first_air_date.substring(5, 7) +
            '/' +
            showDetails.first_air_date.substring(0, 4)
          }</p>
          <p>${showDetails.overview}</p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${showDetails.genres
            .map((genre) => `<li>${genre.name}</li>`)
            .join('')}
          </ul>
          <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
      </div>
      <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> 
            ${showDetails.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> 
              ${showDetails.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> 
            ${showDetails.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${showDetails.production_companies
            .map((company) => `${company.name}`)
            .join(', ')}
          </div>
        </div>`;
  addOverlayDiv('show', showDetails.backdrop_path);
}

async function displaySlider() {
  const response = await fetchAPIData('movie/now_playing');
  const movies = response.results;

  movies.forEach((movie) => {
    const img = document.createElement('img');
    if (movie.poster_path) {
      img.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original/${movie.poster_path}`
      );
    } else {
      img.setAttribute('src', 'images/no-image.jpg');
    }

    const a = document.createElement('a');
    a.setAttribute('href', `movie-details.html?id=${movie.id}`);
    a.appendChild(img);

    const i = document.createElement('i');
    i.className = 'fas fa-star text-secondary';
    i.innerText = `${movie.vote_average}/10`;

    const h4 = document.createElement('h4');
    h4.className = 'swiper-rating';
    h4.appendChild(i);

    const div = document.createElement('div');
    div.className = 'swiper-slide';
    div.appendChild(a);
    div.appendChild(h4);

    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  initSwiper();
}

async function displayMoviesOrShows() {
  const type = window.location.search.split('&')[0].split('=')[1];
  const searchTerm = window.location.search
    .split('&')[1]
    .split('=')[1]
    .split('+')
    .join(' ');

  const response = await searchDataAPI(type, searchTerm);
  const moviesOrShows = response.results;
  console.log(moviesOrShows);

  const searchReasults = document.querySelector('#search-results');
  searchReasults.innerHTML = '';

  moviesOrShows.forEach((movieOrShow) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <a href="${type}-details.html?id=${movieOrShow.id}">
            <img src=${
              movieOrShow.poster_path
                ? `https://image.tmdb.org/t/p/original/${movieOrShow.poster_path}`
                : 'images/no-image.jpg'
            } class="card-img-top" alt=${
      type === 'movie' ? movieOrShow.title : movieOrShow.name
    } />
        </a>
        <div class="card-body">
            <h5 class="card-title">${
              type === 'movie' ? movieOrShow.title : movieOrShow.name
            }</h5>
            <p class="card-text">
            <small class="text-muted">Release: ${
              type === 'movie'
                ? `${movieOrShow.release_date.substring(
                    8
                  )}/${movieOrShow.release_date.substring(
                    5,
                    7
                  )}/${movieOrShow.release_date.substring(0, 4)}`
                : `${movieOrShow.first_air_date.substring(
                    8
                  )}/${movieOrShow.first_air_date.substring(
                    5,
                    7
                  )}/${movieOrShow.first_air_date.substring(0, 4)}`
            }</small>
            </p>
        </div>`;
    searchReasults.appendChild(div);
  });
}

function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

function addOverlayDiv(type, backdrop_path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.zIndex = -1;
  overlayDiv.style.opacity = 0.15;

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    keyboard: { enabled: true, nlyInViewport: true },
    breakpoints: {
      500: { slidesPerView: 3 },
      700: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    },
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies('movie/popular');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/search.html':
      displayMoviesOrShows();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
