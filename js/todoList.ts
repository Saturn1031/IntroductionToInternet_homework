function Task(title, dueDate, completed = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.completed = completed;
}

$(() => {
    // 할 일 목록 배열
    let tasks = [];

    // 폼 요소와 할 일 목록 요소 가져오기
    const taskForm = document.getElementById('taskForm') as HTMLFormElement;
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const dueDateInput = document.getElementById('dueDateInput') as HTMLInputElement;
    const taskList = document.getElementById('taskList');
    const incompleteTasksOnlyCheckbox = document.getElementById('incompleteTasksOnly') as HTMLInputElement;

    // 할 일 추가 함수
    function addTask(title, dueDate) {
        const task = new Task(title, dueDate);
        tasks.push(task);
        renderTasks();
    }

    // 할 일 삭제 함수
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // 할 일 목록 렌더링 함수
    function renderTasks() {
        // 이전 목록 지우기
        taskList.innerHTML = '';

        // 필터링된 할 일 목록 가져오기
        const filteredTasks = incompleteTasksOnlyCheckbox.checked
            ? tasks.filter(task => !task.completed)
            : tasks;

        // 새로운 목록 렌더링
        filteredTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = task.title;

            const dueDate = document.createElement('span');
            dueDate.innerText = `(${task.dueDate})`;
            dueDate.classList.add('due-date');

            const deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'image');
            deleteButton.setAttribute('src', '');
            deleteButton.setAttribute('alt', '삭제');
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });

            const completedCheckbox = document.createElement('input');
            completedCheckbox.setAttribute('type', 'checkbox');
            completedCheckbox.checked = task.completed;
            completedCheckbox.addEventListener('change', () => {
                task.completed = completedCheckbox.checked;
                renderTasks();
            });

            listItem.appendChild(dueDate);
            listItem.appendChild(deleteButton);
            listItem.appendChild(completedCheckbox);
            taskList.appendChild(listItem);
        });
    }

    // 폼 제출 이벤트 리스너 등록
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        const title = taskInput.value.trim(); // 입력된 할 일 가져오기
        const dueDate = dueDateInput.value.trim(); // 입력된 마감일 가져오기

        if (title !== '' && dueDate !== '') {
            addTask(title, dueDate);
            taskInput.value = ''; // 입력 필드 초기화
            dueDateInput.value = ''; // 입력 필드 초기화
            taskInput.focus(); // 입력 필드에 포커스
        }
    });

    // 완료되지 않은 일정만 보기 체크박스 이벤트 리스너 등록
    incompleteTasksOnlyCheckbox.addEventListener('change', () => {
        renderTasks();
    });

    // 초기 렌더링
    renderTasks();
});
