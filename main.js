const addTaskButton = document.getElementById('addTask');
const container = document.getElementById('container');

function addTask() {
    const div = document.createElement('div');
    div.classList.add('taskCreatorDiv', 'taskCreatorDivIn');
    const blur = document.createElement('div');
    blur.classList.add('blur', 'blurInAnimation');
    console.log('add');
    container.appendChild(blur)
    container.appendChild(div);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'X';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Tytuł zadania';
    titleInput.classList.add('titleInput');

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Opis zadania';
    titleInput.classList.add('descriptionInput');

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.min = new Date().toISOString().split('T')[0];

    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.disabled = true;

    if(dateInput.value !== '')
    {
        timeInput.disabled = false;
        timeInput.defaultValue = '08:00';
    }

    div.appendChild(cancelButton);
    div.appendChild(titleInput);
    div.appendChild(descriptionInput);
    div.appendChild(dateInput);
    div.appendChild(timeInput);

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