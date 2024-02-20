const btnLogout = document.getElementById('btn-logout')
const token = localStorage.getItem('token')

const listaNum = document.getElementById('listaNum')

const contactForm = document.getElementById('contact-form')
const createName = document.getElementById('create-name')
const createNumber = document.getElementById('create-number')

const modal = document.querySelector('dialog')
const closeModal = document.getElementById('close-modal')

const contactNameModal = document.getElementById('contact-name')
const contactNumberModal = document.getElementById('contact-number')
const updateButtonModal = document.getElementById('confirm-modal')

const authorize = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3300/contact', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) window.location.href = 'index.html';
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
}

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

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

      contatos.forEach((e, i) => {

        const numItem = `
        <div class="info-item">
          <h4>Nome: <span class="spanName">${e.contactName}</span></h4>
          <h4>Telefone: <span class="spanNumber">${e.phoneNumber}</span></h4>
        </div>
        <div class="icon-item">
          <i index=${i} contactId="${e.contactID}" class="ri-edit-line icon btn-edit" title="Editar"></i>
          <i index=${i} contactId="${e.contactID}" class="ri-delete-bin-5-line icon btn-delete" title="Deletar"></i>
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

    if (!response.ok) {
      const res = await response.json()
      alert(res.error)
    }

    createName.value = ''
    createNumber.value = ''

    listaNumeros()

  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
}

const convertHTMLCollectionToArray = (htmlCollection)=> Array.from(htmlCollection);

const handleMutation = ()=> {
  const deleteButtons = document.getElementsByClassName('btn-delete');
  const arrayDeleteButtons = convertHTMLCollectionToArray(deleteButtons);

  const editButton = document.getElementsByClassName('btn-edit')
  const arrayEditButtons = convertHTMLCollectionToArray(editButton);

  const contactName = document.getElementsByClassName('spanName');
  const arrayContactName = convertHTMLCollectionToArray(contactName);

  const contactNumber = document.getElementsByClassName('spanNumber');
  const arrayContactNumber = convertHTMLCollectionToArray(contactNumber);

  arrayEditButtons.forEach(e => {
    e.addEventListener('click', () => {
      const contactId = e.getAttribute('contactId');
      modal.setAttribute('contactId', contactId);
      contactNameModal.value = arrayContactName[e.getAttribute('index')].textContent
      contactNumberModal.value = arrayContactNumber[e.getAttribute('index')].textContent
      modal.showModal();
    });
  });

  arrayDeleteButtons.forEach(e => {
    e.addEventListener('click', () => {
      const contactId = e.getAttribute('contactId')
      deleteContact(contactId)
    })
  });
}

const deleteContact = async (contactId) => {
  const accept = confirm("Deseja realmente excluir esse contato?")

  if (accept) {
    try {
      const res = await fetch(`http://localhost:3300/contact/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      if(!res){
        const response = await res.json()
        alert(response)
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error.message);
    }
  }

  listaNumeros()
}

const editContact = async (contactId) => {
  try {

    const data = {
      contactName: contactNameModal.value,
      phoneNumber: contactNumberModal.value
    }

    const res = await fetch(`http://localhost:3300/contact/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const response = await res.json()
      alert(response)
    }
  } catch (error) {
    console.error('Erro ao excluir contato:', error.message);
  }

  listaNumeros()
}

const observer = new MutationObserver(handleMutation);
const config = { childList: true, subtree: true };
observer.observe(document.body, config);

authorize()
listaNumeros()

btnLogout.addEventListener('click', logout)
contactForm.addEventListener('submit', create)

updateButtonModal.addEventListener('click',()=>{
  const contactId = modal.getAttribute('contactId')
  editContact(contactId)
  modal.close()
})

closeModal.onclick = () => {
  modal.close()
  modal.removeAttribute('contactId')
}
