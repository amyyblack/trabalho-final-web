export function authPopup() {
    return new Promise((resolve, reject) => {
        const popup = document.createElement("div");
        popup.classList.add("auth-popup");

        popup.innerHTML = `
            <div class="auth-box">
                <h3>Autenticação Necessária</h3>
                <label>ID:</label>
                <input id="admin-id" type="text">

                <label>Senha:</label>
                <input id="admin-pass" type="password">

                <div class="buttons">
                    <button id="auth-confirm">Confirmar</button>
                    <button id="auth-cancel">Cancelar</button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        document.getElementById("auth-confirm").onclick = () => {
            const user = document.getElementById("admin-id").value;
            const pass = document.getElementById("admin-pass").value;

            popup.remove();
            resolve({ user, pass });
        };

        document.getElementById("auth-cancel").onclick = () => {
            popup.remove();
            reject("cancelado");
        };
    });
}
