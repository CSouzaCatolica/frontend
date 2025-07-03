document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.security-card')
  cards.forEach(card => {
    card.classList.add('fade-in')
  })

  const statNumbers = document.querySelectorAll('.stat-number')
  statNumbers.forEach(stat => {
    const finalNumber = stat.textContent
    stat.textContent = '0'

    setTimeout(() => {
      animateNumber(stat, finalNumber)
    }, 500)
  })
})

function animateNumber (element, finalValue) {
  if (finalValue.includes('M+')) {
    let current = 0
    const target = parseInt(finalValue.replace('M+', ''))
    const increment = target / 50

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = finalValue
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + 'M+'
      }
    }, 50)
  } else if (finalValue.includes('%')) {
    let current = 0
    const target = parseFloat(finalValue.replace('%', ''))
    const increment = target / 50

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = finalValue
        clearInterval(timer)
      } else {
        element.textContent = current.toFixed(1) + '%'
      }
    }, 50)
  } else {
    element.textContent = finalValue
  }
}

document.querySelectorAll('.security-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-8px) scale(1.02)'
  })

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(-8px)'
  })
})
