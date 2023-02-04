<?php
//----------------BLOQUE DE FUNCIONES INDEPENEDIENTES------------------------------------    
    function testName($nombre){
        $patternN = '/^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{3,30}+$/';
        //$patternN = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]{3,30}$/;
        //if(preg_match($patternN, $nombre) && !$nombre == NULL){
        if(preg_match($patternN, $nombre) && !empty($nombre)){
            return true;
        }else{
            return false;
        }
    }
    function testEmail($email){
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            return true;
        }else{
            return false;
        }
    }
    function testCountry($country){
        $patternC = '/^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜàèìòùÀÈÌÒÙ\s]{3,20}+$/';
        if(preg_match($patternC, $country) && !empty($country)){
            return true;
        }else{
            return false;
        }
    }
    function testMessage($message){
        $patternM = '/^[\s\S]{4,255}+$/';
        if(preg_match($patternM, $message) && !empty($message)){
            return true;
        }else{
            return false;
        }
    }

//----------------------BLOQUE DE ALMACEN DE ERRORRES----------------------------------
    function testError($errorArray, $name, $email, $country, $message){      
        if(!testName($name)){
            $errorArray[]= '<p class="errorphp">* Ingrese su nombre máximo hasta 30 carácteres.</p>';
        }
        if(!testEmail($email)){
            $errorArray[]= '<p class="errorphp">* Ingrese un correo válido.</p>';
        }
        if(!testCountry($country)){
            $errorArray[]= '<p class="errorphp">* Ingrese un país máximo hasta 20 carácteres.</p>';
        }
        if(!testMessage($message)){
            $errorArray[]= '<p class="errorphp">* Escriba un mensaje.</p>';
        }
        return $errorArray;
    }

//---------------------BLOQUE DE EJECUCION DE FUNCIONES--------------------------
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';

    if(isset($_POST["send"])){
        $name = $_POST["name"];
        $email = $_POST["email"];
        $country = $_POST["country"];
        $message = $_POST["message"];
        
        $errorArray = Array();
        $errorData = testError($errorArray, $name, $email, $country, $message);
        
        if(count($errorData) > 0){
            for($i=0; $i<count($errorData); $i++){
                echo $errorData[$i];
            }
        }else{
            //$advert = "De: $name \n";
            $advert = "Correo: $email \n";
            $advert .= "<br>Ciudad: $country \n";
            $advert .= "<br>Mensaje: $message";

            $mail = new PHPMailer(true);
            
            try {
            //Server settings
                $mail->SMTPDebug = 0;                      // Enable verbose debug output
                $mail->isSMTP();                                            // Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'technoblockchain.info@gmail.com';      // SMTP username
                $mail->Password   = '4099Pro9564';                          // SMTP password
                $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
                $mail->Port       = 587;                                    // TCP port to connect to

                //Recipients
                $mail->setFrom('technoblockchain.info@gmail.com', $name);
                $mail->addAddress('geovannihgm@gmail.com');     // Add a recipient

                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Mensajese desde la web';
                $mail->Body    = $advert;
                $mail->Charset = 'UTF-8'; 

                $mail->send();
                //echo 'El mensaje se envío correctamente';
                header('Location:../html5/forms/thanks.html');
            } catch (Exception $e) {
                echo "Se produjo un error en el envío: {$mail->ErrorInfo}";
            }
        }
    }
?>