function seriesData() {
    getTvShowDetails();
    getTvShowReviews();
    getSeriesRecommendations();
    getTvShowImages();
}

const seriesFilter = document.querySelector("#movies-filter");
const popularSeriesContainer = document.getElementById('popular-series')
const displayPopularSeries = document.getElementById('popular-series-container')

//Series Details
document.addEventListener('click', e => {
    if (e.target.id == "series-poster") {
        let movieId = e.target.getAttribute("data-series-id")
        seriesDetails(movieId)
    }
})

function renderPopularSeries(data) {
    const series = data.results;
    let output = ``
    for (let i in series) {
        if (series[i].poster_path) {
            output += `
          <div class="movie-item">
           <div class ="img-container">
              <img class="movie-poster series-poster" id="series-poster" src ="${IMAGE_URL + series[i].poster_path}" data-series-id="${series[i].id}"/>
           <div class="details-btn">
              <button>Details</button>
           </div>
           </div>
           <span class="movie-title">${series[i].name}</span>    
           <div class ="movie-rating">
              <i class="far fa-star"></i><p>${series[i].vote_average}</p>
           </div>
          </div>  
       `
            document.getElementById("popular-series").innerHTML = output;
        }
    }
}

//get series id
function seriesDetails(id) {
    sessionStorage.setItem("seriesId", id);
    window.location = "tv-show.html";
    return false;
}

function getSeriesImages(data) {
    const img = data.backdrops
    document.getElementById('movie-banner').style.backgroundImage = `url('${'https://image.tmdb.org/t/p/original' + img[0].file_path}')`
}

const getSeriesDetails = (data) => {
    const series = data;
    const genre = data.genres;
    const genreName = genre.map(e => `<span>${e.name}</span>`).join(", ")


    let output = `
          <div class = "poster-movie">
            <img src = "${IMAGE_URL + series.poster_path}"/>
            <div class="bgimg"></div>
          </div>
          <div class= "details-container">    
            <div class="movie-title">
                <span></span>
                <h1>${series.name}</h1>
            </div>
            <div class = "overview">
               <div class="title-section">
                  <span></span>
                  <h1>Movie overview</h1>
               </div>
            <p>${series.overview}</p>
          </div>
          <div class = "detail-info">
             <div class="title-section">
                <span></span>
                <h1>Movie Details</h1>
             </div>    
             <ul>
               <li><span class="contrast">Title:</span> ${series.name}</li>
               <li><span class="contrast">Release Date:</span> ${series.first_air_date}</li>
               <li><span class="contrast">Genre:</span> ${genreName}</li>
               <li><span class="contrast">Rating</span> ${series.vote_average}</li>
             </ul>    
          </div>
          
      `
    document.getElementById("series-detail").innerHTML = output;
};

//Series Reviews
function getSeriesReviews(data) {
    const series = data.results;
    let output = ``;
    if (series.length === 0) {
        document.querySelector(".reviews-section").style.display = "none"

    } else {
        for (let i in series) {
            if (series[i].content) {
                output += `
          <div>
              <h3>By: ${series[i].author}</h3>
              <p>${series[i].content}</p>
              <a href = "${series[i].url}">official review</a>
          </div>
          `;
                document.querySelector(".movie-reviews").innerHTML = output;
            }
        }
    }
}

//Similar series
function getSimilarSeries(data) {
    const series = data.results;
    let output = ``
    if (series.length === 0) {
        document.querySelector('.similar-section').style.display = "none"
    } else {
        for (let i in series) {
            if (series[i].poster_path) {
                output += `
            <div class ="swiper-slide">
               <img class="movie-poster series-poster" id="series-poster" src ="${IMAGE_URL + series[i].poster_path}" data-series-id="${series[i].id}"/> 
               <p>${series[i].name}</p>
            </div>
          `
                document.querySelector(".swiper-wrapper").innerHTML = output
            }
        }
    }
}

//Pagination of popular Series
function seriesPagination() {
    var value = 1
    document.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.id === 'next-series') {
            if (value < 1000) {
                value++
                getPopularSeries(value)
                popularSeriesContainer.innerHTML = ""
            }
        } else if (e.target.id === 'previous-series') {
            if (value !== 1) {
                value--
                getPopularSeries(value)
                popularSeriesContainer.innerHTML = ""
            }
        }
    })
}
