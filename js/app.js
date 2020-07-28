const searchButton = document.getElementById("search");
const inputElement = document.getElementById("searchInput");
const movieSearch = document.getElementById("movies-search");
const moviesContainer = document.getElementById("movie-container");
// const movieReviews = document.querySelector(".movie-reviews");
const similarMovies = document.getElementById("similar-movies");
// const detailsContainer = document.getElementById("movie-detail");

//movie items
const movieSection = (movie) => {
  const section = document.createElement("section");
  section.classList = "movie-section";

  movie.map((movie) => {
    if (movie.poster_path) {
      const img = document.createElement("img");
      img.src = IMAGE_URL + movie.poster_path;
      img.setAttribute("data-movie-id", movie.id);
      img.addEventListener("click", function () {
        movieDetails(movie.id);
        // showDetails();
      });

      section.appendChild(img);
    }
  });
  return section;
}

//create movie container
const movieContaier = (movies, title = "") => {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const header = document.createElement("h1");
  header.innerHTML = title;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);

  return movieElement;
};

//searchMovies
const renderSearchMovies = (data) => {
  movieSearch.innerHTML = "";
  const movies = data.results;
  console.log(movies);
  const movieBlock = movieContaier(movies);
  movieSearch.appendChild(movieBlock);
};

//render movies
function renderMovies(data) {
  const movies = data.results;
  const movieBlock = movieContaier(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

//Error
const handleError = (error) => {
  console.log(error);
};

//search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputElement.value;
  searchMovie(value);

  inputElement.value = "";
});

//get movies id
function movieDetails(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}


//Movie Details output
const getDetails = (data) => {
  const movie = data;
  const genre = data.genres;
  let output2 = ``
  genre.map(genres => {
    console.log(genres.name)
    output2 =`
    <li>Genres: ${genres.name}</li>
    `

    document.getElementById("movie-detail2").innerHTML = output2;
  })
  // console.log(genre)

  // let output = ` `
  // for (let i in genre){
    let output = `
    <img src = "${IMAGE_URL + movie.poster_path}"  data-movie-id="${movie.id}"/>
    <div>
      <h1>Movie overview</h1>
      <p>${movie.overview}</p>
    </div>
    <div class = "detailInfo">
    <h1>Details</h1>
       <ul>
          <li>Title: ${movie.title}</li>
          <li>Original Title: ${movie.original_title}</li>
          <li>Release Date: ${movie.release_date}</li>
          <li>Genre: ${genre[0].name}</li>
          <li>Duration: ${movie.runtime}</li>
          <li>Rating: ${movie.vote_average}</li>
       </ul>
    </div>
    <button class= "trailerBtn">Trailer</button>

    `
  // }
          
  document.getElementById("movie-detail").innerHTML = output;
  // document.getElementById("movie-detail").innerHTML = outpu2;

};

// Display movie trailer
const getTrailer = (data) => {
  const movie = data.results;
  document.addEventListener("click", e => {
    if (e.target.className === "trailerBtn") {
      let output = `
          <iframe src = "https://www.youtube.com/embed/${movie[0].key}" width="250" height="300"></iframe>
      `;
      document.querySelector(".movie-trailer").innerHTML = output;
    }
  });
};

//Movie Reviews
function getReviews(data) {
  const movie = data.results;
  movie.length = 4;
  let output = `<h2>Reviews</h2>`;
  for (let i in movie) {
    output += `
        <h3>${movie[i].author}</h3>
        <p>${movie[i].content}</p>
        <a href = "${movie[i].url}">Link</a>
    `;
  }
  document.querySelector(".movie-reviews").innerHTML = output;
}

//Similar movies
function getSimilarMovies(data) {
  const movies = data.results;
  movies.length = 5;
  const movieBlock = movieContaier(movies, this.title);
  similarMovies.appendChild(movieBlock);
}

// Display movie details
// const showDetails = () => {
//   document.addEventListener("click", (e) => {
//     const target = e.target;
//     if (target.tagName === "IMG") {
//       var movieId = target.getAttribute("data-movie-id");
//       movieDetails(movieId);
//     }
//   });
// };

function movieData() {
  getMovieDetails();
  getMovieTrailer();
  getMovieReviews();
  getMovieRecommendations();
}

function homeData() {
  getUpcomingMovies();
  getPopularMovies();
  getTopRated();
}
