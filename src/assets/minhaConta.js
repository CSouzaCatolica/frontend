// ################################################################################
//                    SCRIPT ATUALIZADO PARA PÁGINA MINHA CONTA
// ################################################################################

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
    success: `<i class="fas fa-circle-check toast-icon"></i>`,
    error: `<i class="fas fa-circle-xmark toast-icon"></i>`,
    warning: `<i class="fas fa-triangle-exclamation toast-icon"></i>`,
    info: `<i class="fas fa-circle-info toast-icon"></i>`
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
//                          GERENCIAMENTO DE SEÇÕES DA CONTA
// ################################################################################
class GerenciadorConta {
  constructor () {
    this.secaoAtiva = 'overview'
    this.dadosUsuario = this.carregarDadosUsuario()
    this.inicializar()
  }

  carregarDadosUsuario () {
    // Simular dados do usuário - em produção viria de uma API
    return {
      nome: 'Roger Knela Seka',
      email: 'RogerKnelaSeka@gmail.com',
      telefone: '(47) 99111-2222',
      dataNascimento: '09/05/2006',
      cpf: '***.***.***-**',
      rg: '**.***.**-*',
      endereco: 'Rua das Flores, 123 - Joinville/SC',
      cep: '89202-000',
      estadoNatal: 'Santa Catarina',
      naturalidade: 'Joinville',
      avatar: '../src/assets/img/userSouth.png',
      contaAtiva: true,
      ultimoLogin: 'Hoje às 14:32',
      veiculosCadastrados: 3,
      favoritos: 12,
      visualizacoes: 247
    }
  }

  inicializar () {
    this.configurarNavegacao()
    this.configurarModais()
    this.atualizarDadosInterface()
    this.configurarFormularios()
  }

  configurarNavegacao () {
    // Função global para trocar seções
    window.showSection = secao => {
      this.mostrarSecao(secao)
    }
  }

  mostrarSecao (secao) {
    // Esconder todas as seções
    const secoes = document.querySelectorAll('.content-section')
    secoes.forEach(s => (s.style.display = 'none'))

    // Remover classe ativa de todos os links
    const links = document.querySelectorAll('.sidebar-menu a')
    links.forEach(l => l.classList.remove('active'))

    // Mostrar seção selecionada
    const secaoElemento = document.getElementById(`${secao}-section`)
    if (secaoElemento) {
      secaoElemento.style.display = 'block'
      this.secaoAtiva = secao

      // Ativar link correspondente
      const linkAtivo = document.querySelector(
        `[onclick="showSection('${secao}')"]`
      )
      if (linkAtivo) {
        linkAtivo.classList.add('active')
      }

      // Executar ações específicas da seção
      this.executarAcaoSecao(secao)
    }
  }

  executarAcaoSecao (secao) {
    switch (secao) {
      case 'vehicles':
        this.mostrarModalVeiculos()
        break
      case 'security':
        toast('Redirecionando para os Termos de Segurança...', 'info', 2000)
        setTimeout(() => {
          this.redirecionarTermos()
        }, 100)
        break
      case 'support':
        toast('Redirecionando para a página de suporte...', 'info', 2000)
        setTimeout(() => {
          this.redirecionarSuporte()
        }, 100)
        break
      case 'personal':
        this.carregarDadosPessoais()
        break
      case 'overview':
        this.atualizarResumoAtividades()
        break
    }
  }

