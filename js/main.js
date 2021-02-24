// Global Variables
const open = 'open'
const active = 'active'
const modalOpen = '[data-open]'
const modalClose = '[data-close]'
const isVisible = 'is-visible'
const dataFilter = '[data-filter]'
const apiData = '[data-item]'
const movieDisplayGrid = document.querySelector('.api-grid')
const root = document.documentElement
// Movie APIs
const filterLink = document.querySelectorAll(dataFilter)
const apiItems = document.querySelectorAll(apiData)
const searchBox = document.querySelector('#search')
let movieArr = []
let totalCount = 0
let starWarsCount = 0
let avengersCount = 0
let disneyCount = 0
// Modal
const openModal = document.querySelectorAll(modalOpen)
const closeModal = document.querySelectorAll(modalClose)
const modalPopup = document.createElement('div')
// Create Movie Cards
const starWarsURL = 'http://www.omdbapi.com/?s=star_wars&Page=1&apikey=263d22d8'
const avengersURL = 'http://www.omdbapi.com/?s=avengers&Page=1&apikey=263d22d8'
const disneyURL = 'http://www.omdbapi.com/?s=disney&Page=3&apikey=263d22d8'
const movieURLs = [starWarsURL, avengersURL, disneyURL]
const filterURLs = async () => {
  for (const url of movieURLs) {
    const res = await fetch(url)
    const resJson = await res.json()
    const resArr = resJson.Search
    movieArr.push(...resArr)
  }
}
filterURLs()
const createCards = () => {
  const movieCards = movieArr
    .map(
      ({ Title, Year, Poster, imdbID }) => {
        return (`
          <div class="api-card" data-open="${imdbID}">
            <div class="card-body">
              <img src=${Poster} alt="movie poster">
              <div class="card-popup-box">
                <div>${Year}</div>
                <h3>${Title}</h3>
              </div>
            </div>
          </div>
        `) 
      }
    ).join('')
  movieDisplayGrid.innerHTML = movieCards 
}
setTimeout(function() {
  createCards()
}, 1000)
console.log(movieArr);

// Count Type of Movie
movieArr.map(({ Title }) => {
  if (Title.toLowerCase().includes('star')) {
    console.log(Title);
  }
})

// Create Movie Modal Popup
const createMovieCard = () => {
  const movieCard = movieArr
    .map(
      ({ Title, Year, Poster, imdbID }) => {
        return (`
        <div id=${imdbID} class="modal" data-animation="zoomInOut">
          <div class="container-fluid">
            <header class="movie-modal-header">
              <i class="fas fa-times" data-close></i> 
            </header>
            <div class="modal-content">
              <div class="modal-text">  
                <h3>${Title}</h3>
                <h4>add to Favorites <i class="fas fa-plus" data-add></i></h4> 
                <h4>add to Watch Later <i class="fas fa-plus" data-add></i></h4> 
              </div>
              <img src=${Poster} alt="${Title} Poster" />
            </div>
          </div>
        </div>
        `) 
      }
    )
    modalPopup.innerHTML = movieCard
}

// Modal/Full Site Modal 'open buttons'
setTimeout(function() {
  for (const elm of document.querySelectorAll('[data-open]')) {
    elm.addEventListener('click', () => {
      createMovieCard()
      const modalId = elm.dataset.open
      for (const i of modalPopup.children) {
        if (i.id === modalId) {
          document.body.appendChild(i)
        }
      }
      setTimeout(function() {
        document.getElementById(modalId).classList.add(isVisible)
      }, 100)
    })
  }
}, 1500)

// Full Site Modal 'close buttons'
document.body.addEventListener('click', function() {
  for (const elm of document.querySelectorAll('[data-close]')) {
    elm.addEventListener('click', function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible)
    })
  }
})

// Modals 
const removeElem = (elm) => {
  setTimeout(function() {
    if (elm.classList.contains('modal')) {
      elm.remove()
    }
  }, 1000)
}

document.body.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    const elm = document.querySelector('.modal.is-visible')
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
    removeElem(elm)
  }
})

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    const elm = document.querySelector('.modal.is-visible')
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
    removeElem(elm)
  }
})
