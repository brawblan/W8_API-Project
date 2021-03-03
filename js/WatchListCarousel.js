let watchCurrent = 0
let watchNext
let watchPrev
let watchSlides = []
let watchButtons = []

document.getElementById('millennial').addEventListener('click', function() {
  watchSlides = document.querySelectorAll('.list-card')
  watchButtons = document.querySelectorAll('.slide-ctrl-container button')
  
  for (let i = 0; i < watchButtons.length; i++) {
    watchButtons[i].addEventListener('click', () => i === 0 ? goToPrevWatch() : goToNextWatch())
  }
})

const goToNumWatch = (number) => {
  watchCurrent = number
  watchNext = watchCurrent < watchSlides.length - 1 ? watchCurrent + 1 : 0
  watchPrev = watchCurrent > 0 ? watchCurrent - 1 : watchSlides.length - 1

  if (watchSlides.length === 1) {
    // watchSlides.forEach((slide) => {
    //   slide.classList.remove('active')
    // })
    // watchSlides[watchCurrent].classList.add('active')
  } else if (watchSlides.length >= 2) {
    watchSlides.forEach((slide) => {
      slide.classList.remove('active', 'next')
    })
    watchSlides[watchCurrent].classList.add('active')
    watchSlides[watchNext].classList.add('next')
  }
}

const goToNextWatch = () => {
  if (watchSlides.length === 2) {
    watchCurrent < watchSlides.length - 1 
      ? goToNumWatch(1)
      : goToNumWatch(0)
  } else if (watchSlides.length >= 3) {
    watchCurrent < watchSlides.length - 1 
      ? goToNumWatch(watchCurrent + 1) 
      : goToNumWatch(0)
  } 
}
const goToPrevWatch = () => {
  if (watchSlides.length === 2) {
    watchCurrent > 0 
      ? goToNumWatch(1) 
      : goToNumWatch(0)
  } else if (watchSlides.length >= 3) {
    watchCurrent > 0 
      ? goToNumWatch(watchCurrent - 1) 
      : goToNumWatch(watchSlides.length - 1)
  }
}
