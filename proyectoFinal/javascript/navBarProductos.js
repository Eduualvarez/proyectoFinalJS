document.addEventListener("DOMContentLoaded", function () {
    let header = document.createElement("header");
    header.innerHTML = `
        <div class="navContainer">
            <a id="index" href="../index.html">Prestamo</a>
            <a id="productos" href="./productos.html">Productos</a>
            <label>Saldo: <input id="saldo" readonly></input></label>
            <h4>Carrito</h4>
            <button id="toggleButton" class="arrow-button">&#9660;</button>
            <div id="carritoDiv" class="hidden"></div>
        </div>`;
    
    let body = document.getElementById("body");
    body.appendChild(header);

    const botonCarrito = document.getElementById("toggleButton");
    const carritoContainer = document.getElementById("carritoDiv");
    
    botonCarrito.addEventListener("click", () => {
        if (carritoContainer.classList.contains("hidden")) {
            carritoContainer.classList.remove("hidden");
            botonCarrito.innerHTML = "&#9650;";
           
        } else {
            carritoContainer.classList.add("hidden");
            botonCarrito.innerHTML = "&#9660;";
        }
    });

    const obtenerCarrito = () => {
        return new Promise((resolve, reject) => {
            try {
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                resolve(carrito);
            } catch (error) {
                reject(error);
            }
        });
    };

    obtenerCarrito().then(carrito => {
       
      
        carrito.forEach(producto => {
            const productos = document.createElement("div"); 
            productos.classList.add("productos-carrito");
            productos.innerHTML = `
                                    <ul>
                                    <strong>${producto.nombre}</strong>    
                                   <p>$${producto.precio}</p>
                                     <p> Cantidad:<button class="decrementar">-</button> ${producto.cantidad}<button class="incrementar">+</button></ul>
                                     `
                                     ;
            carritoContainer.appendChild(productos);
            

        });
        const botonFinalizar = document.createElement("button");
    
        botonFinalizar.classList.add("finalizar-compra");
        botonFinalizar.innerHTML=`Finalizar compra`;
        carritoContainer.appendChild(botonFinalizar);
        botonFinalizar.addEventListener("click",()=>{
            finalizarCompra()
        })
    }).catch(error => {
        console.error("Error al obtener el carrito:", error);
    });
//boton para finalizar la compra

    const mostrarPrestamo = () => {
        const montoFinalVer = localStorage.getItem("montoFinal");
        const inputSaldo = document.getElementById("saldo");
        inputSaldo.value = montoFinalVer ? Number( montoFinalVer).toFixed(0) : "0";
    };

 
 mostrarPrestamo();

    

  
    const carritoCargado = JSON.parse(localStorage.getItem("carrito"));
    const valoresFinales=[];
    if(carritoCargado){
        carritoCargado.forEach(producto=>{
            const {precio, cantidad}=producto;
            valoresFinales.push(precio*cantidad);
        })};
     
       const sumaTotal = valoresFinales.reduce((acumulador, valorActual) => {
            return acumulador + valorActual;
        }, 0);


 function finalizarCompra ()
    {
        const saldoDisponible = document.getElementById("saldo");
        if(Number(saldoDisponible.value)>=sumaTotal)
            {
               const monto_final= (saldoDisponible.value)-sumaTotal;
               localStorage.setItem("montoFinal", monto_final);
               localStorage.removeItem("carrito");
       
          
               carritoContainer.innerHTML = ""; 
               mostrarPrestamo();
                Toastify({

                    text: `Su compra ha sido realizada con exito`,
                    close:true,
                    duration: 3000
                    
                    }).showToast();
                

            }
            else
            {Toastify({

                text: "El monto final supera el saldo disponible.",
                close:true,
                duration: 3000
                
                }).showToast();}
    };

    const actualizarCarritoEnDOM = (carrito) => {
        carritoContainer.innerHTML = ""; // Limpiar el contenido del carrito
        carrito.forEach(producto => {
            const productos = document.createElement("div");
            productos.classList.add("productos-carrito");
            productos.innerHTML = `
                <ul>
                    <strong>${producto.nombre}</strong>
                    <p>$${producto.precio}</p>
                    <p>Cantidad:
                        <button class="decrementar" data-nombre="${producto.nombre}">-</button>
                        ${producto.cantidad}
                        <button class="incrementar" data-nombre="${producto.nombre}">+</button>
                    </p>
                </ul>
            `;
            carritoContainer.appendChild(productos);
        });
    
        // Agregar el botón de finalizar compra
        const botonFinalizar = document.createElement("button");
        botonFinalizar.classList.add("finalizar-compra");
        botonFinalizar.innerHTML = `Finalizar compra`;
        carritoContainer.appendChild(botonFinalizar);
        botonFinalizar.addEventListener("click", (event) => {
            event.preventDefault();
            finalizarCompra();
         
        });
    
        // Agregar eventos para los botones de incrementar y decrementar
        document.querySelectorAll(".incrementar").forEach(boton => {
            boton.addEventListener("click", () => {
                modificarCantidad(boton.dataset.nombre, 1);
            });
        });
    
        document.querySelectorAll(".decrementar").forEach(boton => {
            boton.addEventListener("click", () => {
                modificarCantidad(boton.dataset.nombre, -1);
            });
        });
    };
    
    const modificarCantidad = (nombreProducto, cambio) => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const producto = carrito.find(p => p.nombre === nombreProducto);
        
        if (producto) {
            producto.cantidad += cambio;
            if (producto.cantidad <= 0) {
                // Eliminar producto si la cantidad es 0
                const index = carrito.indexOf(producto);
                carrito.splice(index, 1);
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarritoEnDOM(carrito); // Actualizar el DOM
        }
    };
    
    // Al cargar el carrito inicialmente
    obtenerCarrito().then(carrito => {
        actualizarCarritoEnDOM(carrito); // Inicializa el carrito en el DOM
    }).catch(error => {
        console.error("Error al obtener el carrito:", error);
    });

});