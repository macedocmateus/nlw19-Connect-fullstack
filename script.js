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
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0571 5.72387C15.5778 5.20317 16.422 5.20317 16.9427 5.72387L26.2761 15.0572C26.7968 15.5779 26.7968 16.4221 26.2761 16.9428L16.9427 26.2762C16.422 26.7969 15.5778 26.7969 15.0571 26.2762C14.5364 25.7555 14.5364 24.9112 15.0571 24.3905L22.1143 17.3333H6.66659C5.93021 17.3333 5.33325 16.7364 5.33325 16C5.33325 15.2636 5.93021 14.6667 6.66659 14.6667H22.1143L15.0571 7.60949C14.5364 7.08879 14.5364 6.24457 15.0571 5.72387Z" fill="#6F9DE2"/>
                            </svg>
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
