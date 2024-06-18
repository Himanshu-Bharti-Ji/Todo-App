document.addEventListener("DOMContentLoaded", function(){
    displayTodos();
});

function addTodo(){
    let todoInput = document.getElementById("todoInput");
    let todoText = todoInput.value.trim();

    if(todoText !== ""){
        let todos = getTodos();
        todos.push(todoText);

        localStorage.setItem("todos",JSON.stringify(todos));
        todoInput.value = "";
        displayTodos();
    }
}


function deleteAllTodo(){
    localStorage.removeItem("todos");
    displayTodos();
}

function editTodo(index){
    let todos = getTodos();
    let updatedTodo = prompt("Edit TODO : ",todos[index]);

    if (updatedTodo !== "" ){
        todos[index] = updatedTodo.trim();
        localStorage.setItem("todos",JSON.stringify(todos));
        displayTodos();
    } else{displayTodos();}
}

function deleteTodo(index){
    let todos = getTodos();
    todos.splice(index,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    displayTodos();
}

function displayTodos(){
   let todosContainer = document.getElementById("todo-container");
   todosContainer.innerHTML = "";

   let todos = getTodos();

   if (todos.length === 0){
    todosContainer.innerHTML = '<p>No todos yet!</p>';
   } else {
    todos.forEach((todo,index) => {
        let todoDiv = document.createElement("div");
        todoDiv.className = "listOfTodos";

        let todoText = document.createElement("span");
        todoText.textContent = todo;

        let buttonsDiv = document.createElement("div");

        let editButton = document.createElement("button");
        editButton.className = "btn edit";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTodo(index));
        

        let deleteButton = document.createElement("button");
        deleteButton.className = "btn del";
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener("click", () => deleteTodo(index));

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        todoDiv.appendChild(todoText);
        todoDiv.appendChild(buttonsDiv);

        // todoDiv.appendChild(editButton);
        // todoDiv.appendChild(deleteButton);

        todosContainer.appendChild(todoDiv);

    })
   }
}




function getTodos(){
    let todoString = localStorage.getItem("todos");

    if (todoString){
        return JSON.parse(todoString);
    }else{
        return [];
    }
}