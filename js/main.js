// Global Variables
const open = 'open'
const active = 'active'
const modalOpen = '[data-open]'
const modalClose = '[data-close]'
const isVisible = 'is-visible'
const dataFilter = '[data-filter]'
const apiData = '[data-item]'
const movieDisplayGrid = document.querySelector('.api-grid')
const displayFavs = document.querySelector('.favs-modal-body')
const displayWatch = document.querySelector('.watch-modal-body')
let favorites = []
let watchLater = []
const addFavList = document.querySelector('.fa-plus.fav')
const addWatchList = document.querySelector('.fa-plus.watch')

// Filter Names with Count
const allCount = document.getElementById('all')
const starCount = document.getElementById('starWars')
const avengersCount = document.getElementById('avengers')
const disneyCount = document.getElementById('disney')
const favCount = document.getElementById('boomer')
const watchCount = document.getElementById('millennial')
let star = [] 
let avengers = [] 
let disney = [] 

// Movie APIs
const filterLink = document.querySelectorAll(dataFilter)
const apiItems = document.querySelectorAll(apiData)
const searchBox = document.querySelector('#search')
let movieArr = []

// Modal
const openModal = document.querySelectorAll(modalOpen)
const closeModal = document.querySelectorAll(modalClose)
const modalPopup = document.createElement('div')
const removeMovieFromList = document.querySelectorAll('.remove-card')

// Create Movie Cards
const starWarsURL = 'https://www.omdbapi.com/?s=star_wars&Page=1&apikey=91651c1a'
const avengersURL = 'https://www.omdbapi.com/?s=avengers&Page=1&apikey=91651c1a'
const disneyURL = 'https://www.omdbapi.com/?s=disney&Page=3&apikey=91651c1a'
const movieURLs = [starWarsURL, avengersURL, disneyURL]

// Functions //////////////////////////////////////////////////
const filterURLs = async () => {
  for (const url of movieURLs) {
    const res = await fetch(url)
    const resJson = await res.json()
    const resArr = resJson.Search
    movieArr.push(...resArr)
    createCards(movieArr)
  }
}
filterURLs()

// Count Type of Movie
const countMovies = () => {
  star = []
  avengers = []
  disney = []
  movieArr.map((movie) => {
    if (movie.Title.toLowerCase().includes('star')) {
      star.push(movie)
    }  else if (movie.Title.toLowerCase().includes('avengers')) {
      avengers.push(movie)
    } else if (movie.Title.toLowerCase().includes('disney')) {
      disney.push(movie)
    }
  })
  let totalCount = [...star, ...avengers, ...disney]
  allCount.innerText = `All (${totalCount.length})`
  starCount.innerText = `Star Wars (${star.length})`
  avengersCount.innerText = `Avengers (${avengers.length})`
  disneyCount.innerText = `Disney (${disney.length})`
}

// Count amount in lists
const countList = () => {
  favCount.innerText = `favorites (${favorites.length})`
  watchCount.innerText = `watch later (${watchLater.length})`
}

// Creates cards AND counts movies
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
  countMovies()
  countList()
}

// Link Filter
const setFilterActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active)
  }
  elm.classList.add(active)
}

// Uses setFilterActive to set Filters AND filters through the movieArr to leave just the movies of the selected filter type
let filter
for (const link of filterLink) {
  link.addEventListener('click', function() {
    setFilterActive(link, '.filter-link')
    filter = link.dataset.filter    
    filterCards(filter)
  })
}
const filterCards = (filter) => {
  if (filter === 'alpha') {
    movieArr.sort((a, b) => (a.Title > b.Title) ? 1 : -1)    
    createCards(movieArr)
  } else if (filter === 'back-alpha') {
    movieArr.sort((a, b) => (a.Title < b.Title) ? 1 : -1)    
    createCards(movieArr)
  } else {
    document.querySelectorAll('[data-item]').forEach((card) => {
      const cardData = card.dataset.item.toLowerCase()
      if (filter === 'all') {
        card.style.display = 'block'
      } else if (cardData.includes(filter)) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    })
  }
}

