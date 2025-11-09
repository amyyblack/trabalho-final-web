import { API_URL, navegarPara } from "../main.js";

export async function renderHome() {
  const main = document.getElementById("conteudo");
  main.innerHTML = `<p class="loading">Carregando filmes...</p>`;

  try {
    const resposta = await fetch(`${API_URL}/filmes`);
    const filmes = await resposta.json();

    if (!filmes.length) {
      main.innerHTML = `<p>Nenhum filme encontrado.</p>`;
      return;
    }

    main.innerHTML = `
      <div class="home-header">
        <h2>🎬 Catálogo de Filmes</h2>
        <button id="addFilmeBtn">➕ Adicionar Filme</button>
      </div>
      <div class="filmes-container"></div>
    `;

    const container = main.querySelector(".filmes-container");

    filmes.forEach((filme) => {
      const imagemValida = filme.imagem_url?.startsWith("http")
        ? filme.imagem_url
        : "https://via.placeholder.com/300x450?text=Sem+Imagem";

      const card = document.createElement("div");
      card.classList.add("filme-card");
      card.innerHTML = `
        <img src="${imagemValida}" alt="${filme.titulo}">
        <h3>${filme.titulo}</h3>
        <p>${filme.genero}</p>
      `;

      card.addEventListener("click", () => navegarPara("detalhes", filme.id));
      container.appendChild(card);
    });

    document.getElementById("addFilmeBtn").addEventListener("click", () => {
      navegarPara("form");
    });
  } catch (erro) {
    console.error("Erro ao carregar filmes:", erro);
    main.innerHTML = `<p>Erro ao carregar filmes.</p>`;
  }
}
