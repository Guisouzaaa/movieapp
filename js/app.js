const searchButton = document.getElementById("search");
const inputElement = document.getElementById("searchInput");
const movieFilter = document.querySelector(".movies-filter");
const moviesContainer = document.getElementById("upcoming-movies");
const similarMovies = document.getElementById("similar-movies");
const selectBtn = document.getElementById("select-genre");
const popularBtn = document.getElementById("popular");
const filterBtn = document.getElementById("filter-btn");
const displayPopular = document.getElementById('popular-container')
const popularContainer = document.getElementById('popular-movies')
const prevBtn = document.getElementById('previous-page')
const nextBtn = document.getElementById('next-page')
const filterPrev = document.getElementById('filter-prev')
const filterNext = document.getElementById('filter-next')

//Display movies
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
      });

      section.appendChild(img);
    }
  });
  return section;
}

//Movies container
const movieContainer = (movies, title = "") => {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const header = document.createElement("h1");
  header.innerHTML = title;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);

  return movieElement;
};

//searchMovies/filter
const renderFilteredMovie = (data) => {
  movieFilter.innerHTML = "";
  const movies = data.results;
  const movieBlock = movieContainer(movies);
  movieFilter.appendChild(movieBlock);

  filterBtn.addEventListener('click', e => {
    e.preventDefault();
    const genreValue = selectBtn.value
    const popularValue = popularBtn.value
    filterMovie(genreValue,popularValue)
    filterNext.style.display = "block"
    filterPrev.style.display = "block"
    displayPopular.style.display = "none"
  })
};

//render movies
function renderUpcoming(data) {
  const movies = data.results;
  const movieBlock = movieContainer(movies, this.title);
  moviesContainer.appendChild(movieBlock);
}

function renderPopular(data) {
  const movies = data.results;
  const movieBlock = movieContainer(movies, this.title);
  popularContainer.appendChild(movieBlock);
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

  displayPopular.style.display = "none"

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
  const genreName = genre.map(e => `<span>${e.name}</span>`).join(", ")

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
             <li>Release Date: ${movie.release_date}</li>
             <li>Genre: ${genreName}</li>
             <li>Duration: ${movie.runtime}</li>
             <li>Rating: ${movie.vote_average}</li>
           </ul>
        </div>
        <button class= "trailerBtn">Trailer</button>
    `
  document.getElementById("movie-detail").innerHTML = output;
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
  const movieBlock = movieContainer(movies, this.title);
  similarMovies.appendChild(movieBlock);
}

//Filter genre
function selectGenres(data){
  const genresSelect = data.genres
  let output = `<option value = "" selected="true">All</option>`
  for (let i in genresSelect) {
    output += `
         <option value="${genresSelect[i].id}">${genresSelect[i].name}</option> 
    `;
    document.querySelector("#select-genre").innerHTML = output;
  }
}

//Pagination of popular Movies
function popularPagination(){
  var value = 1
  nextBtn.addEventListener('click', e =>{
    e.preventDefault()
    if(value < 1000){
      value++
      getPopularMovies(value)
      popularContainer.innerHTML = ""
    }
  })
  
  prevBtn.addEventListener('click', e =>{
    e.preventDefault()
    if(value !== 1 ){
      value--
      getPopularMovies(value)
      popularContainer.innerHTML = ""
    }
  })
}

//Pagination of filtered movies
function filteredPagination(){
  var value = 1
  filterNext.addEventListener('click', e =>{
    e.preventDefault()
    if(value < 1000){
      value++
      const genreValue = selectBtn.value
      const popularValue = popularBtn.value
      filterMovie(genreValue,popularValue, value)
      popularContainer.innerHTML = ""
    }
  })
  
  filterPrev.addEventListener('click', e =>{
    e.preventDefault()
    if(value !== 1 ){
      value--
      const genreValue = selectBtn.value
      const popularValue = popularBtn.value
      filterMovie(genreValue,popularValue, value)
      popularContainer.innerHTML = ""
    }
  })
}