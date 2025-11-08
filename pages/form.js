import { API_URL } from '/main.js';
export async function FormFilme(container, id = null) {
  let filme = { titulo: '', ano: '', diretor: '', genero: '', imagem: '' };

  if (id) {
    const res = await fetch(`${API_URL}/filmes/${id}`);
    filme = await res.json();
  }

  container.innerHTML = `
    <form id="filmeForm">
      <label>Título:</label>
      <input name="titulo" value="${filme.titulo}" required>
      
      <label>Ano:</label>
      <input name="ano" value="${filme.ano}" required>
      
      <label>Diretor:</label>
      <input name="diretor" value="${filme.diretor}" required>
      
      <label>Gênero:</label>
      <input name="genero" value="${filme.genero}" required>
      
      <label>Imagem (URL):</label>
      <input name="imagem" value="${filme.imagem}" required>

      <button type="submit">${id ? 'Salvar alterações' : 'Adicionar Filme'}</button>
    </form>
  `;

  document.querySelector('#filmeForm').onsubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    const method = id ? 'PUT' : 'POST';
    const url = `${API_URL}/filmes${id ? `/${id}` : ''}`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    window.location.hash = '#home';
  };
}
