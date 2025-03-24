const localStorageKey = 'tasks'


let editing = false;
let editItemArray = null;

// Tarefa MODEL - MODEL

// id number
// description String
// status String - pending, done

// Dont Repeat Yourself

function saveTask() {
    let input = document.getElementById('input-new-task')
        input.style.border = ''

    //validação
    if(!input.value) {
        input.style.border = '1px solid red'
        alert('Digite uma tarefa')
        return; // Para a execucão da funcao
    }
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")


    // Salva tarefa existente
    if (editing) {

        // editar item com nova descricao
        editItemArray.description = input.value


        const mapTmp = values.map((item) => {
            return item.id == editItemArray.id ? editItemArray : item
        })


        // filtrar para excluir item antigo
        // const tmp = values.filter((item) => {
        //     return item.id != editItemArray.id
        // })
        //
        // // adicionar item editado
        // tmp.push(editItemArray)


        // Salvar no banco
        localStorage.setItem(localStorageKey, JSON.stringify(mapTmp))


        // atualizar dados na tela
        showValues()

        // limpar o campo
        input.value = ''


        // alterar label do botao
        const textBtn = document.getElementsByClassName('add-text')[0]
        textBtn.innerHTML = 'Adicionar'

        editing = false;
        return;
    }


    // Salva nova tarefa
    values.push({
        id: new Date().getTime(),
        description: input.value,
        status: 'pending',
    })

    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()

  input.value = ''
}

function showValues(){
    let array = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
        list.innerHTML += `<li>${array[i]['description']}
            <button id='btn-ok' onclick='removeItem("${array[i]['description']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
             </svg>
            </button>
            <button onclick=editItem("${array[i]['id']}") class="edit-button">
                Edit
            </button>
          </li>`
    }
}

function editItem(id) {

    // buscar item no array
    editing = true;
    let array = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    const find = array.find((item) => {
        return item.id == id;
    })
    editItemArray = find;

    // alterar label do botao
    const textBtn = document.getElementsByClassName('add-text')[0]
    textBtn.innerHTML = 'Salvar'

    // adicionar novo item ao texto do input
    let input = document.getElementById('input-new-task')
    input.value = find.description
}

function removeItem(data){

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()