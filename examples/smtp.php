<?php

//print_r($_REQUEST);

$servername = "ap-cdbr-azure-southeast-b.cloudapp.net";
$username = "b9638ac1a1d625";
$password = "2d8b8a3a";
$dbname = "acsm_70271d13b405930";
// Database=acsm_70271d13b405930;Data Source=ap-cdbr-azure-southeast-b.cloudapp.net;User Id=b9638ac1a1d625;Password=2d8b8a3a

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO events (pro_fname, pro_lname, pro_email,pro_phone,pro_ans_field08,pro_organization,pro_ans_field10)
VALUES ('".mysql_real_escape_string($_POST['pro_fname'])."', '".mysql_real_escape_string($_POST['pro_lname'])."', '".mysql_real_escape_string($_POST['pro_email'])."','".mysql_real_escape_string($_POST['pro_phone'])."','".mysql_real_escape_string($_POST['pro_ans_field08'])."','".mysql_real_escape_string($_POST['pro_organization'])."','".mysql_real_escape_string($_POST['pro_ans_field10'])."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfullyMessage sent!";
//	die();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
	die();
}

$conn->close();


/**
 * This example shows making an SMTP connection with authentication.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "smtpout.secureserver.net";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 465;
//Whether to use SMTP authentication
$mail->SMTPSecure  = 'ssl';
$mail->DKIM_domain = '127.0.0.1';

$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "uday@palsglobalsolutions.com";

//Password to use for SMTP authentication
$mail->Password = "pals123";
//Set who the message is to be sent from
$mail->setFrom('events@palsglobalsolutions.com', 'Events');
//Set an alternative reply-to address
$mail->addReplyTo('events@palsglobalsolutions.com', 'Events');

//Set who the message is to be sent to
$mail->addAddress($_POST['pro_email'], $_POST['pro_fname']." ".$_POST['pro_lname']);
$mail->addBCC('uday@palsglobalsolutions.com', 'Events');
//Set the subject line
$mail->Subject = 'DevOps with Microsoft Cloud - Join us for the Round Table Event';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

if(isset($_POST['pro_fname'])) {
   $fname = $_POST['pro_fname'];
} else {
    $fname = "MR/MRS Participant";
}

$bodycontent = <<<EOD
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
  <title>DevOps with Microsoft Cloud - Join us for the Round Table Event</title>
</head>
<body>
<div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 11px;">
  <div >

Dear {$fname},
  <p>
   <br>
Thank you for registering for our upcoming Round Table – Demystifying DevOps!
 <br>
 <br>
We will confirm your participation and get back to you soon along with the program details. If you do not receive a confirmation mail, request you to check your SPAM and contact us at events@palsglobalsolutions.com.
 <br>
 <br>
You can either call (+91-970-496-3439) or Email (events@palsglobalsolutions.com) in case of any queries / assistance regarding the same.
 <br>
 <br>
Thank you and we look forward to see you!
 </p>
 <br>
 <br>
  </div>
--
Warm Regards , <br>
PALS Event Team | PALS Global Solutions Pvt. Ltd. |<br>
Address: 2nd Floor, Plot no : 122, Kavuri Hills<br>
Phase -1, Jubilee Hills, Hyderabad - 500033, Telangana, INDIA<br>
T:Landline: +91-40-40202507, +91-40-40201779<br>
Website: http://www.palsglobalsolutions.com<br>
<a href="http:/www.palsglobalsolutions.com/"><img src="http://demouday.azurewebsites.net/Images/image001.png" alt="PALS | Partnering to fuel your success."></a>

</div>
</body>
</html>


EOD;

$mail->msgHTML($bodycontent);

//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}

