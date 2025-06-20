// boa noite professor, apenas gostaria de lembra-lo
// ################################################################################
//                          O    J O G O
// ################################################################################
const BANCO_VEICULOS = [
  {
    id: 'porsche_911',
    nome: 'PORSCHE 911',
    descricao: '3.0 24V H6 GASOLINA CARRERA S CABRIOLET PDK',
    preco: 999000,
    imagem: '../src/assets/img/porsche_frente.png',
    tipo: 'carros',
    categoria: 'luxo',
    ano: 2023,
    combustivel: 'gasolina',
    transmissao: 'automatica',
    marca: 'Porsche',
    paginaDetalhes: '../pages/telaVerParcelas.html'
  },
  {
    id: 'fusca_classico',
    nome: 'FUSCA',
    descricao: '1.5 8V GASOLINA 2P MANUAL',
    preco: 35900,
    imagem: '../src/assets/img/Fusca_frente.jpg',
    tipo: 'carros',
    categoria: 'classico',
    ano: 1985,
    combustivel: 'gasolina',
    transmissao: 'manual',
    marca: 'Volkswagen'
  },
  {
    id: 'yamaha_fz25',
    nome: 'YAMAHA FZ25',
    descricao: 'YAMAHA FZ25 FAZER ABS',
    preco: 50000,
    imagem: '../src/assets/img/yamaha_fz25_frete.jpg',
    tipo: 'motos',
    categoria: 'esportiva',
    ano: 2022,
    combustivel: 'gasolina',
    transmissao: 'manual',
    marca: 'Yamaha'
  },
  {
    id: 'mercedes_gla200',
    nome: 'MERCEDES-BENZ GLA 200',
    descricao: '1.6 CGI FLEX ADVANCE 7G-DCT',
    preco: 50000,
    imagem: '../src/assets/img/mercedesbenz_gla_200_frente.jpg',
    tipo: 'carros',
    categoria: 'suv',
    ano: 2021,
    combustivel: 'flex',
    transmissao: 'automatica',
    marca: 'Mercedes-Benz'
  },
  {
    id: 'fiat_uno',
    nome: 'Fiat Uno',
    descricao: '9.8 24V GASOLINA 2p Manual',
    preco: 35000,
    imagem: '../src/assets/img/fiatuno.jfif',
    tipo: 'carros',
    categoria: 'popular',
    ano: 2018,
    combustivel: 'gasolina',
    transmissao: 'manual',
    marca: 'Fiat'
  },
  {
    id: 'bike_eletrica',
    nome: 'Bike Eletrica',
    descricao: '15m bateria max 15km/h',
    preco: 2500,
    imagem: '../src/assets/img/bikeeletrica.jpg',
    tipo: 'motos',
    categoria: 'eletrica',
    ano: 2023,
    combustivel: 'eletrico',
    transmissao: 'automatica',
    marca: 'Generic'
  },
  {
    id: 'bike_chique',
    nome: 'Bike Chique 1920',
    descricao: '0.3 2V Físico 4p Manual',
    preco: 6000,
    imagem: '../src/assets/img/carroCoberto.png',
    tipo: 'motos',
    categoria: 'vintage',
    ano: 1920,
    combustivel: 'outro',
    transmissao: 'manual',
    marca: 'Vintage'
  },
  {
    id: 'bike_bufalo',
    nome: 'Bike Motorizada a Bufalo',
    descricao: 'Bufalo motorizado',
    preco: 30000,
    imagem: '../src/assets/img/carrocaMotorizadaaBoi.jpg',
    tipo: 'motos',
    categoria: 'especial',
    ano: 2020,
    combustivel: 'biologico',
    transmissao: 'manual',
    marca: 'Artesanal'
  },
  {
    id: 'carro_maos',
    nome: 'Carro para Maos',
    descricao: 'Ergonomia excepcional para as maos',
    preco: 432.99,
    imagem: '../src/assets/img/CarroParaMaos.jpg',
    tipo: 'carros',
    categoria: 'miniatura',
    ano: 2023,
    combustivel: 'manual',
    transmissao: 'manual',
    marca: 'Toy'
  }
]
// ################################################################################
//                          SISTEMA DE TOAST MELHORADO
// ################################################################################
function toast (mensagem, tipo = 'info', duracao = 3000) {
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

function createToastContainer () {
  const container = document.createElement('div')
  container.className = 'toast-container'
  document.body.appendChild(container)
  return container
}

// ################################################################################
//                          SISTEMA DE RENDERIZAÇÃO DE VEÍCULOS
// ################################################################################

class GerenciadorVeiculos {
  constructor () {
    this.veiculos = [...BANCO_VEICULOS]
    this.veiculosFiltrados = [...BANCO_VEICULOS]
    this.filtroAtivo = 'carros'
    this.containerVeiculos = null
  }

  inicializar () {
    this.containerVeiculos = document.querySelector('.grade-veiculos')
    if (!this.containerVeiculos) {
      return
    }

    this.limparContainer()
    this.renderizarVeiculos()
  }

  limparContainer () {
    if (this.containerVeiculos) {
      this.containerVeiculos.innerHTML = ''
    }
  }

  criarCartaoVeiculo (veiculo) {
    const cartaoVeiculo = document.createElement('div')
    cartaoVeiculo.className = 'cartao-veiculo'
    cartaoVeiculo.dataset.veiculoId = veiculo.id
    cartaoVeiculo.dataset.tipo = veiculo.tipo

    const linkParcelas = `<button class="ver-parcelas" onclick="mostrarParcelas(${JSON.stringify(
      veiculo
    ).replace(/"/g, '&quot;')})">Ver parcelas</button>`

    cartaoVeiculo.innerHTML = `
	  <img src="${veiculo.imagem}" alt="${veiculo.nome}" loading="lazy" />
	  <div class="info-cartao">
		<h2>${veiculo.nome}</h2>
		<p>${veiculo.descricao}</p>
		<p class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
		<button class="btn-carrinho" onclick="carrinho.adicionarItem(${JSON.stringify(
      veiculo
    ).replace(/"/g, '&quot;')})">
		  <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
		</button>
		<button class="btn-favorito" onclick="toggleFavoritoVeiculo('${
      veiculo.id
    }', event)">
		  <i class="fa-regular fa-heart"></i>
		</button>
		${linkParcelas}
	  </div>
	`

    cartaoVeiculo.addEventListener('mouseenter', () => {
      cartaoVeiculo.style.transform = 'translateY(-5px)'
      cartaoVeiculo.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
      cartaoVeiculo.style.transition = 'all 0.3s ease'
    })

    cartaoVeiculo.addEventListener('mouseleave', () => {
      cartaoVeiculo.style.transform = 'translateY(0)'
      cartaoVeiculo.style.boxShadow = ''
    })

    return cartaoVeiculo
  }

  renderizarVeiculos (veiculosParaRenderizar = null) {
    if (!this.containerVeiculos) return

    const veiculos = veiculosParaRenderizar || this.veiculosFiltrados

    this.limparContainer()

    if (veiculos.length === 0) {
      this.containerVeiculos.innerHTML = `
      <div class="sem-resultados">
        <i class="fa-solid fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
        <h3>Nenhum veículo encontrado</h3>
        <p>Tente ajustar os filtros de busca</p>
      </div>
    `
      return
    }

    veiculos.forEach((veiculo, index) => {
      const cartao = this.criarCartaoVeiculo(veiculo)

      cartao.style.opacity = '0'
      cartao.style.transform = 'translateY(20px)'

      this.containerVeiculos.appendChild(cartao)

      setTimeout(() => {
        cartao.style.transition = 'all 0.3s ease'
        cartao.style.opacity = '1'
        cartao.style.transform = 'translateY(0)'
      }, index * 100)
    })

    setTimeout(() => {
      this.atualizarStatusFavoritos()
    }, 100)
  }

  filtrarPorTipo (tipo) {
    this.filtroAtivo = tipo
    this.veiculosFiltrados = this.veiculos.filter(
      veiculo => veiculo.tipo === tipo
    )
    this.renderizarVeiculos()

    const count = this.veiculosFiltrados.length
    toast(`${count} ${tipo} encontrado(s)`, 'info', 1500)
  }

  buscarVeiculos (termo) {
    if (!termo.trim()) {
      if (this.filtroAtivo === 'todos') {
        this.veiculosFiltrados = [...this.veiculos]
      } else {
        this.veiculosFiltrados = this.veiculos.filter(
          v => v.tipo === this.filtroAtivo
        )
      }
    } else {
      const termoLower = termo.toLowerCase()

      if (this.filtroAtivo === 'todos') {
        this.veiculosFiltrados = this.veiculos.filter(veiculo => {
          return (
            veiculo.nome.toLowerCase().includes(termoLower) ||
            veiculo.descricao.toLowerCase().includes(termoLower) ||
            veiculo.marca.toLowerCase().includes(termoLower)
          )
        })
      } else {
        this.veiculosFiltrados = this.veiculos.filter(veiculo => {
          const matchTipo = veiculo.tipo === this.filtroAtivo
          const matchBusca =
            veiculo.nome.toLowerCase().includes(termoLower) ||
            veiculo.descricao.toLowerCase().includes(termoLower) ||
            veiculo.marca.toLowerCase().includes(termoLower)

          return matchTipo && matchBusca
        })
      }
    }

    this.renderizarVeiculos()

    if (termo.trim()) {
      toast(
        `${this.veiculosFiltrados.length} veículo(s) encontrado(s)`,
        'info',
        1500
      )
    }
  }

  obterVeiculoPorId (id) {
    return this.veiculos.find(veiculo => veiculo.id === id)
  }

  atualizarStatusFavoritos () {
    if (!window.favoritos) return

    document.querySelectorAll('.btn-favorito').forEach(btn => {
      const cartao = btn.closest('.cartao-veiculo')
      const veiculoId = cartao ? cartao.dataset.veiculoId : null

      if (veiculoId && favoritos.isFavorito(veiculoId)) {
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>'
      } else if (veiculoId) {
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>'
      }
    })
  }

  // Métodos para manipulação dinâmica
  adicionarVeiculo (veiculo) {
    this.veiculos.push(veiculo)
    if (veiculo.tipo === this.filtroAtivo) {
      this.veiculosFiltrados.push(veiculo)
      this.renderizarVeiculos()
    }
    toast(`${veiculo.nome} adicionado!`, 'success')
  }

  removerVeiculo (id) {
    this.veiculos = this.veiculos.filter(v => v.id !== id)
    this.veiculosFiltrados = this.veiculosFiltrados.filter(v => v.id !== id)
    this.renderizarVeiculos()
    toast('Veículo removido!', 'info')
  }

  ordenarVeiculos (criterio) {
    let veiculosOrdenados = [...this.veiculosFiltrados]

    switch (criterio) {
      case 'preco-menor':
        veiculosOrdenados.sort((a, b) => a.preco - b.preco)
        break
      case 'preco-maior':
        veiculosOrdenados.sort((a, b) => b.preco - a.preco)
        break
      case 'nome':
        veiculosOrdenados.sort((a, b) => a.nome.localeCompare(b.nome))
        break
      case 'ano':
        veiculosOrdenados.sort((a, b) => b.ano - a.ano)
        break
      default:
        break
    }

    this.renderizarVeiculos(veiculosOrdenados)
    toast(`Ordenado por ${criterio}`, 'info', 1000)
  }
}

// ################################################################################
//                          SISTEMA DE CARRINHO MELHORADO
// ################################################################################

class CarrinhoCompras {
  constructor () {
    this.itens = this.carregarCarrinho()
    this.inicializar()
  }

  carregarCarrinho () {
    try {
      return JSON.parse(localStorage.getItem('webmotors_carrinho')) || []
    } catch {
      return []
    }
  }

  salvarCarrinho () {
    try {
      localStorage.setItem('webmotors_carrinho', JSON.stringify(this.itens))
    } catch (e) {
      console.warn('Não foi possível salvar o carrinho:', e)
    }
  }

  adicionarItem (veiculo) {
    const itemExistente = this.itens.find(item => item.id === veiculo.id)

    if (itemExistente) {
      toast('Este veículo já está no seu carrinho!', 'warning')
      return false
    }

    this.itens.push({
      ...veiculo,
      dataAdicao: new Date().toISOString()
    })

    this.salvarCarrinho()
    this.atualizarContador()
    toast(`${veiculo.nome} adicionado ao carrinho!`, 'success')
    return true
  }

  removerItem (id) {
    const index = this.itens.findIndex(item => item.id === id)
    if (index > -1) {
      const item = this.itens[index]
      this.itens.splice(index, 1)
      this.salvarCarrinho()
      this.atualizarContador()
      toast(`${item.nome} removido do carrinho!`, 'info')

      // Recarregar modal se estiver aberto
      const modalAberto = document.querySelector('.modal-carrinho')
      if (modalAberto) {
        modalAberto.remove()
        this.mostrarCarrinho()
      }
      return true
    }
    return false
  }

  obterItens () {
    return this.itens
  }

  obterTotal () {
    return this.itens.reduce((total, item) => total + item.preco, 0)
  }

  limparCarrinho () {
    this.itens = []
    this.salvarCarrinho()
    this.atualizarContador()
    toast('Carrinho limpo!', 'info')
  }

  atualizarContador () {
    const contador = document.querySelector('.carrinho-contador')
    if (contador) {
      contador.textContent = this.itens.length
      contador.style.display = this.itens.length > 0 ? 'block' : 'none'
    }
  }

  criarBotaoCarrinho () {
    const barraDir = document.querySelector('.barra-direita')
    if (barraDir && !document.querySelector('.botao-carrinho')) {
      const botaoCarrinho = document.createElement('button')
      botaoCarrinho.className = 'botao-carrinho'
      botaoCarrinho.innerHTML = `
		<i class="fa-solid fa-shopping-cart"></i>
		<span class="carrinho-contador">0</span>
	  `
      botaoCarrinho.onclick = () => this.mostrarCarrinho()

      barraDir.insertBefore(botaoCarrinho, barraDir.querySelector('.favoritos'))
    }
  }

  mostrarCarrinho () {
    const modal = document.createElement('div')
    modal.className = 'modal-carrinho'

    const itensHtml =
      this.itens.length > 0
        ? this.itens
            .map(
              item => `
		  <div class="item-carrinho">
			<img src="${item.imagem}" alt="${item.nome}" class="item-imagem">
			<div class="item-info">
			  <h4>${item.nome}</h4>
			  <p class="item-preco">R$ ${item.preco.toLocaleString('pt-BR')}</p>
			</div>
			<button onclick="carrinho.removerItem('${item.id}')" class="btn-remover">
			  <i class="fa-solid fa-trash"></i>
			</button>
		  </div>
		`
            )
            .join('')
        : '<p class="carrinho-vazio">Seu carrinho está vazio</p>'

    modal.innerHTML = `
	  <div class="modal-content">
		<div class="modal-header">
		  <h3>Meu Carrinho (${this.itens.length} itens)</h3>
		  <button onclick="this.closest('.modal-carrinho').remove()" class="btn-fechar">×</button>
		</div>
		<div class="modal-body">
		  ${itensHtml}
		</div>
		<div class="modal-footer">
		  <div class="total">Total: R$ ${this.obterTotal().toLocaleString(
        'pt-BR'
      )}</div>
		  <div class="acoes">
			<button onclick="carrinho.limparCarrinho(); this.closest('.modal-carrinho').remove()" 
					class="btn-limpar" ${this.itens.length === 0 ? 'disabled' : ''}>
			  Limpar Carrinho
			</button>
			<button onclick="carrinho.finalizarCompra()" 
					class="btn-finalizar" ${this.itens.length === 0 ? 'disabled' : ''}>
			  Finalizar Compra
			</button>
		  </div>
		</div>
	  </div>
	`

    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add('show'), 10)
  }

  finalizarCompra () {
    if (this.itens.length === 0) {
      toast('Seu carrinho está vazio!', 'warning')
      return
    }

    toast(
      `Redirecionando para finalização da compra de ${this.itens.length} veículo(s)...`,
      'info',
      2000
    )

    // Simular redirecionamento
    setTimeout(() => {
      toast('Funcionalidade de pagamento em desenvolvimento!', 'warning')
    }, 2000)
  }

  inicializar () {
    this.criarBotaoCarrinho()
    this.atualizarContador()
  }
}

