const addTaskButton = document.getElementById('addTask');
const container = document.getElementById('container');

const highPriorityLi = document.querySelector('.priorityHigh li');
const mediumPriorityLi = document.querySelector('.priorityMedium li');
const lowPriorityLi = document.querySelector('.priorityLow li');

const tasks = [];

class CreateTask
{
    constructor(title, description, date, time, priority, dateOfCreation, timeOfCreation, done = false, active = false)
    {
        this.id = tasks.length + 1;
        this.title = title;
        this.description = description;
        this.date = date
        this.time = time;
        this.priority = priority;
        this.createdAtDate = new Date().toISOString().split('T')[0];
        this.createdAtTime = new Date().toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        });
        this.done = false;
        this.active = false;
    }
}

function popUpMenu(box, blured)
{

    box.classList.add('taskCreatorDiv', 'taskCreatorDivIn');

    //const blur = document.createElement('div');
    blured.classList.add('blur', 'blurInAnimation');

    //console.log('add');
    container.appendChild(blured)
    container.appendChild(box);

    container.classList.add('scaleAnimationIn');
}

function popOutMenu(box, blured)
{
    container.classList.remove('scaleAnimationIn');
    container.classList.add('scaleAnimationOut');
    setTimeout(() => {
        container.classList.remove('scaleAnimationOut');
        box.remove();
        blured.remove();
    }, 800)
}

function minimizeTask(Activity) {
    const taskContent = document.querySelector('.taskContent');
    taskContent.classList.add('taskDetailAnimationOut')

    setTimeout(() => {
        document.querySelector('.taskContent').remove();
    }, 600)
    Activity.active = false;
}

function deleteTask(taskObject) {

    minimizeTask(taskObject);

    const liToRemove = document.querySelector(`li[data-id="${taskObject.id}"]`);
    const parentUl = liToRemove.parentElement;
    if(liToRemove)
    {
            liToRemove.remove()

            if(parentUl.children.length === 0)
            {
                const wraper = parentUl.parentElement;
                        wraper.style.display = 'none';
                        console.log('done2')
            }
    }

    const indexToRemove = tasks.findIndex(t => t.id === taskObject.id);
    if(indexToRemove !== -1)
    {
        tasks.splice(indexToRemove, 1)
    }
}

function showTaskDetails() {

    let taskContentDiv = document.getElementById('taskContent');

    const template = document.getElementById('taskContentTemplate');
    const clone = template.content.cloneNode(true);

    const taskId = this.dataset.id; // ID jako string
    const task = tasks.find(t => t.id === Number(taskId)); // szukanie obiektu w tablicy

    clone.querySelector('h2').textContent = task.title;
    clone.querySelector('.longDescription').textContent = task.description;
    clone.querySelector('.dateTime').textContent = `Due to: ${task.date} ${task.time}`;
    clone.querySelector('.createdDateTime').textContent = `Created at: ${task.createdAtDate} ${task.createdAtTime}`;        

    if(task.active !== true)
    {
        container.appendChild(clone);
        taskContentDiv = document.getElementById('taskContent');
        taskContentDiv.classList.add('taskDetailAnimationIn');
        setTimeout(() => {
            taskContentDiv.classList.remove('taskDetailAnimationIn')
        }, 605)
    }
    task.active = true;

    const minimizeButton = document.querySelector('.minimizeTask')
    minimizeButton.addEventListener('click', () => minimizeTask(task))

    const deleteButton = document.querySelector('.deleteTask')
    deleteButton.addEventListener('click', () => deleteTask(task));
}

