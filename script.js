// Script do login.

function entrando(){
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    if (usuario == "admin" && senha == "admin123"){
        alert("Logado no sistema com sucesso!!");
        window.location.href = "crud.html";
    }

    else{
        alert("Usuário ou senha incorretos!!");
    }
}

// Essa parte resolveu o problema de não ir para páginda sem bug
document.querySelector("form")
.addEventListener("submit", (e) =>{
    console.log("enviando formulário");

    // resolveu o problema.
    e.preventDefault();
})


// Script da página do CRUD.

// Abrir a janela do registro e a outra para abrir a janela de edição.
const openJanela = () => document.getElementById('janela').classList.add('active');
const openJanela2 = () => document.getElementById('janela2').classList.add('active');

// Fechar as janelas de registro e edição.
const closeJanela2 = () =>{
    document.getElementById('janela2').classList.remove('active');
}

const closeJanela = () =>{
    limparCampos();
    document.getElementById('janela').classList.remove('active');
}

// Banco de dados local.
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_aluno')) ?? [];
const setLocalStorage = (dbAluno) => localStorage.setItem("db_aluno", JSON.stringify(dbAluno));


// Crud em si, Create, Update, Read e Delete.
const criarAluno = (aluno) => {
    const dbAluno = getLocalStorage();
    dbAluno.push (aluno);
    setLocalStorage(dbAluno);
}

// Atualizar a matricula do Aluno.
const atualizarAluno = (crud, aluno) =>{
    const dbAluno = readAluno();
    dbAluno[crud] = aluno;
    setLocalStorage(dbAluno);

}

const readAluno = () => getLocalStorage();

// Deletar a matricula do Aluno.
const deletarAluno = (crud) => {
    const dbAluno = readAluno();
    dbAluno.splice(crud, 1);
    setLocalStorage(dbAluno);
}

// Invalidando campos vázios do input.
const validarcampos = () =>{
    return document.getElementById('form').reportValidity();
}

// Interação.
const limparCampos = () => {
    const fields = document.querySelectorAll('.janela-campo')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.crud = 'new'
}
// parei a correção aqui matheus do futuro
const salvarAluno = () => {
    debugger
    if (validarcampos()){
        const aluno = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            curso: document.getElementById('curso').value
        }
        const crud = document.getElementById('nome').dataset.crud
        if(crud == 'new'){
            criarAluno(aluno);
            atualizarTabela();
            closeJanela();
        }
        
        else{
            atualizarAluno(crud, aluno);
            atualizarTabela();
            closeJanela();
        }
    }
}

const criarRow = (aluno, crud) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.cpf}</td>
        <td>${aluno.curso}</td>
        <td>
            <button type="button" class="deletenew" id="edit-${crud}">Editar</button>
            <button type="button" class="editnew" id="delete-${crud}" >Excluir</button>
        </td>
    `
    document.querySelector('#tabelaAlunos>tbody').appendChild(newRow);
}

const limparTabela = () =>{
    const rows = document.querySelectorAll('#tabelaAlunos>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const atualizarTabela = () =>{
    const dbAluno = readAluno();
    limparTabela();
    dbAluno.forEach(criarRow);
}

const preencherTabela = (aluno) =>{
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('email').value = aluno.value;
    document.getElementById('cpf').value = aluno.cpf;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('nome').dataset.crud = aluno.crud;
}

const modificarAluno = (crud) =>{
    const aluno = readAluno()[crud];
    aluno.crud = crud;
    preencherTabela(aluno);
    openJanela();
} 

const editDelete = (event) =>{
    if(event.target.type == 'button'){

        const [action, crud] = event.target.id.split('-');

        if(action == 'edit'){
            modificarAluno(crud);
        } 
        
        else{
            const aluno = readAluno()[crud];
            let avisoDelete = document.querySelector('#avisoDelete');

            avisoDelete.textContent = `Gostaria de excluir o aluno? ${aluno.nome}`
            openJanela2();

            // Apagar os dados:
            document.getElementById('apagar').addEventListener('click', ()=>{
                deletarAluno(crud);
                atualizarTabela();
                closeJanela2();
            })
        }
    }
}


atualizarTabela();

// Listagem dos eventos.

document.getElementById('cadastrarAluno')
    .addEventListener('click', openJanela)

// Janela1 fechar.
document.getElementById('JanelaClose')
    .addEventListener('click', closeJanela)

// Janela2 fechar.

document.getElementById('JanelaClose2')
    .addEventListener('click', closeJanela2)

// Botão Salvar
document.getElementById('salvar')
    .addEventListener('click', salvarAluno)

//Tabela pra editar
document.querySelector('#tabelaAlunos>tbody')
    .addEventListener('click', editDelete)


// Cancelar = fechar
document.getElementById('cancelar')
    .addEventListener('click', closeJanela)

// Cancelar2 = fechar.

document.getElementById('cancelar2')
    .addEventListener('click', closeJanela2)



// Script do FireBase.
/*const firebaseConfig = {
    apiKey: "AIzaSyBeEDqnk62RT6R2uEMUV8CtNKWjasU5cZM",
    authDomain: "crud---web---senai.firebaseapp.com",
    databaseURL: "https://crud---web---senai-default-rtdb.firebaseio.com",
    projectId: "crud---web---senai",
    storageBucket: "crud---web---senai.appspot.com",
    messagingSenderId: "708950803579",
    appId: "1:708950803579:web:e60a9c5b3e882c0e0e4ede",
    measurementId: "G-43MD3CYH33"
  };
*/
