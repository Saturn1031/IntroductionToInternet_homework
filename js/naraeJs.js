$(function () {
    $('#radioButton').on("click", function (event) {
        // 이벤트 함수, 완료 버튼을 누르면 계산한 점수를 <p id="answerArea">태그에 출력
        event.preventDefault();
        // AJAX 사용
        $.ajax({
            url: '../과제/form.php',
            type: 'POST',
            data: $('#myForm').serialize(),
            dataType: 'json',
            success: function (data) {
                // 성공 처리
                $('#answerArea').text(data);
            },
            error: function (data) {
                // 오류 처리
                $('#answerArea').text('오류가 발생했습니다.');
                console.log(data);
            }
        });
    });
});
