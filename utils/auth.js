export async function pedirCredenciais() {
  return new Promise((resolve) => {
    const senha = prompt("Digite a senha de administrador:");

    if (!senha) return resolve(null);

    resolve({
      adminId: "admin",       // <- pode trocar
      adminPass: senha
    });
  });
}
