let inputListagem = document.getElementById("input-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const btnAdd = document.getElementById("btn-add");
const nenhumItem = document.getElementById("nenhuma-tarefa");
const toastGlobalEl = document.getElementById("toast-global");
const toastGlobalCorpo = toastGlobalEl.querySelector(".toast-body");
const toastGlobal = new bootstrap.Toast(toastGlobalEl);

let listagem = carregar();

listarTarefas();

function removerItem(id) {
  listagem.splice(id, 1);
  listarTarefas();
  toastGlobalCorpo.innerText = "Tarefa removida sucesso!";
  toastGlobalEl.classList.remove("bg-danger");
  toastGlobalEl.classList.add("bg-success");
  toastGlobal.show();
}

function listarTarefas() {
  if (listagem.length > 0) {
    nenhumItem.classList.add("d-none");
    nenhumItem.classList.remove("animar-fade");
  } else {
    nenhumItem.classList.remove("d-none");
    nenhumItem.classList.add("animar-fade");
  }
  listaTarefas.innerHTML = "";
  for (let i = 0; i < listagem.length; i++) {
    const obj = listagem[i];
    listaTarefas.innerHTML += `
        <li class="list-group-item mt-3 d-flex justify-content-between animar-slide bloco-item">
                    <div class="form-check d-flex align-items-center">
                        <input class="form-check-input me-2" type="checkbox" value="" onchange="concluirTarefa(this)" />
                        <label class="form-check-label p-1 d-flex" for=""> <span class="tarefa-texto">${obj.nome}</span> </label>
                    </div>
                    <div class="">
                        <a href="javascript:removerItem(${i})"" class="btn">
                            <img src="img/lixeira.png" alt="Lixeira">
                        </a>
                    </div>
                </li>`;
  }
  armazenar();
}

btnAdd.addEventListener("click", () => {
  if (inputListagem.value != "") {
    const obj = {
      nome: inputListagem.value,
    };
    listagem.push(obj);
    inputListagem.value = "";
    listarTarefas();
    toastGlobalCorpo.innerText = "Tarefa adicionada com sucesso!";
    toastGlobalEl.classList.remove("bg-danger");
    toastGlobalEl.classList.add("bg-success");
    toastGlobal.show();
  } else {
    toastGlobalCorpo.innerText = "Por favor, insira uma tarefa!";
    toastGlobalEl.classList.remove("bg-success");
    toastGlobalEl.classList.add("bg-danger");
    toastGlobal.show();
  }
});

function concluirTarefa(checkbox) {
  checkbox.nextElementSibling.classList.toggle("marcado");
}

function armazenar() {
  localStorage.setItem("MEMORIA", JSON.stringify(listagem));
}

function carregar() {
  if (localStorage.getItem("MEMORIA")) {
    return JSON.parse(localStorage.getItem("MEMORIA"));
  } else {
    return [];
  }
}
