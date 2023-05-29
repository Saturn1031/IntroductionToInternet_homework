// 할 일 프로토타입
function Task(title: string, dueDate: string, completed: boolean = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.completed = completed;
}

$(() => {
    // 할 일 목록 배열
    let tasks = [];

    // 입력 폼 요소와 할 일 목록 요소 가져오기
    const taskForm = document.getElementById('taskForm') as HTMLFormElement;
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const dueDateInput = document.getElementById('dueDateInput') as HTMLInputElement;
    const taskList = document.getElementById('taskList');
    const incompleteTasksOnlyCheckbox = document.getElementById('incompleteTasksOnly') as HTMLInputElement;
    const taskCount = document.getElementById('taskCount');

    // 할 일을 추가하고 목록을 새로고침하는 함수
    function addTask(title: string, dueDate: string): void {
        const task = new Task(title, dueDate); // 매개변수로 받은 값 대입, 할 일 객체 생성
        tasks.push(task); // 할 일 배열 마지막 요소로 추가
        showTasks(); // 목록 새로고침
    }

    // 인덱스를 통해 할 일을 삭제하고 목록을 새로고침하는 함수
    function deleteTask(index: number): void {
        tasks.splice(index, 1); // index에 해당하는 요소부터 1개 삭제
        showTasks(); // 목록 새로고침
    }

    // pure 함수, incompleteTasksOnly 체크박스에 따라 할 일 목록을 필터링해 반환하는 함수
    function filterTasks(tasks: any, checkbox: boolean): any {
        if (checkbox) { // 체크박스 true이면
            return tasks.filter(task => !task.completed); // completed 메서드가 false인 task 객체들의 배열을 반환
        } else { // 체크박스 false이면
            return tasks; // 기존 tasks 배열 그대로 반환
        }
    }

    // pure 함수, 완료되지 않은 할 일의 개수를 반환하는 함수
    function countIncompleteTasks(tasks: any): number {
        let count = 0;
        for (let i = 0; i < tasks.length; i++) { // 인덱스 1씩 증가
            if (!tasks[i].completed) { // completed 메서드가 false이면
                count += 1; // 개수 세기
            }
        }
        return count
    }

    // 할 일 목록 출력 함수
    function showTasks(): void {
        // 기존 목록 지우기 (초기화)
        taskList.innerHTML = '';

        // 필터링된 할 일 목록 가져오기
        const filteredTasks = filterTasks(tasks, incompleteTasksOnlyCheckbox.checked);

        // 할 일 목록 출력
        filteredTasks.forEach((task: any, index: number) => { // filteredTasks의 task 요소 각각에 적용
            // <li> 요소 만들기 (하나의 항목)
            const listItem = document.createElement('li');
            listItem.innerText = task.title;

            // <span>요소 만들기 (기한)
            const dueDate = document.createElement('span');
            dueDate.innerText = '(' + task.dueDate + ')';
            dueDate.setAttribute('class', 'dueDate');

            // <input>요소 만들기 (완료 여부 체크박스)
            const completedCheckbox = document.createElement('input');
            completedCheckbox.setAttribute('type', 'checkbox');
            completedCheckbox.checked = task.completed;
            
            // 이벤트 함수, 완료 표시 체크 상태가 변할 때 메서드 값 변경, 완료되지 않을 일정 개수 변경
            completedCheckbox.addEventListener('change', () => {
                task.completed = completedCheckbox.checked; // true 또는 false로 변경
                showIncompleteTaskCount(); // 완료되지 않은 일정 개수 출력 (새로고침)
            });

            // <input>요소 만들기 (삭제 버튼)
            const deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'image');
            deleteButton.setAttribute('src', '../과제/media/trash.png');
            deleteButton.setAttribute('alt', '삭제');
            deleteButton.setAttribute('width', '15px');

            // 이벤트 함수, 삭제버튼 클릭하면 해당 인덱스 요소 삭제
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });

            // <li>요소에 자식 DOM객체 추가
            listItem.appendChild(dueDate);
            listItem.appendChild(completedCheckbox);
            listItem.appendChild(deleteButton);
            // <ul>요소에 <li>를 자식으로 추가
            taskList.appendChild(listItem);
        });

        // 완료되지 않은 일정 개수 출력
        showIncompleteTaskCount();
    }

    // 완료되지 않은 일정 개수를 출력하는 함수
    function showIncompleteTaskCount(): void {
        const filteredTasks: any = filterTasks(tasks, incompleteTasksOnlyCheckbox.checked); // 필터링된 할 일 목록 배열
        const incompleteTaskCount: number = countIncompleteTasks(filteredTasks); // 완료되지 않은 할 일 개수
        taskCount.innerText = '완료되지 않은 일정: ' + incompleteTaskCount;
    }

    // 이벤트 함수, 추가 버튼 누르면 할 일을 목록에 주가하고 입력란 초기화
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 폼 제출할 때 웹페이지 새로고침 막기

        const title: string = taskInput.value; // 입력된 할 일 가져오기
        const dueDate: string = dueDateInput.value; // 입력된 기한 가져오기

        addTask(title, dueDate); // 할 일 추가하고 목록 새로고침
        taskInput.value = ''; // 할 일 입력란 초기화
        dueDateInput.value = ''; // 기한 입력란 초기화
    });

    // 이벤트 함수, 완료되지 않은 일정만 보기 체크박스 상태가 변하면 필터링된 할 일 목록으로 다시 출력
    incompleteTasksOnlyCheckbox.addEventListener('change', () => {
        showTasks();
    });
});
