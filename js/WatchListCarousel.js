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

if (watchSlides.length === 1) {
  console.log(watchSlides);
    watchSlides.forEach((slide) => {
        slide.classList.remove('active', 'next', 'prev')
      })
      watchSlides[0].classList.add('active')
}

const goToNumWatch = (number) => {
  if (watchSlides.length === 2) {
    watchCurrent = number
    watchNext = watchCurrent === 0 ? 1 : 0

    watchSlides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev')
    })
    watchSlides[watchCurrent].classList.add('active')
    watchSlides[watchNext].classList.add('next')

  } else if (watchSlides.length > 2) {
    watchCurrent = number
    watchNext = watchCurrent < watchSlides.length - 1 ? watchCurrent + 1 : 0
    watchPrev = watchCurrent > 0 ? watchCurrent - 1 : watchSlides.length - 1
    
    watchSlides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev')
    })
    watchSlides[watchCurrent].classList.add('active')
    watchSlides[watchNext].classList.add('next')
    watchSlides[watchPrev].classList.add('prev')
  }
}

const goToNextWatch = () => {
  if (watchSlides.length === 2) {
    watchCurrent === 0 
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
    watchCurrent === 0 
      ? goToNumWatch(1) 
      : goToNumWatch(0)
  } else if (watchSlides.length >= 3) {
    watchCurrent > 0 
      ? goToNumWatch(watchCurrent - 1) 
      : goToNumWatch(watchSlides.length - 1)
  }
}
