import { navegarPara } from "../main.js";
import { pedirCredenciais } from "../utils/auth.js";

export function renderForm(filme = null) {
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = `
    <div class="form-container">
      <button id="voltar" style="margin-bottom: 15px;">← Voltar</button>
      <h2>${filme ? "Editar Filme" : "Novo Filme"}</h2>

      <form id="filmeForm">
        <input type="text" id="titulo" placeholder="Título" value="${filme?.titulo ?? ""}" required>
        <input type="text" id="diretor" placeholder="Diretor" value="${filme?.diretor ?? ""}" required>
        <input type="text" id="genero" placeholder="Gênero" value="${filme?.genero ?? ""}" required>
        <input type="number" id="ano" placeholder="Ano" value="${filme?.ano ?? ""}" required>
        <textarea id="sinopse" placeholder="Sinopse" required>${filme?.sinopse ?? ""}</textarea>
        <input type="url" id="imagem_url" placeholder="URL da Imagem" value="${filme?.imagem_url ?? ""}" required>

        <button type="submit">${filme ? "Salvar Alterações" : "Adicionar Filme"}</button>
        <button type="button" id="cancelar">Cancelar</button>
      </form>
    </div>
  `;

  document.getElementById("voltar").addEventListener("click", () => navegarPara("home"));
  document.getElementById("cancelar").addEventListener("click", () => navegarPara("home"));

  document.getElementById("filmeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoFilme = {
      titulo: titulo.value.trim(),
      diretor: diretor.value.trim(),
      genero: genero.value.trim(),
      ano: parseInt(ano.value),
      sinopse: sinopse.value.trim(),
      imagem_url: imagem_url.value.trim()
    };

    try {
      const url = filme
        ? `https://back-end-tf-web-kqse.onrender.com/filmes/${filme.id}`
        : `https://back-end-tf-web-kqse.onrender.com/filmes`;

      const metodo = filme ? "PUT" : "POST";

      // ===== AUTENTICAÇÃO =====
      const cred = await pedirCredenciais();
      if (!cred) {
        alert("Operação cancelada.");
        return;
      }

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          "X-Admin-ID": cred.adminId,
          "X-Admin-PASS": cred.adminPass
        },
        body: JSON.stringify(novoFilme)
      });

      if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({ erro: "Erro desconhecido" }));
        alert("Erro: " + erro.erro);
        return;
      }

      alert(filme ? "Filme atualizado!" : "Filme adicionado!");
      navegarPara("home");

    } catch (err) {
      console.error(err);
      alert("Erro ao enviar formulário.");
    }
  });
}
