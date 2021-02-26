// Global Variables
const open = 'open'
const active = 'active'
const modalOpen = '[data-open]'
const modalClose = '[data-close]'
const isVisible = 'is-visible'
const dataFilter = '[data-filter]'
const apiData = '[data-item]'
const movieDisplayGrid = document.querySelector('.api-grid')
const displayFavorites = document.querySelector('.favs-modal-body')
const root = document.documentElement
let favorites = []
let watchLater = []

// Filter Names with Count
const allCount = document.getElementById('all')
const starCount = document.getElementById('starWars')
const avengersCount = document.getElementById('avengers')
const disneyCount = document.getElementById('disney')
let star = 0 
let avengers = 0 
let disney = 0 

// Movie APIs
const filterLink = document.querySelectorAll(dataFilter)
const apiItems = document.querySelectorAll(apiData)
const searchBox = document.querySelector('#search')
let movieArr = []

// Modal
const openModal = document.querySelectorAll(modalOpen)
const closeModal = document.querySelectorAll(modalClose)
const modalPopup = document.createElement('div')

// Create Movie Cards
// 91651c1a personal api_key
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
const createCards = (movieArr) => {
  const movieCards = movieArr
    .map(
      ({ Title, Year, Poster, imdbID }) => {
        return (`
          <div class="api-card" data-open="${imdbID}" data-item="${Title}">
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
  createCards(movieArr)
}, 500)

// Count Type of Movie
setTimeout(function() {
  movieArr.map((movie) => {
    if (movie.Title.toLowerCase().includes('star')) {
      star++
    }  else if (movie.Title.toLowerCase().includes('avengers')) {
      avengers++
    } else if (movie.Title.toLowerCase().includes('disney')) {
      disney++
    }
  })
  let totalCount = star + avengers + disney
  allCount.innerText = `All (${totalCount})`
  starCount.innerText = `Star Wars (${star})`
  avengersCount.innerText = `Avengers (${avengers})`
  disneyCount.innerText = `Disney (${disney})`
}, 1000)

// Link Filter
const setFilterActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active)
  }
  elm.classList.add(active)
}
for (const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(link, '.filter-link')
    const filter = link.dataset.filter
    document.querySelectorAll('[data-item]').forEach((card) => {
      const cardData = card.dataset.item.toLowerCase()
      if (filter === 'alpha') {
        movieArr.sort((a, b) => (a.Title > b.Title) ? 1 : -1)    
        createCards()
      } else if (filter === 'back-alpha') {
        movieArr.sort((a, b) => (a.Title < b.Title) ? 1 : -1)    
        createCards()
      } else if (filter === 'all') {
        card.style.display = 'block'
      } else if (cardData.includes(filter)) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    })
  })
}

// Create Movie Modal Popup
const createMovieCard = (Poster, imdbID, Title) => {
  const movieCard = (`
    <div id=${imdbID} class="modal" data-animation="zoomInOut">
      <div class="movie-modal" style="background-image: url(${Poster})">
        <header class="movie-modal-header">
          <i class="fas fa-times" data-close></i> 
        </header>
        <div class="modal-content">
          <h3>${Title}</h3>
          <h4>add to Favorites <i class="fas fa-plus fav" data-add></i></h4> 
          <h4>add to Watch Later <i class="fas fa-plus watch" data-add></i></h4> 
        </div>
      </div>
    </div>
  `) 
  modalPopup.innerHTML = movieCard
}

const addMovieToFav = (favorites) => {
  const movieCards = favorites
  .map(
    ({ Title, Year, Poster, imdbID }) => {
      return (`
        <div class="api-card" data-open="${imdbID}" data-item="${Title}">
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
  displayFavorites.innerHTML = movieCards
}

// Full Site Modal open (favs and watch later)
setTimeout(function() {
  for (const elm of document.querySelectorAll('[data-open]')) {
    elm.addEventListener('click', () => {
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
}, 1000)

// Movie Poster Popup Modal open
setTimeout(function() {
  for (const elm of document.querySelectorAll('[data-open]')) {
    elm.addEventListener('click', () => {
      const poster = elm.lastElementChild.childNodes[1]['src']
      const imdbID = elm.dataset.open
      const title = elm.dataset.item
      createMovieCard(poster, imdbID, title)

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
}, 1000)

// Full Site Modal 'close buttons'
document.body.addEventListener('click', function() {
  for (const elm of document.querySelectorAll('[data-close]')) {
    elm.addEventListener('click', function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible)
    })
  }
})

// Remove Modals 
const removeElem = (elm) => {
  setTimeout(function() {
    if (elm.classList.contains('modal.movie-modal')) {
      elm.remove()
    }
  }, 1000)
}
document.body.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    const elm = document.querySelector('.modal')
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

// Add to favorites 
document.addEventListener('click', function(e) {
  if (e.target.querySelector('.fa-plus.fav')) {
    for (const movie of movieArr) {
      if (movie.Title === e.target.parentElement.children[0].innerText) {
        console.log(movieArr.indexOf(movie));
        movieArr.splice(movieArr.indexOf(movie), 1)
        favorites.push(movie)
        createCards(movieArr)
        addMovieToFav(favorites)
      }
    }
  }
})