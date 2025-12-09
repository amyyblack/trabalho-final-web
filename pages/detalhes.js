import { navegarPara } from "../main.js";
import { pedirCredenciais } from "../utils/auth.js";
import { renderForm } from "./form.js";

export async function renderDetalhes(id) {
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = `<p class="loading">Carregando...</p>`;

  try {
    const resposta = await fetch(`https://back-end-tf-web-kqse.onrender.com/filmes/${id}`);
    const filme = await resposta.json();

    conteudo.innerHTML = `
      <button id="voltar">← Voltar</button>

      <div class="detalhes-filme">
        <img src="${filme.imagem_url}" alt="${filme.titulo}">
        <h2>${filme.titulo}</h2>

        <p><strong>Diretor:</strong> ${filme.diretor}</p>
        <p><strong>Gênero:</strong> ${filme.genero}</p>
        <p><strong>Ano:</strong> ${filme.ano}</p>

        <p>${filme.sinopse}</p>

        <div style="margin-top:20px; display:flex; gap:10px;">
          <button id="editar">Editar</button>
          <button id="deletar" class="danger">Excluir</button>
        </div>
      </div>
    `;

    document.getElementById("voltar").onclick = () => navegarPara("home");

    // EDITAR
    document.getElementById("editar").onclick = () => {
      renderForm(filme);
    };

    // EXCLUIR
    document.getElementById("deletar").onclick = async () => {
      if (!confirm("Tem certeza que deseja excluir?")) return;

      // autenticação
      const cred = await pedirCredenciais();
      if (!cred) {
        alert("Operação cancelada.");
        return;
      }

      const resposta = await fetch(`https://back-end-tf-web-kqse.onrender.com/filmes/${id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-ID": cred.adminId,
          "X-Admin-PASS": cred.adminPass
        }
      });

      if (!resposta.ok) {
        const err = await resposta.json();
        alert("Erro: " + err.erro);
        return;
      }

      alert("Filme excluído!");
      navegarPara("home");
    };

  } catch (err) {
    conteudo.innerHTML = `<p>Erro ao carregar detalhes.</p>`;
  }
}
