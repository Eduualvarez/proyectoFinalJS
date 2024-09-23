
document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body");
    const sectionProductos = document.createElement("section");
    sectionProductos.className = "sectionContainer";
    body.appendChild(sectionProductos);

    fetch('../productosjson/productos.json')
        .then(response => response.json())
        .then(json => {
            json.forEach(element => {
                const divCard = document.createElement("div");
                divCard.className = "card";
                divCard.innerHTML = `
                    <img src="${element.url}" alt="${element.nombre}"></img>
                    <h3>${element.nombre}</h3>
                    <p>Precio: $${element.precio}</p>
                    <button class="agregarProducto" value="${element.id}" 
                    data-nombre="${element.nombre}" data-precio="${element.precio}">
                    Agregar al carrito</button>
                `;
                sectionProductos.appendChild(divCard);

       
                const boton = divCard.querySelector(".agregarProducto");
                boton.addEventListener("click", () => {
                    const id = boton.value;
                    const nombre = boton.getAttribute("data-nombre");
                    const precio = boton.getAttribute("data-precio");
                    localStorage.setItem(`producto ${id}`, JSON.stringify({ nombre, precio }));


                          
                    // Obtener el carrito del localStorage
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                    let cantidad = 1;
                    // Crear el nuevo producto
                    const nuevoProducto = { nombre, precio, cantidad };
                    
                    // Agregar el nuevo producto al carrito
                    carrito.push(nuevoProducto);
                    
                    // Guardar el carrito actualizado en localStorage
                    localStorage.setItem('carrito', JSON.stringify(carrito));

                });
             
                
            });
         


          

        });
});







