const searchButton = document.getElementById('search')
const inputElement = document.getElementById('searchInput')
const movieSearch = document.getElementById('movies-search')
const moviesContainer = document.getElementById('movie-container')
const detailsContainer = document.getElementById('movie-detail')


//movie items
const movieSection = movie => {
    const section = document.createElement('section')
    section.classList = 'section'

     movie.map((movie) =>{
      if(movie.poster_path){
          const img = document.createElement('img')
          img.src = IMAGE_URL + movie.poster_path
          img.setAttribute('data-movie-id', movie.id)
          img.addEventListener('click', function() {
              movieDetails(movie.id)
          })

          section.appendChild(img)
      }
    })

    return section
}

//create movie container
const movieContaier = (movies, title = '') => {
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class', 'movie')

    const header = document.createElement('div')
    header.innerHTML = title

    const content = document.createElement('div')
    content.classList = 'content'

    const contentClose = `<p id ="content-close">X</p>`
    content.innerHTML = contentClose

    const section = movieSection(movies)

    movieElement.appendChild(header)
    movieElement.appendChild(section)
    movieElement.appendChild(content)
    return movieElement
}

//searchMovies
const renderSearchMovies = data => {
    movieSearch.innerHTML = '';
    const movies = data.results
    const movieBlock = movieContaier(movies)
    movieSearch.appendChild(movieBlock)
}

function renderMovies(data) {
    const movies = data.results
    const movieBlock = movieContaier(movies, this.title)
    moviesContainer.appendChild(movieBlock)
}

const handleError = error => {
    console.log(error)
}

//call data
searchButton.addEventListener('click', e =>{
    e.preventDefault()
    const value = inputElement.value
    searchMovie(value)

    inputElement.value = '';
}) 

function movieDetails(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false
}

//Movie Details
function getDetails(){
    let movieId = sessionStorage.getItem('movieId');
    const path = `/movie/${movieId}`
    const url = dinamicUrl(path)

    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            const movie = data
            const genre = data.genres
            
            let output = `
            <img src = "${IMAGE_URL + movie.poster_path}"/>
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
                  <li>Genre: ${genre[0].name}/${genre[1].name}/${genre[2].name}/${genre[3].name}</li>
                  <li>Duration: ${movie.runtime}</li>
                  <li>Rating: ${movie.vote_average}</li>
               </ul>
            </div>
            <a href = "index.html">Back to home</a>
            `
            document.getElementById("movie-detail").innerHTML = output;
        })
}

//Movie Reviews
function getReviews(){
    let movieId = sessionStorage.getItem('movieId');
    const path = `/movie/${movieId}/reviews`
    const url = dinamicUrl(path)

    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            const movie = data.results
            movie.length = 4
            let output = `<h2>Reviews</h2>`
            for (let i in movie){
                output += `
                <h3>${movie[i].author}</h3>
                <p>${movie[i].content}</p>
                `
            }
            document.querySelector(".movie-reviews").innerHTML = output;
        })
}

function getSimilarMovies(){
    let movieId = sessionStorage.getItem('movieId');
    const path = `/movie/${movieId}/recommendations`
    const url = dinamicUrl(path)

    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            const movie = data.results
            movie.length = 5
            console.log(movie)
            let output = `<h2>Movies that you may like</h2>`
            for (let i in movie){
                output += `
                <h3>${movie[i].title}</h3>
                <img src = "${IMAGE_URL + movie[i].poster_path}" data-movie-id="${movie[i].id}"/>
                `
            }
            document.querySelector(".similar-movies").innerHTML = output;
        })
}

getDetails()
getUpcomingMovies()
getPopularMovies()
getTopRated()
getReviews()
getSimilarMovies()