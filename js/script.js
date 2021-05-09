'use strict';
const todoControl = document.querySelector('.todo-control'),
   headerInput = document.querySelector('.header-input'),
   todoList = document.querySelector('.todo-list'),
   todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) :
   {
      value: [],
      complete: []
   };

const addToSorage = function () {
   localStorage.setItem('todo', JSON.stringify(todoData));
   console.log(todoData);
};

const render = function () {
   todoList.textContent = '';
   todoCompleted.textContent = '';
   todoData.forEach(function (item) {
      // console.log(item);
      const li = document.createElement('li');

      li.classList.add('todo-item');

      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
         '<div class="todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
         '</div>';

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      const btnTodoCompleted = li.querySelector('.todo-complete');
      btnTodoCompleted.addEventListener('click', function () {
         item.completed = !item.completed;
         render();
         addToSorage();
      });

      const btnTodoRemove = li.querySelector('.todo-remove');
      console.log(btnTodoRemove);
      btnTodoRemove.addEventListener('click', function (i) {
         todoData.splice(i, 1);
         render();
         addToSorage();
      });
   });

};

todoControl.addEventListener('submit', function (event) {
   event.preventDefault();

   const newTodo = {
      value: headerInput.value,
      completed: false
   };

   // const input = document.querySelector('.header-input').value;
   // if (input === '') {
   //    return false;
   // } else {
   //    todoData.push(newTodo);
   // }

   if (val()) {
      todoData.push(newTodo);
   }

   document.querySelector('.header-input').value = '';

   render();
   addToSorage();
});
let val = function () {
   const input = document.querySelector('.header-input').value;
   if (input === '') {
      return false;
   } else {
      return true;
   }
};



addToSorage();
render();