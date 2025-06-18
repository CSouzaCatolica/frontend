// ################################################################################
//                          menu vender
// ################################################################################function toast(mensagem, tipo) {
function toast(mensagem, tipo) {
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastElement.classList.add(tipo);

  const textoElement = document.createElement("span");
  textoElement.textContent = mensagem;

  const closeElement = document.createElement("button");
  closeElement.textContent = "X";
  closeElement.addEventListener("click", () => {
    toastElement.remove();
  });

  toastElement.appendChild(textoElement);
  toastElement.appendChild(closeElement);

  document.body.appendChild(toastElement);

  setTimeout(() => {
    toastElement.remove();
  }, 3000); // remover o toast após 3 segundos
}
// ################################################################################
//                         home
// ################################################################################

const meusbotoes = document.getElementsByClassName("botao-filtro");

for (let i = 0; i < meusbotoes.length; i++) {
  meusbotoes[i].addEventListener("click", () => {
    for (let j = 0; j < meusbotoes.length; j++) {
      meusbotoes[j].classList.remove("ativo");
	 toast("Carro cadastrado com sucesso!", "success");
    }
    meusbotoes[i].classList.add("ativo");
  });
}

// ################################################################################
//                          menu vender
// ################################################################################
const anunciarElemento = document.getElementById("anunciar");
const icons = document.getElementById("payment-icon");
const listaIcons = [
  { name: "visa", url: "../src/assets/img/vazio.png" },
  { name: "mastercard", url: "../src/assets/img/vazio.png" },
  { name: "elo", url: "../src/assets/img/vazio.png" },
  { name: "americanexpress", url: "../src/assets/img/vazio.png" },
  { name: "hipercard", url: "../src/assets/img/vazio.png" },
];

if (anunciarElemento) {
  function addIcon() {
    for (let i = 0; i < listaIcons.length; i++) {
      let icon = document.createElement("img");
      icon.setAttribute("src", listaIcons[i].url);
      icon.setAttribute("alt", listaIcons[i].name);
      icon.classList.add("payment-icon-img");
      icons.appendChild(icon);
    }
  }
  anunciarElemento.addEventListener("click", () => {
    alert("Direciona pra pagina de anuncio...");
  });
}
// ################################################################################
//                          start
// ################################################################################
anunciarElemento? addIcon() : null;
