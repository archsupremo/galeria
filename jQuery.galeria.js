(function ($) {
    jQuery.fn.galeria = function (imagenes, tamanoTodas, tamanoCentro, opciones) {
        var div = $(this);
        var ancho = $(this).css("width");
        var alto = $(this).css("height");
        var num_imagenes = imagenes.length;
        
        var config = {
            hover1: function(imagen) {
                $(imagen).animate(
                    {
                        width: "+=2.5em",
                        heigth: "+=2.5em"
                    },
                    "slow"
                );
                $(imagen).parent("div").find("img:not(.select)").animate(
                    {
                        opacity: 0.4
                    },
                    "slow"
                );
            },
            hover2: function (imagen) {
                $(imagen).animate(
                    {
                        width: "-=2.5em",
                        heigth: "-=2.5em"
                    },
                    "slow"
                );
                $(imagen).parent("div").find("img").animate(
                    {
                        opacity: 1
                    },
                    "slow"
                );
            },
            botonizq: '<input type="button" id="izq" value="<-">',
            botonder: '<input type="button" id="der" value="->">',
            izq: { "transform": "perspective(500px) rotateY(35deg) rotateZ(5deg)" },
            der: { "transform": "perspective(500px) rotateY(-35deg) rotateZ(-5deg)" },
            centro: { "height": tamanoCentro, "width": tamanoCentro }
        };
        
        jQuery.extend(config, opciones);
        
        $.each(imagenes, function(index, element) {
            var imagen = $("<img></img>");
            imagen.attr("src", element);
            imagen.css("width", tamanoTodas);
            imagen.css("height", tamanoTodas);
            imagen.css("transform-style", "preserve-3d");
            imagen.css("position", "relative");
            
            if(index < Math.floor(num_imagenes / 2)) {
                imagen.addClass("izq");
            }
            else if(index > Math.floor(num_imagenes / 2)) {
                imagen.addClass("der");
            }
            else {
                imagen.addClass("centro");
            }
            if(index !== 0)
                imagen.css("margin-left", "-5.5em");
            
            div.append(imagen);
        });
        transformCss();
        
        var numero_izq = $(this).find("img.izq").length;
        var numero_der = $(this).find("img.der").length;
        
        $(this).find("img.izq").each(function(index) {
            $(this).css("z-index", index+1);
        });
        $(this).find("img.der").each(function(index) {
            $(this).css("z-index", numero_der - index + 1);
        });
        $(this).find("img.centro").each(function(index) {
            $(this).css("z-index", numero_izq + numero_der);
        });
        
        $(this).find("img.izq, img.der").hover(encima, dejar);
        
        poner_botones(div);
        
        $(this).find("input#izq").click(moverIzq);
        $(this).find("input#der").click(moverDer);
        
        // Funciones que dan la funcionalidad a la galeria de imagenes
        
        function encima() {
            $(this).addClass("select");
            
            config.hover1($(this));
        }
        
        function dejar() {
            $(this).removeClass("select");
            
            config.hover2($(this));
        }
        
        function poner_botones(div) {
            div.append("<br>");
            div.append($(config.botonizq));
            div.append($(config.botonder));
        }
        
        function moverIzq() {
            var nuevaImagen = $(this).parent("div").find("img.centro").prev();
            var centroAntiguo = $(this).parent("div").find("img.centro");
            if(nuevaImagen.attr("class") !== undefined) {
                mover("der", "izq", nuevaImagen, centroAntiguo);
            }
        }
        
        function moverDer() {
            var nuevaImagen = $(this).parent("div").find("img.centro").next();
            var centroAntiguo = $(this).parent("div").find("img.centro");
            if(nuevaImagen.attr("class") !== undefined) {
                mover("izq", "der", nuevaImagen, centroAntiguo);
            }
        }
        
        function mover(siguiente, anterior, nuevaImagen, centroAntiguo) {
            var alto = nuevaImagen.css("height");
            var ancho = nuevaImagen.css("width");

            centroAntiguo.unbind();
            centroAntiguo.hover(encima, dejar);
            centroAntiguo.css("height", alto);
            centroAntiguo.css("width", ancho);
            
            centroAntiguo.addClass(siguiente);
            centroAntiguo.removeClass("centro");
            
            nuevaImagen.removeClass(anterior);
            nuevaImagen.addClass("centro");
            
            nuevaImagen.css("transform-style", "none");
            nuevaImagen.css("transform", "none");
            nuevaImagen.css("z-index", parseInt(centroAntiguo.css("z-index")) + 1);
            nuevaImagen.unbind();
            
            transformCss();
        }
        
        function transformCss() {
            for(var propIzq in config.izq) {
                $(div).find("img.izq").css(propIzq, config.izq[propIzq]);
            }
            for(var propiDer in config.der) {
                $(div).find("img.der").css(propiDer, config.der[propiDer]);
            }
            for(var propiCentro in config.centro) {
                $(div).find("img.centro").css(propiCentro, config.centro[propiCentro]);
            }
        }
    };
}(jQuery));
