const elForm = document.querySelector(".form");
const elInput = document.querySelector(".inputTodo");

const listTodoCompleted = document.querySelector(".listTodoCompleted");
const listUnTodoCompleted = document.querySelector(".listTodoUncompleted");
const theAllTodoCompleted = document.querySelector(".listTodoAll");

const listUnTodoCompletedBadge = document.querySelector("[uncomplate-Badge]");
const listTodoCompletedBadge = document.querySelector("[complate-Badge]");
const listAllBadge = document.querySelector("[all-Badge]");
const template = document.querySelector(".template").content;
const elFragment = new DocumentFragment();

//!  MALUMOTLARNI YIGISH UCHUN ARRAY OCHAMIZ   ************************
let uncomplete = [];
let complete = [];
let all = [];

//! INPUTDAN KELAYOTGAN MALUMOTLARNI OLISH UCHUN FORMGA HODISA QO'SHMOQDAMIZ
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  uncomplete.push({
    id: uncomplete.length + 1,
    title: elInput.value,
  });
  all = [...uncomplete, ...complete];
  renderAllTodos();
  elInput.value = "";
  listUnTodoCompletedBadge.textContent = uncomplete.length;
  renderUncomplete();
});

//! BU FUNCTION UNCOMPLETE GA MA'LUMOTLAARNI CHIQARIB TAXTLAB BERAD
function renderUncomplete() {
  listUnTodoCompleted.innerHTML = "";
  uncomplete.forEach((valu, index) => {
    const tempClone = template.cloneNode(true).children[0];
    tempClone.querySelector(".idisi").textContent = valu.id;
    tempClone.querySelector(".textTodo").textContent = valu.title;
    tempClone.querySelector(".check").addEventListener("click", () => {
      complete.push(uncomplete.splice(index, 1));
      listUnTodoCompletedBadge.textContent = uncomplete.length;
      renderCompleteds();
      renderUncomplete();
      listUnTodoCompletedBadge.textContent = uncomplete.length;
      listTodoCompletedBadge.textContent = complete.length;
    });
    tempClone.querySelector(".delete").addEventListener("click", () => {
      uncomplete.splice(index, 1);
      renderUncomplete();
      listUnTodoCompletedBadge.textContent = uncomplete.length;
      // listAllBadge.textContent = all.length;
    });

    elFragment.appendChild(tempClone);
  });
  listUnTodoCompleted.appendChild(elFragment);
}
//999999999999999999999999999999999999999999999999999999999999999999999999//

function renderCompleteds() {
  listTodoCompleted.innerHTML = "";
  let compTodos = complete.flat(Infinity);
  compTodos.forEach((val, index) => {
    const todoItem = template.cloneNode(true).children[0];
    todoItem.querySelector(".idisi").textContent = val.id;
    todoItem.querySelector(".textTodo").textContent = val.title;

    todoItem.querySelector(".delete").addEventListener("click", () => {
      complete.forEach((item, ind) => {
        if (ind === index) {
          complete.splice(ind, 1);
          renderCompleteds();
        }
      });
    });
    elFragment.append(todoItem);
  });

  listTodoCompleted.append(elFragment);
  listTodoCompletedBadge.textContent = complete.length;
  listTodoCompletedBadge.textContent = complete.length;
}
renderUncomplete();
//999999999999999999999999999999999999999999999999999999//

function renderAllTodos() {
  theAllTodoCompleted.innerHTML = "";
  all.forEach((value) => {
    const allItem = template.cloneNode(true).children[0];
    allItem.querySelector(".idisi").textContent = value.id;
    allItem.querySelector(".textTodo").textContent = value.title;
    allItem.querySelector(".delete").addEventListener("click", () => {
      all.forEach((item, ind) => {
        if (item === value) {
          all.splice(ind, 1);
          renderAllTodos();
        }
        uncomplete.splice(ind, 1);
        renderUncomplete();
      });
    });
    elFragment.append(allItem);
  });
  theAllTodoCompleted.append(elFragment);
  listUnTodoCompletedBadge.textContent = uncomplete.length;
  listAllBadge.textContent = all.length;
}