// ################################################################################
//                          SISTEMA DE FAVORITOS MELHORADO
// ################################################################################
class SistemaFavoritos {
  constructor () {
    this.favoritos = this.carregarFavoritos()
  }

  carregarFavoritos () {
    try {
      return JSON.parse(localStorage.getItem('webmotors_favoritos')) || []
    } catch {
      return []
    }
  }

  salvarFavoritos () {
    try {
      localStorage.setItem(
        'webmotors_favoritos',
        JSON.stringify(this.favoritos)
      )
    } catch (e) {
      console.warn('Não foi possível salvar favoritos:', e)
    }
  }

  toggleFavorito (veiculo, botaoClicado = null) {
    const index = this.favoritos.findIndex(fav => fav.id === veiculo.id)

    if (index > -1) {
      this.favoritos.splice(index, 1)
      this.salvarFavoritos()
      toast(`${veiculo.nome} removido dos favoritos!`, 'info')

      if (botaoClicado) {
        botaoClicado.innerHTML = '<i class="fa-regular fa-heart"></i>'
      }

      return false
    } else {
      this.favoritos.push(veiculo)
      this.salvarFavoritos()
      toast(`${veiculo.nome} adicionado aos favoritos!`, 'success')

      if (botaoClicado) {
        botaoClicado.innerHTML = '<i class="fa-solid fa-heart"></i>'
      }

      return true
    }
  }

