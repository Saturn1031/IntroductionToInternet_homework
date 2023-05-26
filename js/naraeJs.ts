$(() => {
    $('#radioButton').on("click", (event: JQuery.Event) => {  
        // 이벤트 함수, 완료 버튼을 누르면 계산한 점수를 <p id="answerArea">태그에 출력
        event.preventDefault();
        $.ajax({
            url: '../과제/form.php',
            type: 'POST',
            data: $('#myForm').serialize(),
            dataType: 'json',
            success: (data: any) => {
                // 성공 처리
                $('#answerArea').text(data);
            },
            error: (data: any) => {
                // 오류 처리
                $('#answerArea').text('오류가 발생했습니다.');
                console.log(data);
            }
            });
    });
});