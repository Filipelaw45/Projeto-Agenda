const formCadastro = document.getElementById('cadastro-form');
const usernameCadastro = document.getElementById('cadastro-usuario');
const passwordCadastro = document.getElementById('cadastro-senha');

const formLogin = document.getElementById('login-form');
const usernameLogin = document.getElementById('login-usuario');
const passwordLogin = document.getElementById('login-senha');

const cadastro = async (e) => {
    e.preventDefault();
    const user = {
        username: usernameCadastro.value,
        password: passwordCadastro.value
    }
    console.log(JSON.stringify(user));
    try {
        const response = await fetch('http://127.0.0.1:3300/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const res = await response.json()
            alert(res.message);
        } else {
            alert('Usuário criado com sucesso!');
        }

        usernameCadastro.value = ''
        passwordCadastro.value = ''

    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}

const login = async (e) => {
    e.preventDefault();
    const user = {
        username: usernameLogin.value,
        password: passwordLogin.value
    }
    console.log(JSON.stringify(user));
    try {
        const response = await fetch('http://127.0.0.1:3300/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const res = await response.json()
            localStorage.setItem('token', res.token);
            let item = localStorage.getItem('token');
            if (item) window.location.href = 'agenda.html';
        } else {
            const res = await response.json()
            alert(res.message);
        }

        usernameLogin.value = ''
        passwordLogin.value = ''
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}
formCadastro.addEventListener('submit', cadastro)
formLogin.addEventListener('submit', login)