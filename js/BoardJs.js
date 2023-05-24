$(function () {
    $("#addPostitButton").on("click", function () {
        $("#board").append("<div class='postit'><button class='del'><img src='' width='' alt='삭제버튼'></button></div>");
    });
    $("#board").on("dblclick", ".postit", function () {
        var msg = prompt("방명록을 입력하세요.");
        var updatedPostit = editPostitContent(this, msg);
        $(this).replaceWith(updatedPostit);
    });
});
function editPostitContent(element, content) {
    var updatedElement = element.cloneNode(true); // 요소의 복제본 생성
    updatedElement.textContent = content; // 복제본의 텍스트 업데이트
    return updatedElement; // 업데이트된 요소 반환
}
/*
function AddPostit() { // 이벤트 함수, 포스트잇 객체를 동적으로 생성하는 함수
    // 포스트잇 객체 추가
    let board :HTMLElement = document.getElementById("board");
    let newPostit :HTMLElement = document.createElement("div");
    newPostit.setAttribute("class", "postit");
    board.appendChild(newPostit);
    
    // 포스트잇 객체 디스플레이.. css?
    // 텍스트 삽입
    
}

function DobbleClickPostit(text :string) {
    // alert? 아니면 노란 포스트잇 크게 확대(모달)?
    let body = document.getElementsByTagName("body");
    let InptutPostit :HTMLElement = document.createElement("div");
    // 글자수 체크
    // 입력창 들이밀기 (확인 버튼)
    let textArea :HTMLElement = TextareaInPostit(InptutPostit);
    InptutPostit.appendChild(textArea);
    // (최대 입력 글자수 제한, overflow: hidden)
}


function CompletFixPostit (msg) {
    // 바깥 화면 클릭하면
        // 입력 창 사라져
        // 그 포스트잇의 입력값 반환
}

function TextareaInPostit(postit :HTMLElement) :HTMLElement{ // pure함수, 입력창을 생성하는 함수
    let textArea :HTMLElement = document.createElement("textArea");
    textArea.setAttribute("style", "height:300px; width:300px; resize: none;");
    textArea.setAttribute("maxlength", "100");
    textArea.setAttribute("placeholder", "텍스트를 입력하세요.");

    

    return textArea;
}
*/
