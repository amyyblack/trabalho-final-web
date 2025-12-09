export async function pedirCredenciais() {
  const senha = prompt("Digite a senha de administrador:");

  // Cancelar (clicou em cancelar) → retorna null
  if (senha === null) return null;

  // Se digitou só espaços, também considera vazio
  const limpa = senha.trim();
  if (!limpa) return null;

  return { adminId: "admin", adminPass: limpa };
}
