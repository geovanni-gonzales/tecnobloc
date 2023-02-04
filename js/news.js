(function () {
    'use strict';
    var v, a, i, t, h, x, t2, h2, p, modal, ul_coins, u, div, h4;
    function fixed() {
        //var posY = window.scrollY; alias de pageYOffset
        var posY, boton, heightHead;
        posY = window.pageYOffset;
        boton = document.getElementsByClassName("boton")[0];
        heightHead = document.getElementsByTagName("header")[0].offsetHeight;
        
        if (posY > heightHead) {
            boton.style.position = "fixed";
            boton.style.top = "0px";
        } else {
            boton.style.position = "static";
        }
    }
    function toggle() {
        document.getElementsByTagName("aside")[0].classList.toggle("toggle");
    }
    function close() {
        document.getElementsByTagName("aside")[0].classList.remove("toggle");
        
    }
    //!!!!!la funcion animar de P, H2, DIV... se ejecuta tanto en el evento load y scroll
    function animar(nodelist, clase) {
        v = window.innerHeight;
        a = nodelist.length;
        if (a > 1) {
            for (i = 0; i < a; i += 1) {
                t = nodelist[i].getBoundingClientRect().top;
                h = nodelist[i].getBoundingClientRect().height / 4;
                x = (t + h);
                if (x < v) {
                    nodelist[i].className = clase;
                }
            }
        } else if (a <= 1) {
            t2 = nodelist[0].getBoundingClientRect().top + 90;//se modifico el div es menos alto
            if (t2 < v) {
                nodelist[0].className = clase;
            }
            
        }
    }//animar(3 de 5)
    //---------Fin de la funcion Animar------------------------------
    //---------Tambien necesario para la funcion Animar--------------
    function top() {
        animar(h2, "h2");
        animar(p, "parf");
        animar(div, "boxauthor_article display"); //animar(5 de 5)
    }//animar()
    //---------Fin de la funcion Animar------------------------------
    //----------INICIO DEL MODAL-----------
    function show(e) {
        e.stopPropagation();
        var t_span, h2, img, text;
        t_span = e.target.className;
        h2 = document.querySelector(".coin > h2");
        img = document.querySelector(".qr > img");
        text = document.querySelector("input");

        function asignar(propina, icon, value) {
            modal.setAttribute("class", "modal show");
            h2.innerHTML = propina;
            img.setAttribute("src", icon);
            text.setAttribute("value", value);
        }

        if (t_span === "icon-bitcoin") {
            asignar("APORTE BITCOIN", "../../images/gc_img/ns_qr_bitcoin_segwit.png", "32WKW5NChEnUjABgNeoMpa5ob2DZHvmMBJ");
        } else if (t_span === "icon-ethereum") {
            asignar("APORTE ETHERIUM", "../../images/gc_img/ns_qr_ethereum.png", "0x9Ec438AE514bD019aDbb279512B982F55Bf40536");
        } else if (t_span === "icon-xrp") {
            asignar("APORTE XRP", "../../images/gc_img/ns_qr_ripple.png", "rGiS9AUfjgj5FBi9Z2PDZNwLbkarLihyGB");
        }
    }
    function closeModal(e) {
        if (e.target.className === "modal show" || e.target.className === "closeButton") {
            modal.setAttribute("class", "modal");
        }
    }
    //-------INICIO DEL MODAL----------
    
    //Funcion de los botones del MODAL
    function copy(){
        var textAdd;
        textAdd = document.querySelector("div.box_address input#address");
        textAdd.select();
        document.execCommand("copy");
        h4.setAttribute("class", "color");
        h4.innerHTML = "<span class='icon-copy'></span>COPIED";
        
        setTimeout(function(){
            h4.removeAttribute("class");
            textAdd.blur();
            h4.innerHTML = "<span class='icon-copy'></span>COPY";
        },2000);    
    }
    function execute() {
        document.getElementsByClassName("boton")[0].addEventListener("click", toggle);
        window.addEventListener("scroll", fixed);
        document.getElementsByClassName("articleContainer")[0].addEventListener("click", close);
        window.addEventListener("scroll", top);//animar(4 de 5)
        
        h2 = document.getElementsByTagName("h2");
        p = document.getElementsByTagName("p");
        animar(h2, "h2");
        animar(p, "parf");
        
        div = document.getElementsByClassName("boxauthor_article");//animar(2 de 5);
        animar(div, "boxauthor_article display"); //animar(1 de 5)
        
        //INICIO DEL MODAL
        modal = document.querySelector("div.modal");
        //document.querySelector("ul.coins").addEventListener("click", show);
        
        //En la pagina de noticias si se puede usar la delegacion y reemplazar el for
        //ya que solo se usara 1 ul_coins.
        ul_coins = document.querySelector("ul.coins").addEventListener("click", show);
        
        document.querySelector("div.box_coins").addEventListener("click", closeModal);
        //FIN DEL MODAL
        
        //Botones del MODAL
        h4 = document.querySelector("div.buttons h4");
        h4.addEventListener("click", copy);
    }
    window.addEventListener("load", execute);
}());