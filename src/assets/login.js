// toast
function toast(mensagem, tipo = 'info', duracao = 3000) {
    const existingToasts = document.querySelectorAll('.toast')
    if (existingToasts.length > 3) {
        existingToasts[0].remove()
    }

    const toastElement = document.createElement('div')
    toastElement.classList.add('toast', `toast-${tipo}`)

    const icons = {
        success: `<i class="fa-solid fa-circle-check toast-icon"></i>`,
        error: `<i class="fa-solid fa-circle-xmark toast-icon"></i>`,
        warning: `<i class="fa-solid fa-triangle-exclamation toast-icon"></i>`,
        info: `<i class="fa-solid fa-circle-question toast-icon"></i>`
    }

    toastElement.innerHTML = `
      <div class="toast-content">
        ${icons[tipo] || icons.info}
        <span class="toast-message">${mensagem}</span>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `

    const toastContainer =
        document.querySelector('.toast-container') || createToastContainer()
    toastContainer.appendChild(toastElement)

    setTimeout(() => toastElement.classList.add('toast-show'), 10)

    setTimeout(() => {
        toastElement.classList.add('toast-hide')
        setTimeout(() => toastElement.remove(), 850)
    }, duracao)

    return toastElement
}

function createToastContainer() {
    const container = document.createElement('div')
    container.className = 'toast-container'
    document.body.appendChild(container)
    return container
}
//

const loginForm = document.getElementById('loginForm')
const loginButton = document.getElementById('loginBtn')

loginButton.addEventListener('click', (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email === 'admin@admin.com' && password === 'admin') {
        window.location.href = './pages/home.html'
    } else {
        toast('Credenciais inválidas', 'error')
        toast('usr: admin@admin.com, pass: admin', 'warning', 5000)
    }
})