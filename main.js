const addTaskButton = document.getElementById('addTask');
const container = document.getElementById('container');

function addTask() {
    //dodawanie zadania
    const div = document.createElement('div');
    div.classList.add('taskCreatorDiv', 'taskCreatorDivIn');
    const blur = document.createElement('div');
    blur.classList.add('blur', 'blurInAnimation');
    console.log('add');
    container.appendChild(blur)
    container.appendChild(div);

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
        console.log('added')
        setTimeout(() => {
            div.remove();
            blur.remove();
        }, 800);

        //dodawanie taska do listy
        const tasklist = document.querySelector('.taskListContent ul');
        //console.log(tasklist);
        const li = document.createElement('li');
        li.style.visibility = 'hidden';
        const h2 = document.createElement('h2');
        h2.textContent = titleInput.value;

        const description = document.createElement('p');
        description.textContent = descriptionInput.value;

        const date = document.createElement('p');
        date.classList.add('dateTime');
        date.textContent = `${dateInput.value} ${timeInput.value}`;

        
        tasklist.prepend(li);
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
    })

    //zamykanie okna
    cancelButton.addEventListener('click', () => {
        blur.classList.remove('blurInAnimation');
        blur.classList.add('blurOutAnimation')
        div.classList.remove('taskCreatorDivIn');
        div.classList.add('taskCreatorDivOut');
        setTimeout(() => {
            div.remove();
            blur.remove();
        }, 1000);

    });
}

addTaskButton.addEventListener('click', addTask);