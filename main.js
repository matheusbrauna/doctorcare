function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopArrow() {
  if (scrollY > 500) {
    backToTopArrow.classList.add('show')
  } else {
    backToTopArrow.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2

  // verificar se a seção passou da linha
  // quais dados vou precisar?
  const sectionTop = section.offsetTop
  const sectionHeight = section.offsetHeight
  const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

  // verificar se a base está abaixo da linha alvo

  const sectionEndsAt = sectionTop + sectionHeight
  const sectionEndPassedTargetline = sectionEndsAt <= targetLine

  // limites da seção
  const sectionBoundaries =
    sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

  const sectionId = section.getAttribute('id')
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

ScrollReveal({
  origin: 'top',
  distance: '40px',
  duration: 700,
  reset: true,
}).reveal(`
  #home,
  #home img,
  #home .stats,
  #services,
  #services header,
  #services .card,
  #about,
  #about header,
  #about .content,
  #contact header,
  #contact .content,
  footer .logo,
  footer  p,
  footer .socials`)

window.addEventListener('scroll', () => {
    showNavOnScroll()
    showBackToTopArrow()
    activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services)
    activateMenuAtCurrentSection(about)
    activateMenuAtCurrentSection(contact)
})

function changeColor() {
  const getRootSelector = document.querySelector(':root')
  getRootSelector.style.setProperty('--hue', Math.floor(Math.random() * 360))

  localStorage.setItem('hue', getRootSelector.style.getPropertyValue('--hue'))
}

onload = () => {
  const hue = localStorage.getItem('hue')
  if (hue) {
    document.querySelector(':root').style.setProperty('--hue', hue)
  } else {
    changeColor()
  }
}