  mostrarModalVeiculos () {
    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.id = 'veiculosModal'

    modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal('veiculosModal')">&times;</button>
                <h2><i class="fas fa-car"></i> Meus Veículos</h2>
                <div class="modal-body">
                    <div class="empty-state">
                        <i class="fas fa-car-side" style="font-size: 4rem; color: #ccc; margin-bottom: 1rem;"></i>
                        <h3>Nenhum veículo comprado ainda</h3>
                        <p>Você ainda não possui veículos em sua conta. Quando efetuar uma compra, seus veículos aparecerão aqui.</p>
                        <div class="empty-actions">
                            <button class="btn btn-primary" onclick="redirecionarParaHome()">
                                <i class="fas fa-search"></i>
                                Explorar Veículos
                            </button>
                            <button class="btn btn-secondary" onclick="closeModal('veiculosModal')">
                                <i class="fas fa-times"></i>
                                Fechar
                            </button>
                        </div>
                        <small style="color: #666; margin-top: 1rem; display: block;">
                            <i class="fas fa-info-circle"></i>
                            Esta funcionalidade ainda está em desenvolvimento
                        </small>
                    </div>
                </div>
            </div>
        `

    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add('show'), 10)
  }

  redirecionarSuporte () {
    window.location.href = './suporte.html'
  }

  redirecionarTermos () {
    // Criar modal de termos se a página não existir
    this.mostrarModalTermos()
  }

  mostrarModalTermos () {
    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.id = 'termosModal'

    modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <button class="modal-close" onclick="closeModal('termosModal')">&times;</button>
                <h2><i class="fas fa-shield-alt"></i> Termos de Segurança</h2>
                <div class="modal-body">
                    <div class="termos-content">
                        <h3>Políticas de Segurança da Conta</h3>
                        <div class="termo-item">
                            <h4><i class="fas fa-lock"></i> Proteção de Senha</h4>
                            <p>• Utilize senhas com pelo menos 8 caracteres<br>
                               • Inclua letras maiúsculas, minúsculas, números e símbolos<br>
                               • Não compartilhe sua senha com terceiros</p>
                        </div>
                        
                        <div class="termo-item">
                            <h4><i class="fas fa-mobile-alt"></i> Autenticação em Duas Etapas</h4>
                            <p>• Recomendamos ativar a verificação em duas etapas<br>
                               • Protege sua conta contra acessos não autorizados<br>
                               • Configure através das configurações de segurança</p>
                        </div>
                        
                        <div class="termo-item">
                            <h4><i class="fas fa-user-shield"></i> Proteção de Dados</h4>
                            <p>• Seus dados pessoais são criptografados<br>
                               • Não compartilhamos informações com terceiros<br>
                               • Você pode solicitar exclusão dos dados a qualquer momento</p>
                        </div>
                        
                        <div class="termo-item">
                            <h4><i class="fas fa-exclamation-triangle"></i> Atividades Suspeitas</h4>
                            <p>• Monitore regularmente sua conta<br>
                               • Reporte atividades suspeitas imediatamente<br>
                               • Entre em contato conosco em caso de problemas</p>
                        </div>
                    </div>
                    
                    <div class="termos-actions">
                        <button class="btn btn-primary" onclick="aceitarTermos()">
                            <i class="fas fa-check"></i>
                            Li e Concordo
                        </button>
                        <button class="btn btn-secondary" onclick="closeModal('termosModal')">
                            <i class="fas fa-times"></i>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        `

    document.body.appendChild(modal)
    setTimeout(() => modal.classList.add('show'), 10)
  }

  carregarDadosPessoais () {
    // Atualizar dados na interface se necessário
    toast('Dados pessoais carregados', 'success', 1500)
  }

  atualizarResumoAtividades () {
    // Simular atualização de dados em tempo real
    const visualizacoes = document.querySelector(
      '.info-card:nth-child(3) .info-card-value'
    )
    if (visualizacoes) {
      const novoValor =
        this.dadosUsuario.visualizacoes + Math.floor(Math.random() * 5)
      visualizacoes.textContent = novoValor
      this.dadosUsuario.visualizacoes = novoValor
    }
  }

  atualizarDadosInterface () {
    // Atualizar nome do usuário
    const nomeElement = document.querySelector('.profile-name')
    if (nomeElement) {
      nomeElement.textContent = this.dadosUsuario.nome
    }

    // Atualizar avatar
    const avatar = document.querySelector('.profile-avatar img')
    if (avatar) {
      avatar.src = this.dadosUsuario.avatar
    }
  }

  configurarModais () {
    // Função global para abrir modais
    window.openModal = modalId => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = 'block'
        setTimeout(() => modal.classList.add('show'), 10)
      }
    }

    // Função global para fechar modais
    window.closeModal = modalId => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.remove('show')
        setTimeout(() => {
          modal.style.display = 'none'
          // Remover modais dinâmicos
          if (modalId === 'veiculosModal' || modalId === 'termosModal') {
            modal.remove()
          }
        }, 300)
      }
    }

    // Função global para mostrar toast
    window.showToast = (mensagem, tipo = 'info') => {
      toast(mensagem, tipo)
    }
  }

  configurarFormularios () {
    // Configurar formulário de edição
    const editForm = document.getElementById('editForm')
    if (editForm) {
      editForm.addEventListener('submit', e => {
        e.preventDefault()
        this.salvarDadosPessoais(e.target)
      })
    }
  }

  salvarDadosPessoais (form) {
    const formData = new FormData(form)

    // Simular salvamento
    toast('Salvando alterações...', 'info', 1500)

    setTimeout(() => {
      // Atualizar dados locais
      const nome = form.querySelector('input[type="text"]').value
      const email = form.querySelector('input[type="email"]').value
      const telefone = form.querySelector('input[type="tel"]').value

      this.dadosUsuario.nome = nome
      this.dadosUsuario.email = email
      this.dadosUsuario.telefone = telefone

      // Atualizar interface
      this.atualizarDadosInterface()

      // Fechar modal e mostrar sucesso
      closeModal('editModal')
      toast('Dados atualizados com sucesso!', 'success')
    }, 1500)
  }
}

// ################################################################################
//                          FUNÇÕES GLOBAIS ESPECÍFICAS
// ################################################################################

