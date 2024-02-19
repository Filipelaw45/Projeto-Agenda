const btnLogout = document.getElementById('btn-logout')
const token = localStorage.getItem('token')
const authorize = async () => {

  try {
    const response = await fetch('http://127.0.0.1:3300/contact', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
}
authorize()

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
btnLogout.addEventListener('click', logout)

const listaNum = document.getElementById('listaNum')
const listaNumeros = async () => {

  listaNum.innerText = ''
  try {
    const response = await fetch('http://127.0.0.1:3300/contact', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });

    if (response) {
      const contatos = await response.json()

      contatos.forEach(e => {

        const numItem = `
        <div class="info-item">
          <h4>Nome: ${e.contactName}</h4>
          <h4>Telefone: ${e.phoneNumber}</h4>
        </div>
        <div class="icon-item">
          <i class="ri-edit-line icon btn-edit" title="Editar"></i>
          <i contactId="${e.contactID}" class="ri-delete-bin-5-line icon btn-delete" title="Deletar"></i>
        </div>
      `
        const div = document.createElement('div');
        div.classList.add('numero-item')
        div.innerHTML = numItem;
        listaNum.appendChild(div);
      });
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
}
listaNumeros()

const contactForm = document.getElementById('contact-form')
const createName = document.getElementById('create-name')
const createNumber = document.getElementById('create-number')

const create = async (e) => {
  e.preventDefault();
  const contact = {
    name: createName.value,
    phoneNumber: createNumber.value
  }
  try {
    const response = await fetch('http://127.0.0.1:3300/contact', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(contact)
    });

    if (response.ok) {
      const testing = await response.json()
    } else {
      const testing = await response.json()
    }

    createName.value = ''
    createNumber.value = ''
    listaNumeros()

  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }

}
contactForm.addEventListener('submit', create)

function convertHTMLCollectionToArray(htmlCollection) {
  return Array.from(htmlCollection);
}

function handleMutation(mutationsList, observer) {
  const deleteButtons = document.getElementsByClassName('btn-delete');
  const arrayDeleteButtons = convertHTMLCollectionToArray(deleteButtons);

  arrayDeleteButtons.forEach(e => {
    e.addEventListener('click', () => {
      const contactId = e.getAttribute('contactId')
      deleteContact(contactId)
    })
  });
}

const observer = new MutationObserver(handleMutation);

const config = { childList: true, subtree: true };
observer.observe(document.body, config);

const deleteContact = async (contactId) => {
  const confirmar = confirm("Deseja realmente excluir esse contato?")

  if (confirmar) {
    try {
      const response = await fetch(`http://localhost:3300/contact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error.message);
    }
  }

  listaNumeros()
}