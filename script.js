const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');




// My work below

list.addEventListener('change', countHandler);

list.addEventListener('click', deleteHandler);

let todos = [
  {
    id: 1,
    content: "Walk the dog1",
    checked: false
  },
  {
    id: 2,
    content: "Walk the dog2",
    checked: false
  },
  {
    id: 3,
    content: "Walk the dog3",
    checked: true
  },
  {
    id: 4,
    content: "Walk the dog4",
    checked: false
  },
];


function newTodo() {
  //alert('New TODO button clicked!');
  var myPrompt = prompt("Please enter your todo");
  let currId = todos.length ? todos[todos.length-1].id : 0;

  if (myPrompt !== "") {
    
    let newTodoItem = {
      id: ++currId,
      content: myPrompt,
      checked: false
    }

    todos.push(newTodoItem);
    //console.log(todos);

    let listItem = document.createElement("li");
    listItem.className = 'todo-item';
    listItem.innerHTML = `<input type="checkbox" id="checkBox${newTodoItem.id}" class="${classNames.TODO_CHECKBOX}"/>${newTodoItem.content}</span><button class="${classNames.TODO_DELETE}" id="delBtn${newTodoItem.id}">Delete</button>`;
    
    list.appendChild(listItem);

    itemCountSpan.innerHTML = todos.length;
    uncheckedCountSpan.innerHTML = +uncheckedCountSpan.innerHTML + 1;
  }
}


function deleteHandler(e){
 
  let deleBtnId = e.target.id.split("")[e.target.id.length -1];
  
  if(e.target.className === classNames.TODO_DELETE){
    
    e.target.parentElement.remove();
    todos.forEach((todo, index) => {
      if(todo.id == deleBtnId){
       // console.log("delebtn ID: ", deleBtnId);
        todos.splice(index, 1);
        if(!todo.checked){
          uncheckedCountSpan.innerHTML -= 1;
        }
      }
    })
  }


  itemCountSpan.innerHTML = todos.length;
 
}


function countHandler(e){
  
    if(e.target.className === "todo-checkbox"){

      let checkboxId = e.target.id;
     
      if(e.target.checked){      
        uncheckedCountSpan.innerHTML = +uncheckedCountSpan.innerHTML - 1;

      }else{
        uncheckedCountSpan.innerHTML = +uncheckedCountSpan.innerHTML + 1;
      }

     // console.log(checkboxId);
      todos.forEach(todo => {
        if(todo.id == checkboxId.split("")[checkboxId.length-1]){
          //console.log("in if")
          todo.checked = !todo.checked;
        }
        
      })
      
    }
   // console.log(todos);
    // e.preventDefault()

}


(function todoInit(){
  
  let unchecked = 0;

  todos.forEach( todo => {
    unchecked = todo.checked === true ? unchecked : unchecked+1 ;
    let listItem = document.createElement("li");
    listItem.className = 'todo-item';
    listItem.innerHTML = `<input type="checkbox" class=${classNames.TODO_CHECKBOX} id="checkBox${todo.id}"/>${todo.content}</span> <button class="${classNames.TODO_DELETE}" id="delBtn${todo.id}">Delete</button>`;
    listItem.firstChild.checked = todo.checked ? true : false;
    
    list.appendChild(listItem);
  })
  itemCountSpan.innerHTML = todos.length;
  uncheckedCountSpan.innerHTML = unchecked;
})()