// Create Movie Modal Popup
const createModalCard = (Poster, imdbID, Title) => {
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

// Add classes to first 3 cards added
const addClasses = (arr, display) => {
  if (arr.length === 1) {
    display.childNodes[1].classList.add('active')
  } else if (arr.length === 2) {
    display.childNodes[1].classList.add('active')
    display.childNodes[3].classList.add('next')
  } else if (arr.length >= 3) {
    display.childNodes[1].classList.add('active')
    display.childNodes[3].classList.add('next')
    display.childNodes[5].classList.add('prev')
  }
}

// Add movie to list
const addMovieToList = (array, htmlLocation) => {
  const card = array
  .map(
    ({ Title, Year, Poster, imdbID }) => {
      return (`
        <div class="list-card" data-open="${imdbID}" data-item="${Title}">
          <div class="card-body">
            <img src=${Poster} alt="movie poster">
            <div class="card-popup-box">
              <div>${Year}</div>
              <h3>${Title}</h3>
            </div>
          </div>
          <div id="remove" class="remove-card">Remove Card <i class="fas fa-times" data-close></i></div>
        </div>
      `) 
    }
  ).join('')
  htmlLocation.innerHTML = card

  // Give classes to first 3 cards added
  addClasses(array, htmlLocation)
}

const removeButton = document.getElementById('remove')

// Add to favorites/watchLater, add back to main list 
document.body.addEventListener('click', function(e) {
  if (e.target.querySelector('.fa-plus.fav')) {
    removeMovieFromMovieArr(e, true)
  } else if (e.target.querySelector('.fa-plus.watch')) {
    removeMovieFromMovieArr(e, false)
  } else if (e.target.querySelector('.remove-card')) {
    if (e.target.children[1].classList.contains('favs-modal-body')) {
      if (e.target.children[1].children[0].classList.contains('active')) {
        removeMovieFromListArr(e, true)
      } 
    } else if (e.target.children[1].classList.contains('watch-modal-body')) {
      if (e.target.children[1].children[0].classList.contains('active')) {
        removeMovieFromListArr(e, false)
      }
    }
  }
})

// remove from movieArr
const removeMovieFromMovieArr = (e, boolean) => {
  for (const movie of movieArr) {
    if (movie.Title === e.target.parentElement.children[0].innerText) {
      movieArr.splice(movieArr.indexOf(movie), 1)
      boolean ? favorites.push(movie) : watchLater.push(movie)
      createCards(movieArr)
      boolean ? addMovieToList(favorites, displayFavs) : addMovieToList(watchLater, displayWatch)
      removeFavOrWatchFromDisplay(e)
      if (filter) {
        filterCards(filter)
      }
    }
  }
}

// remove from favoriteArr or watchArr
const removeMovieFromListArr = (e, boolean) => {
  for (const movie of boolean ? favorites : watchLater) {
    const nodes = e.target.children[1].children
    // console.log(nodes);
    for(const i of nodes) {
      if (i.classList.contains('active')) {
        boolean ? favorites.splice(favorites.indexOf(movie), 1) : watchLater.splice(watchLater.indexOf(movie), 1)
        movieArr.push(movie)
        removeFavOrWatchFromDisplay(e)
        removeElem(e.target.children[1].children[0])
        createCards(movieArr)
      }
    }
  }
}

//  remove from display
const removeFavOrWatchFromDisplay = (e) => {
  if (e.target.parentElement.parentElement.parentElement === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
    document.addEventListener('click', function(e) {
      const elm = document.getElementById(e.target.parentElement.parentElement.parentElement.id)
      if (elm) {
        removeElem(elm)
      }
    })
  }
}

// Full Site Modal open (favs and watch later)
document.body.addEventListener('click', function() {
  for (const elm of document.querySelectorAll('[data-modal]')) {
    elm.addEventListener('click', () => {
      const modalId = elm.dataset.modal
      for (const i of modalPopup.children) {
        if (i.id === modalId) {
          console.log(i);
          document.body.appendChild(i)
        }
      }
      setTimeout(function() {
        document.getElementById(modalId).classList.add(isVisible)
        const elm = document.getElementById('all')
        filter = 'all'
        setFilterActive(elm, '.filter-link')
        filterCards(filter)
      }, 100)
    })
  }
})

// Movie Poster Popup Modal open
document.body.addEventListener('click', function() {
    for (const elm of document.querySelectorAll('[data-open]')) {
      elm.addEventListener('click', () => {
        let poster
        if (elm.lastElementChild) {
          poster = elm.lastElementChild.childNodes[1]['src']
        }
        const imdbID = elm.dataset.open
        const title = elm.dataset.item
        createModalCard(poster, imdbID, title)
  
        const modalId = elm.dataset.open
        for (const i of modalPopup.children) {
          if (i.id === modalId) {
            document.body.appendChild(i)
          }
        }
        // this timeout allows the element to be added animation attach
        setTimeout(function() {
          document.getElementById(modalId).classList.add(isVisible)
        }, 100)
      })
    }
})

// Full Site Modal 'close buttons'
document.body.addEventListener('click', function() {
  for (const elm of document.querySelectorAll('[data-close]')) {
    elm.addEventListener('click', function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible)
    })
  }
})

// Remove Modals w/click
document.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.modal.is-visible')) {
    const elm = document.querySelector('.modal.is-visible')
    elm.classList.remove(isVisible)
    removeElem(elm)
  } else if (e.target.parentElement === document.querySelector('.movie-modal-header')) {
    const elm = document.querySelector('.movie-modal-header')
    removeElem(elm)
  }
})

// Remove Modals w/ESC
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    const elm = document.querySelector('.modal.is-visible')
    elm.classList.remove(isVisible)
    removeElem(elm)
  }
})

// Remove Modals from DOM
const removeElem = (elm) => {
  if (elm.classList.contains('active')) {
    elm.remove()
  } else if (elm.parentElement.classList.contains('movie-modal')) {
    elm.remove()
  } else if (elm.parentElement.classList.contains('modal')) {
    elm.remove()
  }
}