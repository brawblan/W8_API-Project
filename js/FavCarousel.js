let current = 0
let next
let prev
let slides = []
let buttons = []

const setFavListPage = () => {
  slides = document.querySelectorAll('.list-card')
  buttons = document.querySelectorAll('.slide-ctrl-container button')
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext())
  }
}

document.getElementById('boomer').addEventListener('click', setFavListPage)


const goToNum = (number) => {
  if (slides.length === 2) {
    current = number
    next = current === 0 ? 1 : 0

    slides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev')
    })
    slides[current].classList.add('active')
    slides[next].classList.add('next')

  } else if (slides.length >= 3) {
    current = number
    next = current < slides.length - 1 ? current + 1 : 0
    prev = current > 0 ? current - 1 : slides.length - 1
    
    slides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev')
    })
    slides[current].classList.add('active')
    slides[next].classList.add('next')
    slides[prev].classList.add('prev')
  }
}

const goToNext = () => {
  if (slides.length === 2) {
    current === 0 
    ? goToNum(1)
    : goToNum(0)
  } else if (slides.length >= 3) {
    current < slides.length - 1 
    ? goToNum(current + 1) 
    : goToNum(0)
  } 
}

const goToPrev = () => {
  if (slides.length === 2) {
    current === 0 
    ? goToNum(1) 
    : goToNum(0)
  } else if (slides.length >= 3) {
    current > 0 
      ? goToNum(current - 1) 
      : goToNum(slides.length - 1)
    }
  }
