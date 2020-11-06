// API
const API_KEY = '4a5e130486cb63a2caff652d783f6a36'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'
const region = 'pt-BR'
//const language = '&language=pt-BR'
const language = ''

const url = `https://api.themoviedb.org/3/search/movie?api_key=4a5e130486cb63a2caff652d783f6a36${language}`

const dynamicUrl = path => {
    const url = `https://api.themoviedb.org/3${path}?api_key=4a5e130486cb63a2caff652d783f6a36${language}`
    return url
}

const requestMovies = (url, onComplete, onError) => {
    fetch(url)
      .then((res) => res.json())
      .then(onComplete)
      .catch((onError))
}

const searchMovie = value => {
    const path = '/search/multi'
    const url =  `${dynamicUrl(path)}&query=${value}`

    requestMovies(url, renderFilteredMovie, handleError)
}

//renderMovies
const getUpcomingMovies = () => {
    const path = '/movie/upcoming'
    const url =  `${dynamicUrl(path)}&region=US`
    const render = renderUpcoming.bind({title: 'Upcoming Movies'})
    requestMovies(url, render, handleError)
}

//render trending content
const getTrending = () => {
    const path = '/trending/all/day'
    const url =  `${dynamicUrl(path)}&region=US`
    const render = renderTrending.bind({title: 'Trending'})
    requestMovies(url, render, handleError)
}

const getPopularMovies = (value) => {
    const path = '/movie/popular'
    const url =  `${dynamicUrl(path)}&page=${value}&region=US`

    requestMovies(url, renderPopular, handleError)
}

const getPopularSeries = (value) => {
    const path = '/tv/popular'
    const url =  `${dynamicUrl(path)}&page=${value}&region=US`

    requestMovies(url, renderPopularSeries, handleError)
}


//get movie detail
const getMovieDetails = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}`
    const url = dynamicUrl(path);

    requestMovies(url, getDetails, handleError)
}

//get tv show details
const getTvShowDetails = () => {
    let seriesId = sessionStorage.getItem("seriesId");
    const path = `/tv/${seriesId}`
    const url = dynamicUrl(path);

    requestMovies(url, getSeriesDetails, handleError)
}

// Get movie trailer
const getMovieTrailer = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/videos`;
    const url = dynamicUrl(path);

    requestMovies(url, getTrailer, handleError)
}

//get movie Reviews
const getMovieReviews = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/reviews`;
    const url = dynamicUrl(path);

    requestMovies(url, getReviews, handleError)
}

//get tv show Reviews
const getTvShowReviews = () => {
    let seriesId = sessionStorage.getItem("seriesId");
    const path = `/tv/${seriesId}/reviews`;
    const url = dynamicUrl(path);

    requestMovies(url, getSeriesReviews, handleError)
}

//get recommendations
const getMovieRecommendations = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/recommendations`
    const url = dynamicUrl(path);

    const render = getSimilarMovies.bind({title: 'Similar Movies'})
    requestMovies(url, render, handleError)
}

//get recommendations
const getSeriesRecommendations = () => {
    let seriesId = sessionStorage.getItem("seriesId");
    const path = `/tv/${seriesId}/recommendations`
    const url = dynamicUrl(path);

    const render = getSimilarSeries.bind({title: 'Similar Series'})
    requestMovies(url, render, handleError)
}


//get genres
const getGenres = () => {
    const path = '/genre/movie/list'
    const url = dynamicUrl(path)

    requestMovies(url, selectGenres, handleError)
}

const filterMovie = (genre, options, value) => {
    const path = '/discover/movie'
    const url = `  ${dynamicUrl(path)}&sort_by=${options}&with_genres=${genre}&vote_count.gte=100&page=${value}`

    requestMovies(url, renderFilteredMovie, handleError)
}

//get movie detail
const getMovieImages = () => {
    let movieId = sessionStorage.getItem("movieId");
    const path = `/movie/${movieId}/images`
    const url = dynamicUrl(path);

    requestMovies(url, getImages, handleError)
}

//get tv show images
const getTvShowImages = () => {
    let seriesId = sessionStorage.getItem("seriesId");
    const path = `/tv/${seriesId}/images`
    const url = dynamicUrl(path);

    requestMovies(url, getSeriesImages, handleError)
}