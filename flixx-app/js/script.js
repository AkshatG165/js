const global = {
  currentPage: window.location.pathname,
};
const popularMovies = document.querySelector('#popular-movies');
const popularShows = document.querySelector('#popular-shows');

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies('movie/popular');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
    case '/shows.html':
      console.log('TV Shows');
      displayPopularTVShows();
      break;
    case '/tv-details.html':
      console.log('TV Show Details');
      break;
  }
  highlightActiveLink();
}

function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY = '4ab5862a5adc673134e05793e467432b';
  const API_URL = 'https://api.themoviedb.org/3/';
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
  <div id="movie-details">
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
        <span class="text-secondary">Revenue:</span> $${movieDetails.revenue}
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
  </div>
</div>`;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', init);
