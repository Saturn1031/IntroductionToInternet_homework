<?php
header("Content-Type: application/json");
$answer = $_POST['q1'] + $_POST['q2'] + $_POST['q3'] + $_POST['q4'] + $_POST['q5'] + $_POST['q6'] + $_POST['q7'];
$result = "이 과제의 총점은 " . $answer . "점입니다.";
echo json_encode($result);
?>
	