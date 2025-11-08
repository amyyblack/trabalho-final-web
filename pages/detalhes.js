import { API_URL } from '/main.js';

export async function Detalhes(container, id) {
  container.innerHTML = '<p>Carregando detalhes...</p>';
  
  try {
    const res = await fetch(`${API_URL}/filmes/${id}`);
    const filme = await res.json();

    container.innerHTML = `
      <div class="detalhes">
        <img src="${filme.imagem}" alt="${filme.titulo}">
        <h2>${filme.titulo}</h2>
        <p><b>Ano:</b> ${filme.ano}</p>
        <p><b>Diretor:</b> ${filme.diretor}</p>
        <p><b>Gênero:</b> ${filme.genero}</p>
        <button onclick="window.location.hash='#editar/${filme.id}'">Editar</button>
        <button onclick="removerFilme(${filme.id})">Excluir</button>
      </div>
    `;

  } catch (err) {
    container.innerHTML = '<p>Erro ao carregar o filme.</p>';
  }
}

window.removerFilme = async (id) => {
  if (confirm('Deseja mesmo excluir este filme?')) {
    await fetch(`${API_URL}/filmes/${id}`, { method: 'DELETE' });
    window.location.hash = '#home';
  }
};