function redirecionarParaHome () {
  toast('Redirecionando para a página inicial...', 'info', 1500)
  setTimeout(() => {
    window.location.href = './home.html'
  }, 1500)
}

function aceitarTermos () {
  toast('Termos aceitos com sucesso!', 'success')
  closeModal('termosModal')

  // Voltar para a seção overview
  showSection('overview')
}

function alterarAvatar () {
  const input = document.querySelector('#avatarModal input[type="file"]')
  if (input.files && input.files[0]) {
    const reader = new FileReader()

    reader.onload = function (e) {
      const avatar = document.querySelector('.profile-avatar img')
      if (avatar) {
        avatar.src = e.target.result
        toast('Avatar alterado com sucesso!', 'success')
        closeModal('avatarModal')
      }
    }

    reader.readAsDataURL(input.files[0])
  } else {
    toast('Por favor, selecione uma imagem', 'warning')
  }
}

function exportarDados () {
  toast('Preparando exportação dos dados...', 'info', 2000)

  setTimeout(() => {
    // Simular download de arquivo
    const dadosExport = {
      usuario: gerenciadorConta.dadosUsuario,
      dataExportacao: new Date().toISOString(),
      formatoExportacao: 'JSON'
    }

    const blob = new Blob([JSON.stringify(dadosExport, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'meus_dados_webmotors.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast('Dados exportados com sucesso!', 'success')
  }, 2000)
}

// ################################################################################
//                          MELHORIAS DE UX/UI
// ################################################################################

class MelhoriaUX {
  constructor () {
    this.inicializar()
  }

  inicializar () {
    this.adicionarAnimacoes()
    this.configurarAtalhosTeclado()
    this.adicionarIndicadoresCarregamento()
    this.configurarTooltips()
  }

  adicionarAnimacoes () {
    // Adicionar efeito hover nos cards
    const cards = document.querySelectorAll('.info-card')
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)'
        card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)'
      })

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)'
        card.style.boxShadow = ''
      })
    })
  }

  configurarAtalhosTeclado () {
    document.addEventListener('keydown', e => {
      // ESC para fechar modals
      if (e.key === 'Escape') {
        const modalsAbertos = document.querySelectorAll(
          '.modal[style*="block"]'
        )
        modalsAbertos.forEach(modal => {
          if (modal.id) {
            closeModal(modal.id)
          }
        })
      }

      // Ctrl + 1-5 para navegar seções
      if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault()
        const secoes = [
          'overview',
          'personal',
          'vehicles',
          'security',
          'support'
        ]
        const indice = parseInt(e.key) - 1
        if (secoes[indice]) {
          showSection(secoes[indice])
        }
      }
    })
  }

  adicionarIndicadoresCarregamento () {
    // Adicionar loading nos botões quando necessário
    const botoes = document.querySelectorAll('.btn')
    botoes.forEach(botao => {
      const textoOriginal = botao.innerHTML

      botao.mostrarCarregando = () => {
        botao.disabled = true
        botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...'
      }

      botao.esconderCarregando = () => {
        botao.disabled = false
        botao.innerHTML = textoOriginal
      }
    })
  }

  configurarTooltips () {
    // Adicionar tooltips informativos
    const elementosComTooltip = [
      {
        selector: '.profile-avatar',
        texto: 'Clique para alterar sua foto'
      },
      { selector: '.status-dot', texto: 'Conta ativa e verificada' },
      { selector: '.info-card', texto: 'Clique para ver detalhes' }
    ]

    elementosComTooltip.forEach(item => {
      const elementos = document.querySelectorAll(item.selector)
      elementos.forEach(el => {
        el.title = item.texto
      })
    })
  }
}

// ################################################################################
//                          INICIALIZAÇÃO
// ################################################################################

let gerenciadorConta, melhoriaUX

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar sistemas
  gerenciadorConta = new GerenciadorConta()
  melhoriaUX = new MelhoriaUX()

  // Configurar botão de upload de avatar
  const botaoUpload = document.querySelector('#avatarModal .btn-primary')
  if (botaoUpload) {
    botaoUpload.onclick = alterarAvatar
  }

  // Configurar botão de exportar dados
  const botaoExportar = document.querySelector(
    '.btn-secondary[onclick*="exportados"]'
  )
  if (botaoExportar) {
    botaoExportar.onclick = exportarDados
  }

  // Mostrar seção inicial
  showSection('overview')

  console.log('Sistema de conta inicializado com sucesso!')
})

// ################################################################################
//                          TRATAMENTO DE ERROS
// ################################################################################

window.addEventListener('error', e => {
  console.error('Erro na página:', e.error)
  toast('Ocorreu um erro inesperado. Tente recarregar a página.', 'error', 5000)
})

// Tratar promises rejeitadas
window.addEventListener('unhandledrejection', e => {
  console.error('Promise rejeitada:', e.reason)
  toast('Erro de conexão. Verifique sua internet.', 'error', 3000)
})
