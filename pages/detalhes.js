// pages/detalhes.js
import { API_URL, navegarPara } from "../main.js";
import { renderForm } from "./form.js";

export async function renderDetalhes(id) {
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = `<p class="loading">Carregando detalhes...</p>`;

  try {
    const resposta = await fetch(`${API_URL}/filmes/${id}`);
    if (!resposta.ok) throw new Error("Filme não encontrado");
    const filme = await resposta.json();

    const imagemValida = filme.imagem_url?.startsWith("http")
      ? filme.imagem_url
      : "https://via.placeholder.com/500x700?text=Sem+Imagem";

    conteudo.innerHTML = `
      <button id="voltar">← Voltar</button>

      <div class="detalhes-filme">
        <img src="${imagemValida}" alt="${filme.titulo}">
        <h2>${filme.titulo}</h2>
        <p><strong>Diretor:</strong> ${filme.diretor}</p>
        <p><strong>Gênero:</strong> ${filme.genero}</p>
        <p><strong>Ano:</strong> ${filme.ano}</p>
        <p><strong>Sinopse:</strong> ${filme.sinopse}</p>

        <div style="display:flex; gap:10px; margin-top:20px;">
          <button id="editar">✏️ Editar</button>
          <button id="excluir" class="danger">🗑 Excluir</button>
        </div>
      </div>
    `;

    // === Botão VOLTAR ===
    document.getElementById("voltar").addEventListener("click", () => {
      navegarPara("home");
    });

    // === Botão EDITAR ===
    document.getElementById("editar").addEventListener("click", () => {
      renderForm(filme); // abre o mesmo form, com dados preenchidos
    });

    // === Botão EXCLUIR ===
    document.getElementById("excluir").addEventListener("click", async () => {
      const confirmar = confirm(`Tem certeza que deseja excluir "${filme.titulo}"?`);
      if (!confirmar) return;

      try {
        await fetch(`${API_URL}/filmes/${id}`, { method: "DELETE" });
        alert("Filme excluído com sucesso!");
        navegarPara("home");
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Erro ao excluir o filme.");
      }
    });
  } catch (erro) {
    console.error("Erro ao carregar detalhes:", erro);
    conteudo.innerHTML = `<p style="color:red;text-align:center;">Erro ao carregar detalhes 😢</p>`;
  }
}
