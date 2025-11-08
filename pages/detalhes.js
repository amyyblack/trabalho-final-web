import { API_URL } from '../main.js';

export async function Detalhes(container, id) {
  container.innerHTML = '<p>Carregando detalhes...</p>';

  try {
    const res = await fetch(`${API_URL}/filmes/${id}`);
    if (!res.ok) throw new Error('Filme não encontrado');
    const filme = await res.json();

    container.innerHTML = `
      <div class="detalhes">
        <img 
          src="${filme.imagem_url}" 
          alt="${filme.titulo}"
          onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Imagem'"
          style="max-width:300px;border-radius:8px;display:block;margin:0 auto;"
        >
        <h2>${filme.titulo}</h2>
        <p><b>Ano:</b> ${filme.ano}</p>
        <p><b>Diretor:</b> ${filme.diretor}</p>
        <p><b>Gênero:</b> ${filme.genero}</p>
        <p><b>Avaliação:</b> ⭐ ${filme.avaliacao}</p>
        <p style="margin-top:1rem;">${filme.sinopse}</p>

        <div style="margin-top:1.5rem;">
          <button onclick="window.location.hash='#editar/${filme.id}'">Editar</button>
          <button onclick="removerFilme(${filme.id})">Excluir</button>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p>Erro ao carregar o filme.</p>';
  }
}

window.removerFilme = async (id) => {
  if (confirm('Deseja mesmo excluir este filme?')) {
    await fetch(`${API_URL}/filmes/${id}`, { method: 'DELETE' });
    window.location.hash = '#home';
  }
};
