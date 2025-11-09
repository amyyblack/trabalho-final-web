import { navegarPara } from "../main.js";

export function criarFilmeCard(filme) {
  const card = document.createElement("div");
  card.classList.add("filme-card");
  card.innerHTML = `
  <div class="filme-capa" style="background-image: url('${filme.imagem_url}')"></div>
  <h3>${filme.titulo}</h3>
  <p>${filme.ano} • ${filme.genero}</p>
`;


  card.addEventListener("click", (e) => {
    e.preventDefault();
    navegarPara("detalhes", filme.id);
  });

  return card;
}
