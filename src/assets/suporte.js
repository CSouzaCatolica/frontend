function searchHelp () {
  const query = document.getElementById('searchInput').value
  if (query.trim()) {
    showToast(`Buscando por: "${query}"`)
  } else {
    showToast('Digite algo para buscar')
  }
}

function setSearch (term) {
  document.getElementById('searchInput').value = term
  searchHelp()
}

function showToast (message) {
  const toast = document.getElementById('toast')
  const toastMessage = document.getElementById('toastMessage')

  toastMessage.textContent = message
  toast.style.transform = 'translateX(0)'

  setTimeout(() => {
    toast.style.transform = 'translateX(400px)'
  }, 3000)
}

document
  .getElementById('searchInput')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchHelp()
    }
  })

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    target.scrollIntoView({ behavior: 'smooth' })
  })
})
