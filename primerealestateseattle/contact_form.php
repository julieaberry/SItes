<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$type = $_POST['type'];
$message = $_POST['message'];
$formcontent=" From: $name \n Phone: $phone \n Type of Prospect: $type\n Message: $message";
$recipient = "berryjuli@gmail.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!";
?>




<?php

session_start();


$num1=rand(1,9); //Generate First number between 1 and 9  
$num2=rand(1,9); //Generate Second number between 1 and 9  
$captcha_total=$num1+$num2;  

 
$math = "$num1"." + "."$num2"."=";  


$_SESSION['rand_code'] = $captcha_total;

$dir = 'fonts/';

$image = imagecreatetruecolor(120, 25); //Change the numbers to adjust the size of the image
$black = imagecolorallocate($image, 0, 0, 0);
$color = imagecolorallocate($image, 200, 100, 90);
$white = imagecolorallocate($image, 255, 255, 255);

imagefilledrectangle($image,0,0,399,99,$white);
imagettftext ($image, 20, 0, 20, 25, $color, $dir."georgia.ttf", $math );//Change the numbers to adjust the font-size

header("Content-type: image/png");
imagepng($image);

?>

<?php

if(isset($_POST['submit'])) {
 
      $errors = array();
    
      if($_POST['name'] == "") {
         $errors[] = 'The name field is empty';
      }
      if($_POST['email'] == "") {
         $errors[] = "The email field is empty";
      }
     if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
          $errors[] = "The email address was not valid";
      }
    if($_POST['tel'] == "") {
         $errors[] = "Please enter your phone number";
      }
}

    if ($_REQUEST['captcha_entered']!=$_SESSION['rand_code']) { 
     $errors[] = "The math is incorrectly";
      }
      if(count($errors) == 0) {
         $sendto = "berryjuli@gmail.com";//Your email goes here
         $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
     $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
     $subject = $_POST['subject'];//You can change your subject here
     $comment = filter_var($_POST['comment'], FILTER_SANITIZE_STRING);
      
     $message = "<strong>$name</strong> has sent you a message by using the contact form:
    
    <p><strong>Name:</strong> <em>$name</em></p>
    
        <p><strong>Email:</strong> <em>$email</em></p>
        
        <p><strong>The subject:</strong> <em>$subject</em></p>
    
    <p><strong>Message:</strong> <em>$comment</em></p>";
    
    $headers = "From: $name <$email> \r\n";
    $headers .= "X-Mailer:PHP/\r\n";
    $headers .= "MIME-Version:1.0\r\n";
    $headers .= "Content-type:text/html; charset=iso-8859-1\r\n";
 
         if(mail($sendto, $subject, $message, $headers)) {
             $success = true;
         } else {
             $success = false;
         }
    } else {
       $success = false;
 
    }
  }
 
  if(isset($_POST['submit'])) {
     if($success == true & count($errors) == 0) {
        echo "<script>alert('Thank you for your message $name, we will get back to you asap.');</script>";
     }
     if(count($errors) == 0 & $success == false & isset($_POST['submit'])) {
        echo "<h2>There was a problem with our form. Please email us at berryjuli@gmail.com.</h2>";
     }
 
     if($success == false & count($errors) > 0 & isset($_POST['submit'])) {
        echo '<ul>';
        foreach($errors as $show_all) {
           echo '<li><span style="color:#ff0000;">'.$show_all.'</span></li>';
        }
        echo '</ul>';
     }
 }

?>

     

