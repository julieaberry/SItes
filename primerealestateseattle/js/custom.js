//Math Script
 
if(!isset($_POST['submitted'])) {
   session_start();
   $digit1 = mt_rand(1,6);
   $digit2 = mt_rand(1,6);
   $math = "$digit1 + $digit2";
   $_SESSION['answer'] = $digit1 + $digit2;
}

if(isset($_POST['submitted'])) {
  if(trim($_POST['contactName']) === '') {
   $nameError = 'Please enter your name.';
   $hasError = true;
   } else {
   $name = trim($_POST['contactName']);

if ($_SESSION['answer'] != $_POST['answer'] ) {
    $commentError = 'That is incorrect. Please answer the math question.';
    $hasError = true;
  }