  isFavorito (id) {
    return this.favoritos.some(fav => fav.id === id)
  }

  removerFavorito (id) {
    const index = this.favoritos.findIndex(fav => fav.id === id)
    if (index > -1) {
      const item = this.favoritos[index]
      this.favoritos.splice(index, 1)
      this.salvarFavoritos()
      toast(`${item.nome} removido dos favoritos!`, 'info')

      // Recarregar modal se estiver aberto
      const modalAberto = document.querySelector('.modal-favoritos')
      if (modalAberto) {
        modalAberto.remove()
        this.mostrarFavoritos()
      }

      // Atualizar status dos favoritos
      if (window.gerenciadorVeiculos) {
        gerenciadorVeiculos.atualizarStatusFavoritos()
      }
      return true
    }
    return false
  }

  limparFavoritos () {
    this.favoritos = []
    this.salvarFavoritos()
    toast('Favoritos limpos!', 'info')

    // Atualizar status dos favoritos
    if (window.gerenciadorVeiculos) {
      gerenciadorVeiculos.atualizarStatusFavoritos()
    }
  }

  mostrarFavoritos () {
    const modal = document.createElement('div')
    modal.className = 'modal-favoritos'

    const itensHtml =
      this.favoritos.length > 0
        ? this.favoritos
            .map(
              item => `
		<div class="item-favorito">
		  <img src="${item.imagem}" alt="${item.nome}" class="item-imagem">
		  <div class="item-info">
			<h4>${item.nome}</h4>
			<p class="item-preco">R$ ${item.preco.toLocaleString('pt-BR')}</p>
			<p class="item-descricao">${item.descricao}</p>
		  </div>
		  <div class="item-acoes">
		  <button onclick="carrinho.adicionarItem(${JSON.stringify(item).replace(
        /"/g,
        '&quot;'
      )})" class="btn-add-carrinho">
		  <i class="fa-solid fa-cart-plus"></i>
			</button>
			<button onclick="favoritos.removerFavorito('${
        item.id
      }')" class="btn-remover-fav">
			  <i class="fa-solid fa-heart-broken"></i>
			</button>
		  </div>
		</div>
	  `
            )
            .join('')
        : '<p class="favoritos-vazio">Você ainda não tem favoritos</p>'

    modal.innerHTML = `
	<div class="modal-content">
	  <div class="modal-header">
		<h3>Meus Favoritos (${this.favoritos.length} itens)</h3>
		<button onclick="this.closest('.modal-favoritos').remove()" class="btn-fechar">×</button>
	  </div>
	  <div class="modal-body">
		${itensHtml}
	  </div>
	  <div class="modal-footer">
		<button onclick="favoritos.limparFavoritos(); this.closest('.modal-favoritos').remove()" 
				class="btn-limpar" ${this.favoritos.length === 0 ? 'disabled' : ''}>
		  Limpar Favoritos
		</button>
	  </div>
	</div>
  `

    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add('show'), 10)
  }

  criarBotaoFavoritos () {
    const botaoFavoritosExistente = document.querySelector('.favoritos')
    if (botaoFavoritosExistente) {
      // Modificar o botão existente para abrir o modal
      botaoFavoritosExistente.onclick = () => this.mostrarFavoritos()
    }
  }

  inicializar () {
    this.criarBotaoFavoritos()
    this.observarMudancasDOM()
  }

  observarMudancasDOM () {
    //oq eu to fznd da minha vida Marcelo?
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const temCartaoVeiculo = Array.from(mutation.addedNodes).some(
            node => node.classList && node.classList.contains('cartao-veiculo')
          )

          if (temCartaoVeiculo && window.gerenciadorVeiculos) {
            setTimeout(() => {
              gerenciadorVeiculos.atualizarStatusFavoritos()
            }, 50)
          }
        }
      })
    })

    const container = document.querySelector('.grade-veiculos')
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true
      })
    }
  }
}

