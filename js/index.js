(function () {
    'use strict';
    var hr, he, posy, v, x, h, t, t2, a, h2, p, modal, i, ul_coins, u, div, div_im, h4;
     
    
    /*- Funcion de Redimencion de imagen de fondo de acuerdo al tamaño del header */
    function resize() {
        he = hr.offsetHeight;
        hr.style.backgroundSize = "100%" + " " + he + "px";
    }
    /*------------------------------------------------------------------- */

    /*- Funcion de Animacion de los parrafos h1, h2, P....*/
    /*
    function animar(array, clase) {
        v = window.innerHeight;
        a = array.length;
        for (i = 0; i < a; i += 1) {
            t = array[i].getBoundingClientRect().top;
            h = array[i].getBoundingClientRect().height / 4;
            x = (t + h);
            if (x < v) {
                array[i].className = clase;
            }
            //else{
                //array[i].className = "";
            //}
        }
    }
    */
    //!!!!!la funcion animar se ejecuta tanto en el evento load y scroll
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
            t2 = nodelist[0].getBoundingClientRect().top + 100;
            if (t2 < v) {
                nodelist[0].className = clase;
            }
            
        }
    }//animar (3 de 5)
    /*---------------------------------------------------------------- */
    function resiz() {
        resize();
    }
    function posit() {
        posy = window.pageYOffset * 0.30;
        hr.style.backgroundPosition = "0" + " " + "-" + posy + "px";
    }
    function top() {
        animar(h2, "h2");
        animar(p, "parf");
        animar(div, "mainbox_author display"); //animar (3 de 4)
    }//animar(5 de 5)
    //INICIO del Modulo de Navegacion Movil
    function nav_scroll() {
        var scrolly, nv, div_im, ul;
        scrolly = window.pageYOffset;
        nv = document.querySelector("nav.nav_movil");
        div_im = document.querySelector(".nav_movil li > div");
        ul = document.querySelector(".nav_movil li > span + ul");

        if (scrolly > 1) {
            nv.setAttribute("class", "nav_movil visible");
        } else {
            nv.setAttribute("class", "nav_movil");
            div_im.removeAttribute("class");
            ul.removeAttribute("class");
            modal.setAttribute("class", "modal");
        }
    }
    function toogle_movil(e) {
        var ul, ul_at, div_at, section;
        ul = document.querySelector(".nav_movil li > span + ul");
        div_im = document.querySelector(".nav_movil li > div");

        //if(e.target.tagName.toLowerCase() == "span"){
        if (e.target.className === "icon-menu") {
            ul_at = ul.getAttribute("class");
            if (ul_at === null) {
                ul.setAttribute("class", "toggle_menu");
                div_im.removeAttribute("class");
            } else {
                ul.removeAttribute("class");
            }
        } else if (e.target.id === "i_author") {
        //else{
            div_at = div_im.getAttribute("class");
            if (div_at === null) {
                div_im.setAttribute("class", "toggle_image");
                ul.removeAttribute("class");
            } else {
                div_im.removeAttribute("class");
            }
        }
        //-----------Para cerrar el div y el menu-------------
        // no es posible con un bucle for--------------
        /*
        document.querySelector(".section_one").addEventListener("click", function () {
            div_im.removeAttribute("class");
            ul.removeAttribute("class");
        });
        
        document.querySelector(".section_two").addEventListener("click", function () {
            div_im.removeAttribute("class");
            ul.removeAttribute("class");
        });
        */
        //-----------Otra opcion con delegacion-------------
        document.querySelector(".container").addEventListener("click", function (e) {
            var tag = e.target.tagName;
            if (tag === "SECTION" || tag === "ARTICLE" || tag === "P" || tag === "H2" || tag === "CANVAS") {
                div_im.removeAttribute("class");
                ul.removeAttribute("class");
            }
        });
        //-----------Para cerrar el div y el menu-------------
    }
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
            asignar("APORTE BITCOIN", "images/gc_img/ns_qr_bitcoin_segwit.png", "32WKW5NChEnUjABgNeoMpa5ob2DZHvmMBJ");
        } else if (t_span === "icon-ethereum") {
            asignar("APORTE ETHERIUM", "images/gc_img/ns_qr_ethereum.png", "0x9Ec438AE514bD019aDbb279512B982F55Bf40536");
        } else if (t_span === "icon-xrp") {
            asignar("APORTE XRP", "images/gc_img/ns_qr_ripple.png", "rGiS9AUfjgj5FBi9Z2PDZNwLbkarLihyGB");
        }
    }
    function closeModal(e) {
        if (e.target.className === "modal show" || e.target.className === "closeButton") {
            modal.setAttribute("class", "modal");
        }
    }
    //-------INICIO DEL MODAL----------
    //FIN del Modulo de Navegacion Movil
    
    //inicio del efecto acordion de la descripcion para web
    function toggle_desc(){
        document.querySelector("div.mainbox_author > ul > li:nth-child(2)").classList.toggle("toggle_desc");      
        document.querySelector(".mainbox_author > ul > li:first-child > p").classList.toggle("active");      
    }
    //fin del efecto acordion de la descripcion para web
    
    //Para cerrar el div de visio del autor cuando click en el linnk de parrafos
    function closeVision(e){
        if(e.target.tagName === "A"){
             div_im.removeAttribute("class");
        }
    }
    
    //Funcion de los botones del MODAL
    function copy(){
        var textAdd;
        textAdd = document.querySelector("div.box_address input#address");
//        textAdd.focus(); no funciona en firefox
//        document.execCommand("selectAll");//tambien funciona pero quedara obsoleto execCommand pronto.
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
        hr = document.getElementsByTagName("header")[0];
        h2 = document.getElementsByTagName("h2");
        p = document.getElementsByTagName("p");
        div = document.getElementsByClassName("mainbox_author");//animar(2 de 5);
        window.addEventListener("resize", resiz);
        window.addEventListener("scroll", posit);
        window.addEventListener("scroll", top);//animar(4 de 5)

        resize();
        animar(h2, "h2");
        animar(p, "parf");
        animar(div, "mainbox_author display"); //animar(1 de 5)
        
        //INICIO del modulo NAV MOVIL
        document.querySelector(".nav_movil > .ul_movil").addEventListener("click", toogle_movil);
        window.addEventListener("scroll", nav_scroll);
        //INICIO DEL MODAL
        modal = document.querySelector("div.modal");
        //document.querySelector("ul.coins").addEventListener("click", show);
        
        //Es necesario el bucle for ya que estamos usando 2 ul_coins tanto para la pagina web y movil
        //por delegacion solo selecciona una 
        ul_coins = document.querySelectorAll("ul.coins");
        for (u = 0; u < ul_coins.length; u += 1) {// es igual i++ y i+=1
            ul_coins[u].addEventListener("click", show);
        }
        //ul_coins = document.querySelector("ul.coins").addEventListener("click", show);
        
        document.querySelector("div.box_coins").addEventListener("click", closeModal);
        //FIN DEL MODAL
        //FIN del modulo NAV MOVIL

        //inicio del efecto acordion de la descripcion para web
        document.querySelector(".mainbox_author > ul > li > p").addEventListener("click", toggle_desc);
        //fin del efecto acordion de la descripcion para web
        
        //Para cerrar el div de visio del autor cuando click en el linnk de parrafos
        document.querySelector("div.internal_link").addEventListener("click", closeVision);
        
        //Botones del MODAL
        h4 = document.querySelector("div.buttons h4");
        h4.addEventListener("click", copy);
    }
    window.addEventListener("load", execute);
}());