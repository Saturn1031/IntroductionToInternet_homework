function Task(title, dueDate, completed) {
    if (completed === void 0) { completed = false; }
    this.title = title;
    this.dueDate = dueDate;
    this.completed = completed;
}
$(function () {
    // 할 일 목록 배열
    var tasks = [];
    // 폼 요소와 할 일 목록 요소 가져오기
    var taskForm = document.getElementById('taskForm');
    var taskInput = document.getElementById('taskInput');
    var dueDateInput = document.getElementById('dueDateInput');
    var taskList = document.getElementById('taskList');
    var incompleteTasksOnlyCheckbox = document.getElementById('incompleteTasksOnly');
    // 할 일 추가 함수
    function addTask(title, dueDate) {
        var task = new Task(title, dueDate);
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
        var filteredTasks = incompleteTasksOnlyCheckbox.checked
            ? tasks.filter(function (task) { return !task.completed; })
            : tasks;
        // 새로운 목록 렌더링
        filteredTasks.forEach(function (task, index) {
            var listItem = document.createElement('li');
            listItem.innerText = task.title;
            var dueDate = document.createElement('span');
            dueDate.innerText = "(".concat(task.dueDate, ")");
            dueDate.classList.add('due-date');
            var deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'image');
            deleteButton.setAttribute('src', '');
            deleteButton.setAttribute('alt', '삭제');
            deleteButton.addEventListener('click', function () {
                deleteTask(index);
            });
            var completedCheckbox = document.createElement('input');
            completedCheckbox.setAttribute('type', 'checkbox');
            completedCheckbox.checked = task.completed;
            completedCheckbox.addEventListener('change', function () {
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
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        var title = taskInput.value.trim(); // 입력된 할 일 가져오기
        var dueDate = dueDateInput.value.trim(); // 입력된 마감일 가져오기
        if (title !== '' && dueDate !== '') {
            addTask(title, dueDate);
            taskInput.value = ''; // 입력 필드 초기화
            dueDateInput.value = ''; // 입력 필드 초기화
            taskInput.focus(); // 입력 필드에 포커스
        }
    });
    // 완료되지 않은 일정만 보기 체크박스 이벤트 리스너 등록
    incompleteTasksOnlyCheckbox.addEventListener('change', function () {
        renderTasks();
    });
    // 초기 렌더링
    renderTasks();
});