// ################################################################################
//                          SISTEMA DE FILTROS MELHORADO
// ################################################################################

class SistemaFiltros {
  constructor () {
    this.inicializar()
  }

  inicializar () {
    this.configurarFiltros()
    this.configurarBusca()
    this.configurarOrdenacao()
  }

  configurarFiltros () {
    const botoesFiltro = document.querySelectorAll('.botao-filtro')

    botoesFiltro.forEach(botao => {
      botao.addEventListener('click', e => {
        // Remove classe ativo de todos
        botoesFiltro.forEach(b => b.classList.remove('ativo'))

        // Adiciona ao clicado
        botao.classList.add('ativo')

        // Determina filtro
        const textoFiltro = botao.textContent.trim()

        if (textoFiltro === 'TODOS') {
          // Mostrar todos os veículos
          gerenciadorVeiculos.veiculosFiltrados = [
            ...gerenciadorVeiculos.veiculos
          ]
          gerenciadorVeiculos.filtroAtivo = 'todos'
          gerenciadorVeiculos.renderizarVeiculos()
          toast('Mostrando todos os veículos', 'info', 1500)
        } else {
          const isCarro = botao.querySelector('.fa-car')
          const tipoFiltro = isCarro ? 'carros' : 'motos'
          gerenciadorVeiculos.filtrarPorTipo(tipoFiltro)
        }
      })
    })
  }

