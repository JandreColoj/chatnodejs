
    var direccion = location.href;
    var aux = direccion.split(':');

    
    var socket = io.connect("http://192.168.43.191:"+aux[2],{"forceNew":true})
    $("#NoPuerto" ).html("<h3  class='form-text text-muted'>Puerto "+aux[2]+"</h3>")    



    socket.on("messages",function(data){

        console.log(data);

        render(data);
    });



    function render(data){

        var html=data.map(function(message, index){

            return (`
                <div class="message"> 
                    <strong> ${message.nickname}</strong>
                    dice:  
                    <p>${message.text}</p>
                </div>
            `);
        }).join(" ");


        var content = document.getElementById("contenedorMessages");
        content.innerHTML = html;
        content.scrollTop = content.scrollHeight ;
    }


    function addMessage(e){

        var encriptar = $("#selectEncript" ).val();
        alert(encriptar);
        var message = {
            nickname : document.getElementById("nickname").value,
            text : document.getElementById("text").value,
        }

        socket.emit("add-message",message);
        $("#text").val("");

        return false;
    }

    function addMessageName(){

        var message = {
            nickname : document.getElementById("nickname").value,
            text : "he cambiado de nombre a "+ document.getElementById("nickname").value,
        }

        socket.emit("add-message",message);

        return false;

    }

    $("#selectPuerto" ).change(function() {

        var puerto = $("#selectPuerto" ).val();

        var data = {};
        data.puerto = puerto;

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/cambioPuerto',						
            success: function(data) {

                var link="http://192.168.43.191:"+puerto;
                var socket = io.connect("http://192.168.43.191:"+puerto,{"forceNew":true})

                window.location.replace(link);

            }
        });

        
       // socket = io.connect("http://192.168.43.191:"+puerto,{"forceNew":true})

    });


    


