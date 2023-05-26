// 할 일 프로토타입
function Task(title: string, dueDate: string, completed: boolean = false) {
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
    const taskCount = document.getElementById('taskCount');

    // 할 일 추가 함수
    function addTask(title: string, dueDate: string): void {

        // 할 일 객체 생성
        const task = new Task(title, dueDate);
        tasks.push(task);
        renderTasks();
    }

    // 할 일 삭제 함수
    function deleteTask(index: number): void {
        tasks.splice(index, 1);
        renderTasks();
    }

    // pure 함수, 할 일 목록 필터링 함수
    function filterTasks(tasks: any, showIncompleteOnly: boolean): any {
        if (showIncompleteOnly) {
            return tasks.filter(task => !task.completed);
        } else {
            return tasks;
        }
    }

    // pure 함수, 완료되지 않은 일정 개수 계산 함수
    function countIncompleteTasks(tasks: any): number {
        return tasks.reduce((count: number, task: any) => {
            if (!task.completed) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
    }

    // 할 일 목록 렌더링 함수
    function renderTasks(): void {
        // 이전 목록 지우기
        taskList.innerHTML = '';

        // 필터링된 할 일 목록 가져오기
        const filteredTasks = filterTasks(tasks, incompleteTasksOnlyCheckbox.checked);

        // 새로운 목록 렌더링
        filteredTasks.forEach((task: any, index: number) => {
            const listItem = document.createElement('li');
            listItem.innerText = task.title;

            const dueDate = document.createElement('span');
            dueDate.innerText = `(${task.dueDate})`;
            dueDate.classList.add('due-date');

            const deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'image');
            deleteButton.setAttribute('src', '../과제/media/trash.png');
            deleteButton.setAttribute('alt', '삭제');
            deleteButton.setAttribute('width', '15px');
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });

            const completedCheckbox = document.createElement('input');
            completedCheckbox.setAttribute('type', 'checkbox');
            completedCheckbox.checked = task.completed;
            completedCheckbox.addEventListener('change', () => {
                task.completed = completedCheckbox.checked;
                renderTasks();
                updateIncompleteTaskCount();
            });

            listItem.appendChild(dueDate);
            listItem.appendChild(deleteButton);
            listItem.appendChild(completedCheckbox);
            taskList.appendChild(listItem);
        });

        // 완료되지 않은 일정 개수 출력
        updateIncompleteTaskCount();
    }

    function updateIncompleteTaskCount(): void {
        const filteredTasks: any = filterTasks(tasks, incompleteTasksOnlyCheckbox.checked);
        const incompleteTaskCount: number = countIncompleteTasks(filteredTasks);
        taskCount.innerText = `완료되지 않은 일정: ${incompleteTaskCount}`;
    }

    // 폼 제출 이벤트 리스너 등록
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        const title: string = taskInput.value.trim(); // 입력된 할 일 가져오기
        const dueDate: string = dueDateInput.value.trim(); // 입력된 기한 가져오기

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