function addTask() 
{
    //dodawanie zadania
    const div = document.createElement('div');
    const blur = document.createElement('div');

    popUpMenu(div, blur); //funkcja animująca pojawienie się menu

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'X';
    cancelButton.classList.add('cancelButton');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Tytuł zadania';
    titleInput.classList.add('titleInput');

    const descriptionInput = document.createElement('textarea');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Opis zadania';
    descriptionInput.classList.add('descriptionInput');

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.min = new Date().toISOString().split('T')[0];
    dateInput.classList.add('dateInput');

    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.disabled = true;
    timeInput.classList.add('timeInput');

    const priorityInput = document.createElement('select');
    const priotities = ['Niski', 'Średni', 'Wysoki'];
    priorityInput.classList.add('priorityInput');
    priotities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        option.defaultSelected = priority === 'Niski'; // domyślnie niski priorytet
        priorityInput.appendChild(option);
    });

    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.justifyContent = 'left';
    inputContainer.style.width = '90%';
    //inputContainer.style.marginLeft = '4.5%';
    //inputContainer.style.marginTop = '1%';
    inputContainer.style.margin = '1% 0 5px 4.5%';
    inputContainer.style.gap = '10px';

    dateInput.addEventListener('change', () => {
        if(dateInput.value !== '')
        {
            timeInput.disabled = false;
            timeInput.defaultValue = '08:00'; //po wybraniu daty ustwa domyślną godzinę
        }
    })

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Dodaj zadanie';
    submitButton.disabled = true;
    submitButton.classList.add('submitButton');

    div.appendChild(titleInput);
    div.appendChild(cancelButton);
    div.appendChild(descriptionInput);
    div.appendChild(inputContainer);
    inputContainer.appendChild(dateInput);
    inputContainer.appendChild(timeInput);    
    inputContainer.appendChild(priorityInput);
    div.appendChild(submitButton);

    //zamykanie okna
    cancelButton.addEventListener('click', () => {
        console.log('canceled');
        container.classList.remove('scaleAnimationIn')
        container.classList.add('scaleAnimationOut')
        blur.classList.remove('blurInAnimation');
        blur.classList.add('blurOutAnimation')
        div.classList.remove('taskCreatorDivIn');
        div.classList.add('taskCreatorDivOut');
        setTimeout(() => {
            div.remove();
            blur.remove();
            container.classList.remove('scaleAnimationOut')
        }, 405);
    });


    //sprawdzanie czy inputy nie są puste
    validateForm = () => {
        if (titleInput.value && descriptionInput.value && dateInput.value && timeInput.value)
        {
            submitButton.disabled = false;
        }
        else
        {
            submitButton.disabled = true;
        }
    }
    titleInput.addEventListener('change',validateForm);
    descriptionInput.addEventListener('change',validateForm);
    dateInput.addEventListener('change',validateForm);
    timeInput.addEventListener('change',validateForm);

    //finalizowanie dodawania zadania
    submitButton.addEventListener('click', () => {
        //animacja dodawania i usuwanie okna
        div.classList.add('taskCreationDivAdded');
        blur.classList.add('blurOutAnimation')
        container.classList.remove('scaleAnimationIn');
        container.classList.add('scaleAnimationOut');
        console.log('added')
        setTimeout(() => {
            container.classList.remove('scaleAnimationOut');
            div.remove();
            blur.remove();
        }, 800);

        const NewTask = new CreateTask(
            titleInput.value,
            descriptionInput.value,
            dateInput.value,
            timeInput.value,
            priorityInput.value,
        )

        tasks.push(NewTask);

        //dodawanie taska do listy
        const tasklist = document.querySelector('.taskListContent ul');

        const li = document.createElement('li');
        li.style.visibility = 'hidden';

        const h2 = document.createElement('h2');
        h2.textContent = `${titleInput.value.slice(0, 50)}...`;

        const description = document.createElement('p');
        description.textContent = `${descriptionInput.value.slice(0, 80)}...`;

        const date = document.createElement('p');
        date.classList.add('dateTime');
        date.textContent = `Due to: ${dateInput.value} ${timeInput.value}`;

        if(priorityInput.value === 'Niski')
        {
            const liPriorityLow = document.getElementById('liPriorityLow');
            const priorityLow = document.getElementById('priorityLow');
            liPriorityLow.style.display = 'block';
            priorityLow.prepend(li);
            li.appendChild(h2);
            li.appendChild(description);
            li.appendChild(date);
            setTimeout(() => {
                li.style.visibility = 'visible';
                li.classList.add('slide-In');
            },800);
            setTimeout(() => {
                li.classList.remove('slide-In');
            }, 3000);
            
            li.dataset.id = NewTask.id; //dodawanie id do li
            li.addEventListener('click', showTaskDetails);
        }
        else if(priorityInput.value === 'Średni')
        {
            const liPriorityMedium = document.getElementById('liPriorityMedium');
            const priorityMedium = document.getElementById('priorityMedium');
            liPriorityMedium.style.display = 'block';
            priorityMedium.prepend(li);
            li.appendChild(h2);
            li.appendChild(description);
            li.appendChild(date);
            setTimeout(() => {
                li.style.visibility = 'visible';
                li.classList.add('slide-In');
            },800);
            setTimeout(() => {
                li.classList.remove('slide-In');
            }, 3000);

            li.dataset.id = NewTask.id; //dodawanie id do li
            li.addEventListener('click', showTaskDetails);
        }
        else if (priorityInput.value === 'Wysoki')
        {
            const liPriorityHigh = document.getElementById('liPriorityHigh');
            const priorityHigh = document.getElementById('priorityHigh');
            liPriorityHigh.style.display = 'block';
            priorityHigh.prepend(li);
            li.appendChild(h2);
            li.appendChild(description);
            li.appendChild(date);
            setTimeout(() => {
                li.style.visibility = 'visible';
                li.classList.add('slide-In');
            }, 800);
            setTimeout(() => {
                li.classList.remove('slide-In');
            }, 3000);

            li.dataset.id = NewTask.id; //dodawanie id do li
            li.addEventListener('click', showTaskDetails);
        }
    });
}

addTaskButton.addEventListener('click', addTask);