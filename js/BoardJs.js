$(function () {
    $("#addPostitButton").on("click", function () {
        // 이벤트 함수, 포스트잇 객체를 동적으로 생성하고 보드의 자식 노드에 추가하는 함수
        $("#board").append("<div class='postit'><div class='content'></div></div>");
    });
    $("#board").on("dblclick", ".content", function () {
        // 이벤트 함수, 포스트잇의 내용을 수정하는 함수
        var msg = prompt("방명록을 입력하세요.");
        var updatedPostit = editPostitContent(this, msg);
        $(this).replaceWith(updatedPostit);
    });
    $("#delPostitButton").on("click", function () {
        // 이벤트 함수, 마지막에 생성된 포스트잇 객체를 삭제하는 함수
        var lastPostit = $(".postit:last");
        lastPostit.remove();
    });
});
function editPostitContent(element, content) {
    // pure 함수, 포스트잇의 내용을 업데이트하고 포스트잇 객체를 리턴하는 함수
    var updatedElement = element.cloneNode(true);
    updatedElement.textContent = content;
    return updatedElement;
}
