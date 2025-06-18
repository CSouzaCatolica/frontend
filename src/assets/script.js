// ################################################################################
//                          menu vender
// ################################################################################

const anunciarElemento = document.getElementById("anunciar");
const icons = document.getElementById("payment-icon");
const listaIcons = [
    {name : "visa",             url : "../src/assets/img/vazio.png"},
    {name : "mastercard",       url : "../src/assets/img/vazio.png"},
    {name : "elo",              url : "../src/assets/img/vazio.png"},
    {name : "americanexpress",  url : "../src/assets/img/vazio.png"},
    {name : "hipercard",        url : "../src/assets/img/vazio.png"}
]

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


// ################################################################################
//                          start
// ################################################################################
addIcon();