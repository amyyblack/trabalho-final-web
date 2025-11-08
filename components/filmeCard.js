export function FilmeCard(filme) {
  return `
    <div class="filme-card" onclick="window.location.hash='#detalhes/${filme.id}'">
      <img src="${filme.imagem_url}" alt="${filme.titulo}">
      <h3>${filme.titulo}</h3>
      <p>${filme.ano} • ${filme.genero}</p>
      <small>⭐ ${filme.avaliacao}</small>
    </div>
  `;
}
