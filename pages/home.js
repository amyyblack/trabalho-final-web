import { FilmeCard } from '../components/filmeCard.js';
import { API_URL } from '/main.js';

export async function Home(container) {
  container.innerHTML = '<p>Carregando filmes...</p>';

  try {
    const res = await fetch(`${API_URL}/filmes`);
    const filmes = await res.json();

    container.innerHTML = filmes.map(FilmeCard).join('');
  } catch (err) {
    container.innerHTML = '<p>Erro ao carregar filmes 😢</p>';
    console.error(err);
  }

  console.log('Filmes carregados:', filmes);
}
