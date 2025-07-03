function criarBotaoCarrinho (veiculo, container) {
  const botaoCarrinho = document.createElement('button')
  botaoCarrinho.className = 'botao-contato'
  botaoCarrinho.innerHTML = `
    <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
  `

  botaoCarrinho.onclick = () => {
    if (window.carrinho) {
      carrinho.adicionarItem(veiculo)
    } else {
      toast('Sistema de carrinho não está disponível', 'error')
    }
  }

  if (container) {
    container.appendChild(botaoCarrinho)
  }

  return botaoCarrinho
}

function obterVeiculoSelecionado () {
  try {
    const dadosVeiculo = sessionStorage.getItem('veiculoSelecionado')
    return dadosVeiculo ? JSON.parse(dadosVeiculo) : null
  } catch (error) {
    console.error('Erro ao recuperar dados do veículo:', error)
    return null
  }
}
