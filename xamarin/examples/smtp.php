<?php

//print_r($_REQUEST);
$_POST['pro_ans_field10'] = 4;
$servername = "ap-cdbr-azure-southeast-b.cloudapp.net";
$username = "b9638ac1a1d625";
$password = "2d8b8a3a";
$dbname = "acsm_70271d13b405930";
// Database=acsm_70271d13b405930;Data Source=ap-cdbr-azure-southeast-b.cloudapp.net;User Id=b9638ac1a1d625;Password=2d8b8a3a

/*
Server: palsevents.database.windows.net,1433 \r\nSQL Database: events\r\nUser Name: palsevents\r\n\r\nPHP Data Objects(PDO) Sample Code:\r\n\r\ntry {\r\n   $conn = new PDO ( \"sqlsrv:server = tcp:palsevents.database.windows.net,1433; Database = events\", \"palsevents\", \"{your_password_here}\");\r\n    $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );\r\n}\r\ncatch ( PDOException $e ) {\r\n   print( \"Error connecting to SQL Server.\" );\r\n   die(print_r($e));\r\n}\r\n\rSQL Server Extension Sample Code:\r\n\r\n$connectionInfo = array(\"UID\" => \"palsevents@palsevents\", \"pwd\" => \"{your_password_here}\", \"Database\" => \"events\", \"LoginTimeout\" => 30, \"Encrypt\" => 1);\r\n$serverName = \"tcp:palsevents.database.windows.net,1433\";\r\n$conn = sqlsrv_connect($serverName, $connectionInfo);
*/
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = "INSERT INTO events (pro_fname, pro_lname, pro_email,pro_phone,pro_ans_field08,pro_organization,pro_ans_field10) VALUES ('".mysql_real_escape_string($_POST['pro_fname'])."', '".mysql_real_escape_string($_POST['pro_lname'])."', '".mysql_real_escape_string($_POST['pro_email'])."','".mysql_real_escape_string($_POST['pro_phone'])."','".mysql_real_escape_string($_POST['pro_ans_field08'])."','".mysql_real_escape_string($_POST['pro_organization'])."','".mysql_real_escape_string($_POST['pro_ans_field10'])."')";


$sql = "INSERT INTO xamarine (pro_fname, pro_lname, pro_email,pro_phone,pro_ans_field08,pro_organization,pro_ans_field10)
VALUES ('".$_POST['pro_fname']."', '".$_POST['pro_lname']."', '".$_POST['pro_email']."','".$_POST['pro_phone']."','".$_POST['pro_ans_field08']."','".$_POST['pro_organization']."','".$_POST['pro_ans_field10']."')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfullyMessage sent!";
//	die();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
	die();
}

//$conn->close();


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
$mail->Username = "events@palsglobalsolutions.com";

//Password to use for SMTP authentication
$mail->Password = "P@ls2016";
//Set who the message is to be sent from
$mail->setFrom('events@palsglobalsolutions.com', 'Xamarin with Visual Studio');
//Set an alternative reply-to address
$mail->addReplyTo('events@palsglobalsolutions.com', 'Xamarin with Visual Studio');

//Set who the message is to be sent to
$mail->addAddress($_POST['pro_email'], $_POST['pro_fname']." ".$_POST['pro_lname']);
$mail->addBCC('events@palsglobalsolutions.com', 'Microsoft Xamarin Events');
$mail->addBCC('uday@palsglobalsolutions.com', 'Microsoft Xamarin Events');
$mail->addBCC('sriya@palsglobalsolutions.com', 'Microsoft Xamarin Events');
//Set the subject line
$mail->Subject = 'Xamarin with Visual Studio - Join us for the Round Table Event';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

if(isset($_POST['pro_fname'])) {
   $fname = $_POST['pro_fname'];
} else {
    $fname = "MR/MRS Participant";
}
if(isset($_POST['pro_ans_field10'])){
	if($_POST['pro_ans_field10'] == 1){
		$eventDate = "12th May 2016";
	} else if($_POST['pro_ans_field10'] == 2){
		$eventDate = "25th May 2016";
	} else if($_POST['pro_ans_field10'] == 3){
		$eventDate = "08th June 2016";
	} else if($_POST['pro_ans_field10'] == 4){
		$eventDate = "22nd June 2016";
	}
} else {
		$eventDate = "22nd June 2016";
}


$bodycontent = <<<EOD
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
  <title>DevOps with Microsoft Cloud - Join us for the Round Table Event</title>
</head>
<body>
<div style="width: 640px; font-family: Arial, Helvetica, sans-serif;">
  <div >

Dear {$fname},
  <p>
   <br>
Thank you for registering to Demystifying DevOps Round Table on {$eventDate}.
 <br>
 <br>
We will get back to you in 48Hrs to confirm your registration. If you do not receive a confirmation mail, please email us at events@palsglobalsolutions.com.
 <br>
 <br>
You can also call +91-9704963439 for any queries / assistance regarding the same. 
 <br>
 <br>
Thank you and we look forward to see you!
 </p>
 <br>
  </div>
Warm Regards , <br>
PALS Event Team | PALS Global Solutions Pvt. Ltd. |<br>
Address: 2nd Floor, Plot no : 122, Kavuri Hills<br>
Phase -1, Jubilee Hills, Hyderabad - 500033, Telangana, INDIA<br>
+91-40-40202507, +91-40-40201779<br>
http://www.palsglobalsolutions.com<br>

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
	

		$updatesql = "update xamarine set user_status=1 where id=".$conn->insert_id;

		if ($conn->query($updatesql) === TRUE) {
			echo "New record created successfullyMessage sent!";
		//	die();
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			die();
		}

		$conn->close();

} else {
    echo "Message sent!";
}

