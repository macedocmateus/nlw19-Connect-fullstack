const app = document.getElementById("app");

const users = [
    {
        email: "paula@email.com",
        phone: "99999999999",
        ref: 100,
        refBy: null,
    },

    {
        email: "ana@email.com",
        phone: "99999999999",
        ref: 200,
        refBy: 100,
    },

    {
        email: "gabi@email.com",
        phone: "99999999999",
        ref: 300,
        refBy: 200,
    },
];

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email;
    });
};

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref;
    });

    return subs.length;
};

const showInvite = (userData) => {
    app.innerHTML = `
            <main>
                <h3>Inscrição confirmada</h3>

                <p>Convide mais pessoas e concorra a prêmios! <br /> Compartilhe o link e acompanhe as inscrições:
                </p>

                <div class="input-group">
                    <label for="link">
                        <img src="./assets/link.svg" alt="Ícone de link">
                    </label>
                    <input type="text" id="link" value="https://evento.com?ref=${
                        userData.ref
                    }" disabled>
                </div>
            </main>

            <section class="stats">
                <h4>
                    ${getTotalSubscribers(userData)}
                </h4>
                <p>Inscrições feitas</p>
            </section>`;
};

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100,
    };

    users.push(newUser);
    console.log(users);
    return newUser;
};

const formAction = () => {
    const form = document.getElementById("form");

    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get("email"),
            telefone: formData.get("telefone"),
        };

        const user = getUser(userData);

        if (user) {
            showInvite(user);
        } else {
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    };
};

const startApp = () => {
    const content = `
    <main>
                <section class="about">
                    <div class="section-header">
                        <h2>
                            Sobre o Evento
                        </h2>
                        <span class="badge">AO VIVO</span>
                    </div>

                    <p>Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e
                        compartilhar
                        conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software,
                        arquitetura de sistemas e
                        tecnologias emergentes, com palestras, workshops e hackathons.
                        <br /><br />
                        Dias 15 a 17 de março | Das 18h às 21h | Online &amp; Gratuito
                    </p>
                </section>

                <section class="registration">
                    <h2>Inscrição</h2>

                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="./assets/mail.svg" alt="Ícone de email">
                                </label>
                                <input type="email" id="email" name="email" placeholder="E-mail">
                            </div>

                            <div class="input-group">
                                <label for="phone">
                                    <img src="./assets/phone.svg" alt="Ícone de telefone">
                                </label>
                                <input type="tel" id="phone" name="phone" placeholder="Telefone">
                            </div>
                        </div>

                        <button>
                            Confirmar
                            <img src="./assets/arrow-right.svg" alt="Ícone de seta apontando para direita">
                        </button>
                    </form>
                </section>
            </main>
    `;

    app.innerHTML = content;

    formAction();
};

startApp();

document.getElementById("logo").onclick = () => startApp();
