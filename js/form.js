(function(){
    'use strict';
    function validateName(e){   
        var txtName, patternP;
        txtName = document.getElementById("name");
        patternP = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]{3,30}$/;
        //patternP = /^[a-zA-Z\s]{3,30}$/;
        validateField(e, txtName, patternP);
        txtName.placeholder = "Ingrese los nombres solicitados.";
    }
    function validateEmail(e){
        var txtEmail, patternE;
        txtEmail = document.getElementById("email");
        patternE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        //patternE = /\w+@+\w+\.+[a-z]/;
        validateField(e, txtEmail, patternE);
        txtEmail.placeholder = "Ingrese el correo solicidato.";
    }
    function validateCountry(e){
        var txtCountry, patternC;
        txtCountry = document.getElementById("country");
        patternC = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]{3,20}$/;
        //patternC = /^[a-zA-Z\s]{3,20}$/;
        validateField(e, txtCountry, patternC);
        txtCountry.placeholder = "Ingrese el país solicitado.";
    }
    function validateMessage(e){
        var txtMessage, patterM;
        txtMessage = document.getElementById("message");
        patterM = /^[\s\S]{4,255}$/;
        //patterM = /^[\w]{4,255}$/;
        validateField(e, txtMessage, patterM);
        txtMessage.placeholder = "Escriba su mensaje.";
    }
//-----------INICIO DE FUNCIONES INDEPENDIENTES------------------
    function validateField(e, tagClass, pattern){
        if(tagClass.value == ""){
            error(tagClass);
            e.preventDefault();
            return false;
;       }
        else if(!pattern.test(tagClass.value)){
            error(tagClass);
            e.preventDefault();
            return false;
        }
        return true;
    }
    function error(tag){
        tag.className = "errorjs";
        tag.focus();
        tag.value = "";
    }
    function cleanError(e){
        e.target.className = "";
    }
    function validate(e){
        validateName(e);
        validateEmail(e);
        validateCountry(e);
        validateMessage(e);
    }
    //FIN DE FUNCIONES INDEPENDIENTES------------------
    function execute () {
        document.getElementById("message").addEventListener("change", cleanError);
        document.getElementById("country").addEventListener("change", cleanError);
        document.getElementById("email").addEventListener("change", cleanError);
        document.getElementById("name").addEventListener("change", cleanError);
        document.getElementById("form").addEventListener("submit", validate);
    }  
    window.addEventListener("load", execute);
}());