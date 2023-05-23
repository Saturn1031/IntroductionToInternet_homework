function AddPostit() {
    // 포스트잇 객체 추가
    var board = document.getElementById("board");
    var newPostit = document.createElement("div");
    newPostit.setAttribute("class", "postit");
    board.appendChild(newPostit);
    // 포스트잇 객체 디스플레이.. css?
    // 텍스트 삽입
}
function DobbleClickPostit(text) {
    // 더블클릭 시 함수 실행할거임 (호출 측에서 구현)
    // alert? 아니면 노란 포스트잇 크게 확대
    var body = document.getElementsByTagName("body");
    var InptutPostit = document.createElement("div");
    body.appendChild(InptutPostit);
    // 글자수 체크
    // 입력창 들이밀기 (확인 버튼)
    var textArea = TextareaInPostit(InptutPostit);
    InptutPostit.appendChild(textArea);
    // (최대 입력 글자수 제한, overflow: hidden)
}
function CompletFixPostit(msg) {
    // 바깥 화면 클릭하면 
    // 입력 창 사라져
    // 그 포스트잇의 입력값 반환 
}
function TextareaInPostit(postit) {
    var textArea = document.createElement("textArea");
    textArea.setAttribute("style", "height:300px; width:300px; resize: none;");
    textArea.setAttribute("maxlength", "100");
    textArea.setAttribute("placeholder", "텍스트를 입력하세요.");
    $;
    return textArea;
}
function init() {
    var addButton = document.getElementById("addPostitButton");
    addButton.addEventListener("click", AddPostit);
}
