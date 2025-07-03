// toast
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

  adicionarBotoesEdicaoIndividual () {
    const dataItems = document.querySelectorAll('#personal-section .data-item')

    dataItems.forEach((item, index) => {
      const label = item.querySelector('.data-label').textContent.toLowerCase()

      if (label.includes('cpf') || label.includes('rg')) {
        return
      }

      if (item.querySelector('.edit-btn')) {
        return
      }

      const editBtn = document.createElement('button')
      editBtn.className = 'edit-btn'
      editBtn.innerHTML = '<i class="fas fa-edit"></i>'
      editBtn.title = 'Editar este campo'
      editBtn.onclick = () => this.editarCampoIndividual(item, label)

      item.style.position = 'relative'
      item.appendChild(editBtn)
    })
  }

  carregarDadosUsuario () {
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
      avatar: '../src/assets/img/userProfile.jpg',
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
    window.showSection = secao => {
      this.mostrarSecao(secao)
    }
  }

  mostrarSecao (secao) {
    const secoes = document.querySelectorAll('.content-section')
    secoes.forEach(s => (s.style.display = 'none'))

    const links = document.querySelectorAll('.sidebar-menu a')
    links.forEach(l => l.classList.remove('active'))

    const secaoElemento = document.getElementById(`${secao}-section`)
    if (secaoElemento) {
      secaoElemento.style.display = 'block'
      this.secaoAtiva = secao

      const linkAtivo = document.querySelector(
        `[onclick="showSection('${secao}')"]`
      )
      if (linkAtivo) {
        linkAtivo.classList.add('active')
      }

      if (secao === 'personal') {
        this.adicionarBotoesEdicaoIndividual()
      }

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
        this.redirecionarTermos()
        break
      case 'support':
        toast('Redirecionando para a página de suporte...', 'info', 2000)
        this.redirecionarSuporte()
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
    window.location.href = './seguranca.html'
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
    console.log('Dados pessoais carregados')
  }

  atualizarResumoAtividades () {
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
    const nomeElement = document.querySelector('.profile-name')
    if (nomeElement) {
      nomeElement.textContent = this.dadosUsuario.nome
    }

    const avatar = document.querySelector('.profile-avatar img')
    if (avatar) {
      avatar.src = this.dadosUsuario.avatar
    }
  }

  configurarModais () {
    window.openModal = modalId => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = 'block'
        setTimeout(() => modal.classList.add('show'), 10)
      }
    }

    window.closeModal = modalId => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.classList.remove('show')
        setTimeout(() => {
          modal.style.display = 'none'
          if (modalId === 'veiculosModal' || modalId === 'termosModal') {
            modal.remove()
          }
        }, 300)
      }
    }

    window.showToast = (mensagem, tipo = 'info') => {
      toast(mensagem, tipo)
    }
  }

  configurarFormularios () {
    const editForm = document.getElementById('editForm')
    if (editForm) {
      editForm.addEventListener('submit', e => {
        e.preventDefault()
        this.salvarDadosCompletos(e.target)
      })
    }

    this.criarFormularioCompleto()
  }

  atualizarDadosNaSecao () {
    const dadosMap = {
      'Nome completo': this.dadosUsuario.nome,
      'Data de nascimento': this.dadosUsuario.dataNascimento,
      'Estado natal': this.dadosUsuario.estadoNatal,
      Naturalidade: this.dadosUsuario.naturalidade,
      'E-mail principal': this.dadosUsuario.email,
      Celular: this.dadosUsuario.telefone,
      'Telefone residencial':
        this.dadosUsuario.telefoneResidencial || 'Não informado',
      Endereço: this.dadosUsuario.endereco,
      CEP: this.dadosUsuario.cep
    }

    const dataItems = document.querySelectorAll('#personal-section .data-item')
    dataItems.forEach(item => {
      const label = item.querySelector('.data-label').textContent
      const value = item.querySelector('.data-value')

      if (dadosMap[label]) {
        value.textContent = dadosMap[label]
      }
    })
  }

  salvarDadosCompletos (form) {
    const formData = new FormData(form)
    const dadosAtualizados = {}
    for (let [key, value] of formData.entries()) {
      dadosAtualizados[key] = value
    }

    if (
      !dadosAtualizados.nome ||
      !dadosAtualizados.email ||
      !dadosAtualizados.telefone
    ) {
      toast('Por favor, preencha todos os campos obrigatórios', 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(dadosAtualizados.email)) {
      toast('Por favor, insira um e-mail válido', 'error')
      return
    }

    toast('Salvando todas as alterações...', 'info', 2000)

    setTimeout(() => {
      Object.keys(dadosAtualizados).forEach(key => {
        if (this.dadosUsuario[key] !== undefined) {
          this.dadosUsuario[key] = dadosAtualizados[key]
        }
      })

      if (dadosAtualizados.dataNascimento) {
        const data = new Date(dadosAtualizados.dataNascimento)
        this.dadosUsuario.dataNascimento = `${data
          .getDate()
          .toString()
          .padStart(2, '0')}/${(data.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${data.getFullYear()}`
      }

      this.atualizarDadosInterface()
      this.atualizarDadosNaSecao()

      closeModal('editModal')
      toast('Todos os dados foram atualizados com sucesso!', 'success')
    }, 2000)
  }

  editarCampoIndividual (item, label) {
    const dataValue = item.querySelector('.data-value')
    const valorAtual = dataValue.textContent

    const input = document.createElement('input')
    input.type = this.getTipoInput(label)
    input.value = valorAtual
    input.className = 'edit-input'

    this.configurarInput(input, label)

    const actionDiv = document.createElement('div')
    actionDiv.className = 'edit-actions'

    const saveBtn = document.createElement('button')
    saveBtn.className = 'save-btn'
    saveBtn.innerHTML = '<i class="fas fa-check"></i>'
    saveBtn.onclick = () => this.salvarCampoIndividual(item, label, input.value)

    const cancelBtn = document.createElement('button')
    cancelBtn.className = 'cancel-btn'
    cancelBtn.innerHTML = '<i class="fas fa-times"></i>'
    cancelBtn.onclick = () => this.cancelarEdicaoIndividual(item, valorAtual)

    actionDiv.appendChild(saveBtn)
    actionDiv.appendChild(cancelBtn)

    dataValue.style.display = 'none'
    item.querySelector('.edit-btn').style.display = 'none'
    item.appendChild(input)
    item.appendChild(actionDiv)

    input.focus()
    input.select()
  }

  getTipoInput (label) {
    if (label.includes('email') || label.includes('e-mail')) return 'email'
    if (label.includes('telefone') || label.includes('celular')) return 'tel'
    if (label.includes('data')) return 'date'
    if (label.includes('cep')) return 'text'
    return 'text'
  }

  configurarInput (input, label) {
    input.style.width = '100%'
    input.style.padding = '8px'
    input.style.border = '2px solid #f3123c'
    input.style.borderRadius = '4px'
    input.style.fontSize = '14px'

    if (label.includes('telefone') || label.includes('celular')) {
      input.placeholder = '(00) 00000-0000'
      input.addEventListener('input', this.mascaraTelefone)
    }

    if (label.includes('cep')) {
      input.placeholder = '00000-000'
      input.addEventListener('input', this.mascaraCEP)
    }

    if (label.includes('data')) {
      input.max = new Date().toISOString().split('T')[0]
    }
  }

  mascaraTelefone (e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (value.length >= 7) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }
    e.target.value = value
  }

  mascaraCEP (e) {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 6) {
      value = value.replace(/(\d{5})(\d{0,3})/, '$1-$2')
    }
    e.target.value = value
  }

  salvarCampoIndividual (item, label, novoValor) {
    if (!novoValor.trim()) {
      toast('Por favor, preencha o campo', 'warning')
      return
    }

    if (!this.validarCampo(label, novoValor)) {
      return
    }

    toast('Salvando alteração...', 'info', 1000)

    setTimeout(() => {
      this.atualizarDadoUsuario(label, novoValor)

      const dataValue = item.querySelector('.data-value')
      dataValue.textContent = novoValor
      dataValue.style.display = 'block'

      const editInput = item.querySelector('.edit-input')
      const editActions = item.querySelector('.edit-actions')
      const editBtn = item.querySelector('.edit-btn')

      if (editInput) editInput.remove()
      if (editActions) editActions.remove()
      if (editBtn) editBtn.style.display = 'block'

      if (label.includes('nome')) {
        this.atualizarDadosInterface()
      }

      toast('Campo atualizado com sucesso!', 'success')
    }, 1000)
  }

  validarCampo (label, valor) {
    if (label.includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(valor)) {
        toast('Por favor, insira um e-mail válido', 'error')
        return false
      }
    }

    if (label.includes('telefone') || label.includes('celular')) {
      const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/
      if (!telefoneRegex.test(valor)) {
        toast('Por favor, insira um telefone válido', 'error')
        return false
      }
    }

    if (label.includes('cep')) {
      const cepRegex = /^\d{5}-\d{3}$/
      if (!cepRegex.test(valor)) {
        toast('Por favor, insira um CEP válido', 'error')
        return false
      }
    }

    return true
  }

  atualizarDadoUsuario (label, valor) {
    const mapeamento = {
      'nome completo': 'nome',
      'e-mail principal': 'email',
      'email principal': 'email',
      celular: 'telefone',
      'telefone residencial': 'telefoneResidencial',
      endereço: 'endereco',
      cep: 'cep',
      'data de nascimento': 'dataNascimento',
      'estado natal': 'estadoNatal',
      naturalidade: 'naturalidade'
    }

    const campo = mapeamento[label]
    if (campo && this.dadosUsuario[campo] !== undefined) {
      this.dadosUsuario[campo] = valor
    }
  }

  cancelarEdicaoIndividual (item, valorOriginal) {
    const dataValue = item.querySelector('.data-value')
    const editInput = item.querySelector('.edit-input')
    const editActions = item.querySelector('.edit-actions')
    const editBtn = item.querySelector('.edit-btn')

    dataValue.style.display = 'block'
    if (editInput) editInput.remove()
    if (editActions) editActions.remove()
    if (editBtn) editBtn.style.display = 'block'
  }

  criarFormularioCompleto () {
    const modalExistente = document.getElementById('editModal')
    if (modalExistente) {
      modalExistente.innerHTML = `
      <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
        <button class="modal-close" onclick="closeModal('editModal')">&times;</button>
        <h2><i class="fas fa-user-edit"></i> Editar Dados Pessoais</h2>
        <form id="editCompleteForm">
          <div class="form-section">
            <h3><i class="fas fa-id-card"></i> Identificação</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Nome Completo *</label>
                <input type="text" name="nome" value="${
                  this.dadosUsuario.nome
                }" required>
              </div>
              <div class="form-group">
                <label>Data de Nascimento</label>
                <input type="date" name="dataNascimento" value="${this.converterData(
                  this.dadosUsuario.dataNascimento
                )}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Estado Natal</label>
                <select name="estadoNatal">
                  <option value="Santa Catarina" ${
                    this.dadosUsuario.estadoNatal === 'Santa Catarina'
                      ? 'selected'
                      : ''
                  }>Santa Catarina</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Minas Gerais">Minas Gerais</option>
                  <option value="Paraná">Paraná</option>
                  <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                </select>
              </div>
              <div class="form-group">
                <label>Naturalidade</label>
                <input type="text" name="naturalidade" value="${
                  this.dadosUsuario.naturalidade
                }">
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3><i class="fas fa-phone"></i> Contato</h3>
            <div class="form-row">
              <div class="form-group">
                <label>E-mail Principal *</label>
                <input type="email" name="email" value="${
                  this.dadosUsuario.email
                }" required>
              </div>
              <div class="form-group">
                <label>Celular *</label>
                <input type="tel" name="telefone" value="${
                  this.dadosUsuario.telefone
                }" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Telefone Residencial</label>
                <input type="tel" name="telefoneResidencial" value="${
                  this.dadosUsuario.telefoneResidencial || ''
                }" placeholder="(00) 0000-0000">
              </div>
              <div class="form-group">
                <label>CEP</label>
                <input type="text" name="cep" value="${
                  this.dadosUsuario.cep
                }" placeholder="00000-000">
              </div>
            </div>
            <div class="form-group">
              <label>Endereço Completo</label>
              <textarea name="endereco" rows="2" placeholder="Rua, número, bairro, cidade/estado">${
                this.dadosUsuario.endereco
              }</textarea>
            </div>
          </div>

          <div class="action-buttons">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save"></i>
              Salvar Todas as Alterações
            </button>
            <button type="button" class="btn btn-secondary" onclick="closeModal('editModal')">
              <i class="fas fa-times"></i>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    `
      const newForm = document.getElementById('editCompleteForm')
      if (newForm) {
        newForm.addEventListener('submit', e => {
          e.preventDefault()
          this.salvarDadosCompletos(e.target)
        })

        this.adicionarMascarasFormulario(newForm)
      }
    }
  }

  converterData (dataString) {
    if (!dataString) return ''
    const partes = dataString.split('/')
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(
        2,
        '0'
      )}`
    }
    return ''
  }

  adicionarMascarasFormulario (form) {
    const telefoneInputs = form.querySelectorAll('input[type="tel"]')
    telefoneInputs.forEach(input => {
      input.addEventListener('input', this.mascaraTelefone)
    })

    const cepInput = form.querySelector('input[name="cep"]')
    if (cepInput) {
      cepInput.addEventListener('input', this.mascaraCEP)
    }
  }
}

// ################################################################################
//                          FUNÇÕES GLOBAIS
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
  gerenciadorConta = new GerenciadorConta()
  melhoriaUX = new MelhoriaUX()

  const botaoUpload = document.querySelector('#avatarModal .btn-primary')
  if (botaoUpload) {
    botaoUpload.onclick = alterarAvatar
  }

  const botaoExportar = document.querySelector(
    '.btn-secondary[onclick*="exportados"]'
  )
  if (botaoExportar) {
    botaoExportar.onclick = exportarDados
  }
  showSection('overview')

  console.log('Sistema de conta inicializado com sucesso!')
})

window.addEventListener('error', e => {
  console.error('Erro na página:', e.error)
  toast('Ocorreu um erro inesperado. Tente recarregar a página.', 'error', 5000)
})

window.addEventListener('unhandledrejection', e => {
  console.error('Promise rejeitada:', e.reason)
  toast('Erro de conexão. Verifique sua internet.', 'error', 3000)
})

// por favor deus me perdoe por escolher o caminho da TI 🙏
const estilosEdicao = `
<style>
.edit-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f3123c;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  font-size: 12px;
}

.data-item:hover .edit-btn {
  opacity: 1;
}

.edit-input {
  margin: 10px 0;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.save-btn, .cancel-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.save-btn {
  background: #28a745;
  color: white;
}

.cancel-btn {
  background: #dc3545;
  color: white;
}

.form-section {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #f3123c;
}

.form-section h3 {
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #f3123c;
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 20px;
    max-width: calc(100% - 40px);
  }
}
</style>
`
document.head.insertAdjacentHTML('beforeend', estilosEdicao)
