// pages/form.js
import { navegarPara } from "../main.js";

export function renderForm(filme = null) {
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = `
    <div class="form-container">
      <button id="voltar" style="margin-bottom: 15px;">← Voltar</button>
      <h2>${filme ? "Editar Filme" : "Novo Filme"}</h2>

      <form id="filmeForm">
        <input type="text" id="titulo" placeholder="Título" value="${filme ? filme.titulo : ""}" required>
        <input type="text" id="diretor" placeholder="Diretor" value="${filme ? filme.diretor : ""}" required>
        <input type="text" id="genero" placeholder="Gênero" value="${filme ? filme.genero : ""}" required>
        <input type="number" id="ano" placeholder="Ano" value="${filme ? filme.ano : ""}" required>
        <textarea id="sinopse" placeholder="Sinopse" required>${filme ? filme.sinopse : ""}</textarea>
        <input type="url" id="imagem_url" placeholder="URL da Imagem" value="${filme ? filme.imagem_url : ""}" required>

        <button type="submit">${filme ? "Salvar Alterações" : "Adicionar Filme"}</button>
        <button type="button" id="cancelar">Cancelar</button>
      </form>
    </div>
  `;

  // Botões de navegação
  document.getElementById("voltar").addEventListener("click", () => navegarPara("home"));
  document.getElementById("cancelar").addEventListener("click", () => navegarPara("home"));

  // Envio do formulário
  document.getElementById("filmeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoFilme = {
      titulo: document.getElementById("titulo").value,
      diretor: document.getElementById("diretor").value,
      genero: document.getElementById("genero").value,
      ano: parseInt(document.getElementById("ano").value),
      sinopse: document.getElementById("sinopse").value,
      imagem_url: document.getElementById("imagem_url").value
    };

    try {
      const url = filme
        ? `https://seu-backend.onrender.com/filmes/${filme.id}`
        : `https://seu-backend.onrender.com/filmes`;

      const metodo = filme ? "PUT" : "POST";

      await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFilme)
      });

      alert(filme ? "Filme atualizado com sucesso!" : "Filme adicionado com sucesso!");
      navegarPara("home");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o filme.");
    }
  });
}
