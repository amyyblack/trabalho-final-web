import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderHome } from "./pages/home.js";
import { renderDetalhes } from "./pages/detalhes.js";
import { renderForm } from "./pages/form.js";

export const API_URL = "https://back-end-tf-web-kqse.onrender.com";

export function navegarPara(pagina, id = null) {
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = "";

  if (pagina === "home") {
    renderHome();
  } else if (pagina === "detalhes" && id) {
    renderDetalhes(id);
  } else if (pagina === "form") {
    renderForm(id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  navegarPara("home");
});