  configurarBusca () {
    const barraBusca = document.querySelector(
      'input[placeholder*="marca ou modelo"]'
    )
    if (barraBusca) {
      let timeoutBusca

      barraBusca.addEventListener('input', e => {
        clearTimeout(timeoutBusca)
        timeoutBusca = setTimeout(() => {
          gerenciadorVeiculos.buscarVeiculos(e.target.value)
        }, 300)
      })
    }
  }

  configurarOrdenacao () {
    // Criar dropdown de ordenação se não existir
    const filtrosContainer = document.querySelector('.filtros')
    if (filtrosContainer && !document.querySelector('.ordenacao')) {
      const ordenacaoDiv = document.createElement('div')
      ordenacaoDiv.className = 'ordenacao'
      ordenacaoDiv.innerHTML = `
		<h4>Ordenar por:</h4>
		<select id="ordenacao-select">
		  <option value="">Selecione...</option>
		  <option value="preco-menor">Menor Preço</option>
		  <option value="preco-maior">Maior Preço</option>
		  <option value="nome">Nome (A-Z)</option>
		  <option value="ano">Ano (Mais Novo)</option>
		</select>
	  `

      filtrosContainer.appendChild(ordenacaoDiv)

      const select = ordenacaoDiv.querySelector('#ordenacao-select')
      select.addEventListener('change', e => {
        if (e.target.value) {
          gerenciadorVeiculos.ordenarVeiculos(e.target.value)
        }
      })
    }
  }
}

