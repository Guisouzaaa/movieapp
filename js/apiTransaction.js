// API
const API_KEY = '4a5e130486cb63a2caff652d783f6a36'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const url = 'https://api.themoviedb.org/3/search/movie?api_key=4a5e130486cb63a2caff652d783f6a36'

const dinamicUrl = path => {
    const url = `https://api.themoviedb.org/3${path}?api_key=4a5e130486cb63a2caff652d783f6a36`
    return url
}

const requestMovies = (url, onComplete, onError) => {
    fetch(url)
      .then((res) => res.json())
      .then(onComplete)
      .catch((onError))
}

const searchMovie = value => {
    const path = '/search/movie'
    const url =  `${dinamicUrl(path)}&query=${value}`

    requestMovies(url, renderFilteredMovie, handleError)
}

//renderMovies
const getUpcomingMovies = () => {
    const path = '/movie/upcoming'
    const url =  `${dinamicUrl(path)}&region=US`
    const render = renderUpcoming.bind({title: 'Upcoming Movies'})
    requestMovies(url, render, handleError)
}

const getPopularMovies = (value) => {
    const path = '/movie/popular'
    const url =  `${dinamicUrl(path)}&page=${value}`
    // console.log(url)

    requestMovies(url, renderPopular, handleError)
}


//get movie detail
const getMovieDetails = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}`
    const url = dinamicUrl(path);

    requestMovies(url, getDetails, handleError)
}


// Get movie trailer
const getMovieTrailer = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/videos`;
    const url = dinamicUrl(path);

    requestMovies(url, getTrailer, handleError)
}

//get movie Reviews
const getMovieReviews = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/reviews`;
    const url = dinamicUrl(path);

    requestMovies(url, getReviews, handleError)
}

//get recommendations
const getMovieRecommendations = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/recommendations`
    const url = dinamicUrl(path);

    const render = getSimilarMovies.bind({title: 'Similar Movies'})
    requestMovies(url, render, handleError)
}


//get genres
const getGenres = () => {
    const path = '/genre/movie/list'
    const url = dinamicUrl(path)

    requestMovies(url, selectGenres, handleError)
}

const filterMovie = (genre, options, value) => {
    const path = '/discover/movie'
    const url = `  ${dinamicUrl(path)}&sort_by=${options}&with_genres=${genre}&vote_count.gte=1000&page=${value}`
    // console.log(url)

    // const render = renderFilteredMovie.bind({title: 'Similar Movies'})
    requestMovies(url, renderFilteredMovie, handleError)
}


