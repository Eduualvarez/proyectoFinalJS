document.addEventListener("DOMContentLoaded",function(){
let header = document.createElement("header");
header.innerHTML=`<div class="navContainer">
                    <a id="index" href ="index.html">Prestamo</a>
                    <a id="productos" href="./pages/productos.html">Productos</a>
                  
                  



</div>`
let body=document.getElementById("body");
body.appendChild(header);

window.addEventListener("storage", (event) => {
    if (event.key === "montoFinal") {
        mostrarPrestamo();
    }
});
})