// ################################################################################
//                          SISTEMA DE PARCELAS MELHORADO
// ################################################################################

function mostrarParcelas (veiculo) {
  if (veiculo.paginaDetalhes) {
    // Salvar dados do veículo no sessionStorage para usar na página de detalhes
    sessionStorage.setItem('veiculoSelecionado', JSON.stringify(veiculo))
    window.location.href = veiculo.paginaDetalhes
    return
  }
  const modal = document.createElement('div')
  modal.className = 'modal-parcelas'

  const opcoesParcelas = [
    { parcelas: 12, juros: 0.02 },
    { parcelas: 24, juros: 0.025 },
    { parcelas: 36, juros: 0.03 },
    { parcelas: 48, juros: 0.035 },
    { parcelas: 60, juros: 0.04 }
  ]

  const parcelasHtml = opcoesParcelas
    .map(opcao => {
      const valorComJuros =
        veiculo.preco * Math.pow(1 + opcao.juros, opcao.parcelas / 12)
      const valorParcela = valorComJuros / opcao.parcelas

      return `
	  <div class="opcao-parcela">
		<div class="parcela-info">
		  <strong>${opcao.parcelas}x de R$ ${valorParcela.toLocaleString('pt-BR', {
        minimumFractionDigits: 2
      })}</strong>
		  <small>Total: R$ ${valorComJuros.toLocaleString('pt-BR', {
        minimumFractionDigits: 2
      })}</small>
		</div>
		<button onclick="selecionarParcela(${opcao.parcelas}, ${valorParcela.toFixed(
        2
      )})" class="btn-selecionar">
		  Selecionar
		</button>
	  </div>
	`
    })
    .join('')

  modal.innerHTML = `
	<div class="modal-content">
	  <div class="modal-header">
		<h3>Opções de Parcelamento - ${veiculo.nome}</h3>
		<button onclick="this.closest('.modal-parcelas').remove()" class="btn-fechar">×</button>
	  </div>
	  <div class="modal-body">
		<div class="veiculo-resumo">
		  <img src="${veiculo.imagem}" alt="${veiculo.nome}">
		  <div>
			<h4>${veiculo.nome}</h4>
			<p class="preco-original">Preço à vista: R$ ${veiculo.preco.toLocaleString(
        'pt-BR'
      )}</p>
		  </div>
		</div>
		<div class="opcoes-parcelas">
		  ${parcelasHtml}
		</div>
	  </div>
	</div>
  `

  document.body.appendChild(modal)
  setTimeout(() => modal.classList.add('show'), 10)
}

