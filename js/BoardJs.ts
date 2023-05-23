$(function(){
    $("#addPostitButton").on("click", function(){
        $("#board").append("<div class='postit'><button class='del'><img src='' width='' alt='삭제버튼'></button></div>");
    });
    $("#board").on("dblclick", ".postit", function(){
        let msg :string = prompt("방명록을 입력하세요.");
        InputMsg(this, msg);
        // $(this).css("background-color", "blue");
    });
});

function InputMsg(thisPostit :HTMLElement, msg :string){
    // 메시지 삽입 함수
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
