<?php
    if(isset($_POST['send'])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $country = $_POST['country'];
        $message = $_POST['message'];
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    
<!--    <link rel="stylesheet" type="text/css" href="formstyle.css">-->
    <link rel="stylesheet" type="text/css" href="../css/formstyle.css">
    <link href="https://fonts.googleapis.com/css?family=Kanit:300,200" rel="stylesheet">  
</head>
<body>
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="POST" name="form" id="form">
        <h2>CONTACTO</h2>
        <input type="text" name="name" id="name" placeholder="Nombres" value="<?php if(isset($name)) echo $name ?>">
        <input type="text" name="email" id="email" placeholder="E-Mail" value="<?php if(isset($email)) echo $email ?>">
        <input type="text" name="country" id="country" placeholder="País" value="<?php if(isset($country)) echo $country ?>">
        <textarea name="message" id="message" placeholder="Escriba aquí su mensaje" value="<?php if(isset($message)) echo $message ?>"></textarea>
        <input type="submit" name="send" value="Enviar" id="send">
        <?php 
            include("formval.php");
        ?>
    </form>
    <script type="text/javascript" src="../js/form.js"></script>
</body>
</html>