document.getElementById('favorites').addEventListener('click', function() {
  const slides = document.querySelectorAll('.list-card')
  const buttons = document.querySelectorAll('.slide-ctrl-container button')
  
  let current = 0
  let next
  let prev

  const goToNum = (number) => {
    current = number
    next = current < slides.length - 1 ? current + 1 : 0
    prev = current > 0 ? current - 1 : slides.length - 1

    console.log(slides);

    slides.forEach((slide) => {
      slide.classList.remove('active', 'next', 'prev')
    })
    slides[current].classList.add('active')
    slides[prev].classList.add('prev')
    slides[next].classList.add('next')

    console.log(current, prev, next);
  }

  const goToNext = () => current < slides.length - 1 ? goToNum(current + 1) : goToNum(0)
  const goToPrev = () => current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1)
  
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext())
  }
  
})
