// Getting elements from the dom
const inputElement = document.getElementById("searchInput");
const movieFilter = document.querySelector(".movies-filter");
const moviesContainer = document.getElementById("upcoming-movies");
const similarMovies = document.getElementById("similar-movies");
const selectBtn = document.getElementById("select-genre");
const popularSelect = document.getElementById("filter-movie");
const displayPopular = document.getElementById('popular-container')
const popularContainer = document.getElementById('popular-movies')
const filterSelect = document.getElementById('filter-movie')

//searchMovies/filter
const renderFilteredMovie = (data) => {
  movieFilter.innerHTML = "";
  const movies = data.results;
  // console.log(movies)
  let output = ``
  for (let i in movies){
    if (movies[i].poster_path){
      output += `
      <div class="movie-item">
      <div class ="img-container">
         <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
      <div class="details-btn">
         <button>Details</button>
       </div>
      </div>
       
        
        <span class="movie-title">${movies[i].title}</span>
          
       <div class ="movie-rating">
         <i class="far fa-star"></i><p>${movies[i].vote_average}</p>
       </div>
     </div>  
    `
    document.querySelector(".movies-filter").innerHTML = output;

    }
  }


  document.querySelector('.filter-btn').addEventListener('click', e => {
    e.preventDefault();
    const genreValue = selectBtn.value
    // console.log(genreValue)
    const popularValue = popularSelect.value
    const genreTxt = selectBtn.options[selectBtn.selectedIndex].text;
    const filterTxt = filterSelect.options[filterSelect.selectedIndex].text;

    filterMovie(genreValue,popularValue)


    document.querySelector('form').classList.remove('nav-active')
    // document.querySelector('.burger').classList.toggle('burgerToggle')
    document.querySelector('.name-value').style.display = "none"
    document.querySelector('.item-searched').style.display = "flex"
    document.getElementById("genre").innerHTML = genreTxt;
    document.getElementById("filter").innerHTML = filterTxt;

    document.querySelector('.pagination-btn').classList.add('show', 'pagination')
    displayPopular.classList.add('hide')
  })
  
};


//render movies
function renderUpcoming(data) {
  const movies = data.results;
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
      <div class ="swiper-slide">
         <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
         <span class="movie-date">${movies[i].release_date}</span>
      </div>
   `
    document.querySelector(".swiper-wrapper").innerHTML = output;
    }
  }
}

//Movie Details
document.addEventListener('click', e => {
  if(e.target.tagName === "IMG"){
    let movieId = e.target.getAttribute("data-movie-id")
    movieDetails(movieId)
  }
})

function renderPopular(data) {
  const movies = data.results;
  // console.log(movies)
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
        <div class="movie-item">
         <div class ="img-container">
            <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/>
         <div class="details-btn">
            <button>Details</button>
          </div>
         </div>
          
           
           <span class="movie-title">${movies[i].title}</span>
             
          <div class ="movie-rating">
            <i class="far fa-star"></i><p>${movies[i].vote_average}</p>
          </div>
        </div>  
     `
     document.getElementById("popular-movies").innerHTML = output;
    }
  }
}

//Error
const handleError = (error) => {
  console.log(error);
};

//search button
document.getElementById('search').addEventListener("click", (e) => {
  e.preventDefault();

  if(inputElement.value){
    const value = inputElement.value;
    searchMovie(value);
  
    document.querySelector('.item-searched').style.display = 'none'
    document.querySelector('.name-value').style.display = "flex"
    document.getElementById("movie-name").innerHTML = value;
    displayPopular.classList.add('hide')
  
    inputElement.value = "";
  }
});

