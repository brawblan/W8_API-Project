const open = 'open'
const active = 'active'
const modalOpen = '[data-open]'
const modalClose = '[data-close]'
const isVisible = 'is-visible'
const dataFilter = '[data-filter]'
const apiData = '[data-item]'
const movieDisplayGrid = document.querySelector('.api-grid')
const addFavList = document.querySelector('.fa-plus.fav')
const listToggle = document.querySelector('.show-list')
const mobileListToggle = document.querySelector('.close-list')
const listContainer = document.querySelector('.check-out')
let favorites = []

// Filter Names with Count
const allCount = document.getElementById('all')
const starCount = document.getElementById('starWars')
const avengersCount = document.getElementById('avengers')
const disneyCount = document.getElementById('disney')
const favCount = document.getElementById('boomer')
let star = [] 
let avengers = [] 
let disney = []
const starWarsListCount = document.getElementById('starWarsList')
const avengersListCount = document.getElementById('avengersList')
const disneyListCount = document.getElementById('disneyList')

// Movie APIs
const filterLink = document.querySelectorAll(dataFilter)
const apiItems = document.querySelectorAll(apiData)
const searchBox = document.querySelector('#search')
let movieArr = []

// List 
const listContent = document.querySelector('.list-content')

// Modal
const openModal = document.querySelectorAll(modalOpen)
const closeModal = document.querySelectorAll(modalClose)
const modalPopup = document.createElement('div')

// Create Movie Cards
const starWarsURL = 'https://www.omdbapi.com/?s=star_wars&Page=1&apikey=91651c1a'
const avengersURL = 'https://www.omdbapi.com/?s=avengers&Page=1&apikey=91651c1a'
const disneyURL = 'https://www.omdbapi.com/?s=disney&Page=3&apikey=91651c1a'
const movieURLs = [starWarsURL, avengersURL, disneyURL]

// call API
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
  starWarsListCount.innerText = `Star Wars (${10 - star.length})`
  avengersListCount.innerText = `Avengers (${10 - avengers.length})`
  disneyListCount.innerText = `Disney (${10 - disney.length})`
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
        </div>
      </div>
    </div>
  `) 
  modalPopup.innerHTML = movieCard
}

// Open List
listToggle.addEventListener('click', () => {
  if (listContainer.classList.contains('list-active')) {
    listContainer.classList.remove('list-active')
  } else {
    listContainer.classList.add('list-active')
  }
})
mobileListToggle.addEventListener('click', () => {
  if (listContainer.classList.contains('list-active')) {
    listContainer.classList.remove('list-active')
  } else {
    listContainer.classList.add('list-active')
  }
})

// Add movie to list
const addMovieToList = (array, htmlLocation) => {
  const card = array
  .map(
    ({ Title }) => {
      return (`
      <div class="list-card">
        <h3>${Title}</h3>
        <div class="remove-title card-btn-style" onclick="removeMovie()">Remove Title <i class="fas fa-times" data-close></i></div>
      </div>
      `) 
    }
  ).join('')
  htmlLocation.innerHTML = card
}

// Add to favorites, add back to main list 
document.body.addEventListener('click', function(e) {
  if (e.target.querySelector('.fa-plus.fav')) {
    removeMovieFromMovieArr(e, true)
  }
})

// remove from movieArr
const removeMovieFromMovieArr = (e) => {
  for (const movie of movieArr) {
    if (movie.Title === e.target.parentElement.children[0].innerText) {
      movieArr.splice(movieArr.indexOf(movie), 1)
      favorites.push(movie)
      createCards(movieArr)
      addMovieToList(favorites, listContent)
      removeFavOrWatchFromDisplay(e)
      if (filter) {
        filterCards(filter)
      }
    }
  }
}

// remove from list
const removeMovie = () => {
  if (favorites.length) {
    const removeBtn = document.querySelectorAll('.remove-title')
    for (const i of removeBtn)
    i.parentElement.addEventListener('click', (e) => {
      removeMovieFromListArr(e)
    })
  }
}
const removeMovieFromListArr = (e) => {
  for (const movie of favorites) {
    if (e.target.parentElement.children[0].innerText === movie.Title) {
      favorites.splice(favorites.indexOf(movie), 1)
      movieArr.push(movie)
      createCards(movieArr)
      addMovieToList(favorites, listContent)
    }
  }
}

//  remove modal from display
const removeFavOrWatchFromDisplay = (e) => {
  if (e.target.parentElement.parentElement.parentElement === document.querySelector('.modal.is-visible')) {
    document.querySelector('.modal.is-visible').classList.remove(isVisible)
  }
}

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