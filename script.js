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
                    <input type="text" id="copy" value="https://evento.com?ref=${
                        userData.ref
                    }" disabled>
                    <button>
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Ícone de copiar">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33337 4.00001C4.60309 4.00001 4.00004 4.60306 4.00004 5.33334V18.6667C4.00004 19.397 4.60309 20 5.33337 20C6.06975 20 6.66671 20.597 6.66671 21.3333C6.66671 22.0697 6.06975 22.6667 5.33337 22.6667C3.13033 22.6667 1.33337 20.8697 1.33337 18.6667V5.33334C1.33337 3.1303 3.13033 1.33334 5.33337 1.33334H18.6667C20.8698 1.33334 22.6667 3.1303 22.6667 5.33334C22.6667 6.06972 22.0698 6.66668 21.3334 6.66668C20.597 6.66668 20 6.06972 20 5.33334C20 4.60306 19.397 4.00001 18.6667 4.00001H5.33337ZM13.3334 12C12.597 12 12 12.597 12 13.3333V26.6667C12 27.4031 12.597 28 13.3334 28H26.6667C27.4031 28 28 27.4031 28 26.6667V13.3333C28 12.597 27.4031 12 26.6667 12H13.3334ZM9.33337 13.3333C9.33337 11.1242 11.1242 9.33334 13.3334 9.33334H26.6667C28.8758 9.33334 30.6667 11.1242 30.6667 13.3333V26.6667C30.6667 28.8758 28.8758 30.6667 26.6667 30.6667H13.3334C11.1242 30.6667 9.33337 28.8758 9.33337 26.6667V13.3333Z" fill="#DAE4F2"/>
                        </svg>
                    </button>
                </div>
            </main>

            <section class="stats">
                <h4>
                    ${getTotalSubscribers(userData)}
                </h4>
                <p>Inscrições feitas</p>
            </section>`;

    app.setAttribute("class", "page-invite");

    document
        .querySelector(".input-group button")
        .addEventListener("click", function () {
            const copyValue = document.getElementById("copy").value;
            navigator.clipboard.writeText(copyValue);

            const button = this;
            const originalContent = button.innerHTML;

            button.innerHTML = "Copiado!";

            setTimeout(function () {
                button.innerHTML = originalContent;
            }, 1000);
        });
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
    app.setAttribute("class", "page-start");

    formAction();
};

startApp();

// showInvite({
//     email: "teste@email.com",
//     phone: "2222222",
//     ref: 100,
// });

document.getElementById("logo").onclick = () => startApp();