//get movies id
function movieDetails(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getImages(data) {
  const img = data.backdrops
  document.getElementById('movie-banner').style.backgroundImage = `url('${'https://image.tmdb.org/t/p/original' + img[0].file_path}')`
}

//Movie Details output
const getDetails = (data) => {
  const movie = data;
  console.log(movie)
  const genre = data.genres;
  const genreName = genre.map(e => `<span>${e.name}</span>`).join(", ")


    let output = `
        <div class = "poster-movie">
        <img src = "${IMAGE_URL + movie.poster_path}"/>
        <div class="bgimg"></div>
        </div>
        <div class= "details-container">

        

        
        <div class="movie-title">
        <span></span>
        <h1>${movie.title}</h1>
        </div>


        <div class = "overview">
           <div class="title-section">
             <span></span>
             <h1>Movie overview</h1>
           </div>
            <p>${movie.overview}</p>
        </div>


        
        <div class = "detail-info">
        <div class="title-section">
             <span></span>
             <h1>Movie Details</h1>
        </div>
    
           
           <ul>
             <li><span class="contrast">Title:</span> ${movie.title}</li>
             <li><span class="contrast">Release Date:</span> ${movie.release_date}</li>
             <li><span class="contrast">Genre:</span> ${genreName}</li>
             <li><span class="contrast">Duration:</span> ${movie.runtime} min</li>
             <li><span class="contrast">Rating</span> ${movie.vote_average}</li>
           </ul>
        

           
        </div>
     







        </div>

    `
  document.getElementById("movie-detail").innerHTML = output;
};


// Display movie trailer
const getTrailer = (data) => {
  const movie = data.results;
  // console.log(movie)
  let output = `
 
  <a class="popup-youtube" href="https://www.youtube.com/watch?v=${movie[0].key}"><i class="far fa-play-circle"></i></a>
  

      
  `;
  document.querySelector(".movie-trailer").innerHTML = output;
  // document.getElementById('movie-detail').innerHTML = output;
}

//Movie Reviews
function getReviews(data) {
  const movie = data.results;
  console.log(movie)
  let output = ``;
  if(movie.length === 0){
    document.querySelector(".reviews-section").style.display = "none"

  }else{
    for (let i in movie) {
      if(movie[i].content){
        output += `
        <div>
            <h3>By: ${movie[i].author}</h3>
            <p>${movie[i].content}</p>
            <a href = "${movie[i].url}">See the post</a>
        </div>
        `;
      }
    }
  }
  document.querySelector(".movie-reviews").innerHTML = output;
}

//Similar movies
function getSimilarMovies(data) {
  const movies = data.results;
  // movies.length = 5;
  let output = ``
  for (let i in movies){
    if(movies[i].poster_path){
      output += `
        <div class ="swiper-slide">
           <img src ="${IMAGE_URL + movies[i].poster_path}" data-movie-id="${movies[i].id}"/> 
           <p>${movies[i].title}</p>
        </div>
      `
    document.querySelector(".swiper-wrapper").innerHTML=output
    }
  }
}

//Filter genre
function selectGenres(data){
  const genreOptions = data.genres
  let output = `<option value = "" selected="true">All</option>`
  for (let i in genreOptions) {
    output += `
         <option value="${genreOptions[i].id}">${genreOptions[i].name}</option>
    `;
    document.getElementById("select-genre").innerHTML = output;
  }
}

//Pagination of popular Movies
function pagination(){
  var value = 1
  document.addEventListener('click', e =>{
    e.preventDefault()
    if(e.target.className==='next-page'){
      if(value < 1000){
        value++
        getPopularMovies(value)
        popularContainer.innerHTML = ""
      }

    } else if (e.target.className === 'previous-page'){
      if(value !== 1 ){
        value--
        getPopularMovies(value)
        popularContainer.innerHTML = ""
      }

    } else if (e.target.className === 'filter-next'){
      if(value < 1000){
        value++
        const genreValue = selectBtn.value
        const popularValue = popularSelect.value
        filterMovie(genreValue,popularValue, value)
        popularContainer.innerHTML = ""
      }

    }else if (e.target.className === 'filter-prev'){
      if(value !== 1 ){
        value--
        const genreValue = selectBtn.value
        const popularValue = popularSelect.value
        filterMovie(genreValue,popularValue, value)
        popularContainer.innerHTML = ""
      }
    }
  })
}



