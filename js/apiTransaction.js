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

    requestMovies(url, renderSearchMovies, handleError)
}

//renderMovies
const getUpcomingMovies = () => {
    const path = '/movie/upcoming'
    const url =  dinamicUrl(path)

    const render = renderMovies.bind({title: 'Upcoming Movies'})
    requestMovies(url, render, handleError)
}

const getPopularMovies = () => {
    const path = '/movie/popular'
    const url =  dinamicUrl(path)

    const render = renderMovies.bind({title: 'Popular Movies'})
    requestMovies(url, render, handleError)
}

const getTopRated = () => {
    const path = '/movie/top_rated'
    const url =  dinamicUrl(path)

    const render = renderMovies.bind({title: 'Top Rated Movies'})
    requestMovies(url, render, handleError)
}



