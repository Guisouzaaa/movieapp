const searchButton = document.getElementById('search')
const inputElement = document.getElementById('searchInput')
const movieSearch = document.getElementById('movies-search')
const moviesContainer = document.getElementById('movie-container')


//movie items
const movieSection = movie => {
    const section = document.createElement('section')
    section.classList = 'section'

    movie.map((movie) =>{
      if(movie.poster_path){
          const img = document.createElement('img')
          img.src = IMAGE_URL + movie.poster_path
          img.setAttribute('data-movie-id', movie.id)

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

const createIframe = video => {
    const iframe = document.createElement('iframe')
    iframe.src= `https://www.youtube.com/embed/${video.key}`
    iframe.width = 350
    iframe.height = 315
    iframe.allowFullscreen = true

    return iframe
}

//iframe logic
const videoTemplate = (data, content) => {
    console.log(data)
    content.innerHTML = '<p id = "content-close>X</p>'
    const videos = data.results
    const length = videos.length > 4 ? 4 : videos.length
    const iframeContainer = document.createElement('div')

    for (let i = 0; i < videos.length; i++){
        const video = videos[i]
        const iframe = createIframe(video)
        iframeContainer.appendChild(iframe)
        content.appendChild(iframeContainer)
    }

}

//display trailer
document.onclick = e =>{
    const target = e.target

    if (target.tagName.toLowerCase() === 'img'){
        const movieId = target.dataset.movieId
        console.log(movieId)
        const section = e.target.parentElement
        const content = section.nextElementSibling
        content.classList.add('content-display')

        const path = `/movie/${movieId}/videos`
        const url = dinamicUrl(path)
        //fetch videos
        fetch(url)
           .then((res) => res.json())
           .then((data) => videoTemplate(data, content))
           .catch((error) => {
              console.log(error)
           })
    }

    if (target.id === 'content-close'){
        const content = target.parentElement
        content.classList.remove('content-display')
    }
}

getUpcomingMovies()
getPopularMovies()
getTopRated()