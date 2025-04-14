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
    <input type="text" id="link" value="https://evento.com?ref=${
        userData.ref
    }" disabled>

    <div id="stats">
        <h4>${getTotalSubscribers(userData)}</h4>
        <p>Inscrições feitas</p>
    </div>`;
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
    <form id="form">
        <input type="email" name="email" placeholder="Email">
        <input type="tel" name="telefone" placeholder="Telefone">
        <button>Confirmar</button>
    </form>
    `;

    app.innerHTML = content;

    formAction();
};

startApp();

document.getElementById("logo").onclick = () => startApp();
