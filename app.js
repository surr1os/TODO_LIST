// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  if(!arrOfTasks){
    alert("Где массив задач")
  }
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task; // 
    return acc;
    
  }, {});
 

  // Elemnts UI
  
  const sortObj = Object.values(objOfTasks).sort((prevTask, nextTask) => nextTask.completed - (prevTask.completed) )
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  
  const inputBody = form.elements['body'];
  const checkTasks = document.querySelector('.tasks-list-section .container') // фильтер
  console.log(checkTasks)
  

  // Events
  renderAllTasks(Object.values(objOfTasks).sort((prevTask, nextTask) => nextTask.completed - (prevTask.completed) ));
  console.log(sortObj)
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeletehandler);
  listContainer.addEventListener('click', onCheckHandler);
  checkTasks.addEventListener('click', checkCompleted)
  checkTasks.addEventListener('click', allTasks)
  console.log(listContainer)
  
    



  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }
    
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      
      fragment.appendChild(li);
    })
    console.log(tasksList)
    
    listContainer.appendChild(fragment);
    
  }
    
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';
    
    

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Completed';
    completeBtn.classList.add('check-btn');

    

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

      
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(completeBtn);
    
    
    

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
    
    
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;
    
   console.log(newTask)
   console.log(sortObj)
    return { ...newTask };
    
    
  }
  
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    
    return isConfirm;
  }
  

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeletehandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      if(listContainer.getElementsByTagName('li').length == 0){
      alert("Все задачи удалены")
  }
      
    }
  }
  function checkTaskHTML(confirmed, task){
    let currentTask = Object.values(objOfTasks).find(el => el._id == task.dataset.taskId.toString().trim());
    if(!confirmed){
      task.style.backgroundColor = "#71c265" // completed  task
          currentTask.completed = true;
        
    }if(confirmed){
      task.style.backgroundColor = "#afb5ae" // non-completed task
      currentTask.completed = false
    }
   
  }

  function checkTask(id){
    const { completed } = objOfTasks[id];
    
    return completed
  }

  function onCheckHandler({target}){
    if (target.classList.contains('check-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = checkTask(id);
      checkTaskHTML(confirmed, parent);
    
      
    }
  }
  function addFilterButtons(){
    const allBtn = document.createElement('button')
    allBtn.textContent = "Все задачи";
    allBtn.classList.add('all-tasks', 'ml-auto')
    
    const notAllBtn = document.createElement('button')
    notAllBtn.textContent = "Не Завершенные задачи";
    notAllBtn.classList.add('completed-tasks', 'ml-auto')
    checkTasks.insertAdjacentElement('afterbegin', allBtn)
    checkTasks.insertAdjacentElement('afterbegin',notAllBtn )
  }
  addFilterButtons()

 
    function checkCompleted ({target})
        {
          if (target.classList.contains('completed-tasks')){
            let newArr = []
            
            document.querySelectorAll('.list-group-item').forEach(lgi =>
            {
                let currentTask = Object.values(objOfTasks).find(v => v._id == lgi.dataset.taskId.toString().trim());
                if (!currentTask?.completed)
                {
                  newArr.push(lgi);
                }
                listContainer.innerHTML = ""
                newArr.forEach(el => listContainer.appendChild(el))
                
            });
            
          }
          
        }
        function allTasks({target}){
          if (target.classList.contains('all-tasks')){
              listContainer.innerHTML = ""
              renderAllTasks(Object.values(objOfTasks).sort((prevTask, nextTask) => nextTask.completed - (prevTask.completed) ))
            console.log(sortObj)
            console.log(objOfTasks)
              }
          }
        
            
})(tasks);
