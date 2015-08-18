<?php
  //start a session -- needed for Securimage Captcha check
  session_start();

  //add you e-mail address here
  define("MY_EMAIL", "HJCBestChoiceRealty@gmail.com");
  define("EMAIL_SUBJECT", "Important Information Request!");
  
  

  //a map of fields to include in email, along with if they are required or not
  //aparently in PHP, arrays (maps) can't be constants?
  $fields_req =  array("name" => true, /*"title" => false, "company" => false, "website" => false,*/ "phone" => false, "message" => true);

  /**
   * Sets error header and json error message response.
   *
   * @param  String $messsage error message of response
   * @return void
   */
  function errorResponse ($messsage) {
    header('HTTP/1.1 500 Internal Server Error');
    die(json_encode(array('message' => $messsage)));
  }

  /**
   * Pulls posted values for all fields in $fields_req array.
   * If a required field does not have a value, an error response is given.
   *
   * @param [Array] $fields_req a map of field name to required
   */
  function setMessageBody ($fields_req) {
    $message_body = "";
    foreach ($fields_req as $name => $required) {
      $postedValue = $_POST[$name];
      if ($required && empty($postedValue)) {
        errorResponse("$name is empty.");
      } else {
        $message_body .= ucfirst($name) . ":  " . $postedValue . "\n";
      }
    }
    return $message_body;
  }

  $email = $_POST['email']; 

  header('Content-type: application/json');
  //do some simple validation. this should have been validated on the client-side also
  if (empty($email)) {
    errorResponse('Email or message is empty.');
  }
  $messageBody = setMessageBody($fields_req);


// if the url field is empty 
if(isset($_POST['url']) && $_POST['url'] == ''){
     // then send the form to your email
          mail( 'you@yoursite.com', 'Contact Form', print_r($_POST,true) ); 
} 
// otherwise, let the spammer think that they got their message through


  //try to send the message
  echo json_encode(array('message' => 'Thank you. Your message was successfully submitted.'));
  mail(MY_EMAIL, EMAIL_SUBJECT, $messageBody, "From: $email");
?>