export function renderFooter() {
  const footer = document.getElementById("footer");
  footer.innerHTML = `
    <p>© ${new Date().getFullYear()} Catálogo de Filmes Brasileiros</p>
  `;
}