function selecionarParcela (parcelas, valor) {
  toast(
    `${parcelas}x de R$ ${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    })} selecionado!`,
    'success'
  )
  document.querySelector('.modal-parcelas').remove()
}

// ################################################################################
//                          FUNÇÕES GLOBAIS
// ################################################################################

function toggleFavoritoVeiculo (veiculoId, event = null) {
  const veiculo = gerenciadorVeiculos.obterVeiculoPorId(veiculoId)
  if (veiculo) {
    const botaoClicado = event ? event.currentTarget : null

    const isFav = favoritos.toggleFavorito(veiculo, botaoClicado)

    if (!botaoClicado) {
      gerenciadorVeiculos.atualizarStatusFavoritos()
    }
  }
}

// ################################################################################
//                          INICIALIZAÇÃO PRINCIPAL
// ################################################################################

let carrinho, favoritos, filtros, gerenciadorVeiculos

document.addEventListener('DOMContentLoaded', () => {
  gerenciadorVeiculos = new GerenciadorVeiculos()
  carrinho = new CarrinhoCompras()
  favoritos = new SistemaFavoritos()
  filtros = new SistemaFiltros()
  favoritos.inicializar()

  gerenciadorVeiculos.inicializar()
  setTimeout(() => {
    if (gerenciadorVeiculos) {
      gerenciadorVeiculos.atualizarStatusFavoritos()
    }
  }, 500)

  console.log('Webmotors Enhanced carregado com sucesso!')
  //   toast('Sistema carregado com sucesso!', 'success', 800)
})

// ################################################################################
//                          CÓDIGO ORIGINAL MANTIDO
// ################################################################################

// Manter funcionalidade do menu vender
const anunciarElemento = document.getElementById('anunciar')
const icons = document.getElementById('payment-icon')
const listaIcons = [
  { name: 'visa', url: '../src/assets/img/vazio.png' },
  { name: 'mastercard', url: '../src/assets/img/vazio.png' },
  { name: 'elo', url: '../src/assets/img/vazio.png' },
  { name: 'americanexpress', url: '../src/assets/img/vazio.png' },
  { name: 'hipercard', url: '../src/assets/img/vazio.png' }
]

if (anunciarElemento) {
  function addIcon () {
    for (let i = 0; i < listaIcons.length; i++) {
      let icon = document.createElement('img')
      icon.setAttribute('src', listaIcons[i].url)
      icon.setAttribute('alt', listaIcons[i].name)
      icon.classList.add('payment-icon-img')
      icons.appendChild(icon)
    }
  }

  anunciarElemento.addEventListener('click', () => {
    toast('Redirecionando para página de anúncio...', 'info')
    setTimeout(() => {
      alert('Direciona pra pagina de anuncio...')
    }, 1000)
  })

  addIcon()
}
