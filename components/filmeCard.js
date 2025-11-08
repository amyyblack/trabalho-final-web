export function FilmeCard(filme) {
  return `
    <div class="filme-card" onclick="window.location.hash='#detalhes/${filme.id}'">
      <img 
        src="${filme.imagem_url}" 
        alt="${filme.titulo}" 
        onerror="this.src='https://via.placeholder.com/200x300?text=Sem+Imagem'"
      >
      <h3>${filme.titulo}</h3>
      <p>${filme.ano} • ${filme.genero}</p>
    </div>
  `;
}
