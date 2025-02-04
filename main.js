
function filterProducts() {
    const searchTerm = document.getElementById("searchInputNavbar").value.toLowerCase().trim(); 
    const productosContainers = document.querySelectorAll(".container .row"); 
    let found = false; 

    productosContainers.forEach(container => {
        const productos = container.getElementsByClassName("card"); 

        for (let producto of productos) {
            const title = producto.querySelector(".card-title").textContent.toLowerCase().trim();

           
            if (title.includes(searchTerm)) {
                producto.style.display = "";
                found = true; 
            } else {
                producto.style.display = "none"; 
            }
        }
    });

    if (!found && searchTerm.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Producto no encontrado',
            text: 'No se encontraron productos con ese nombre.',
        });
    }
}

document.getElementById("searchInputNavbar")?.addEventListener("input", function() {
    filterProducts(); 
});


// aplicacion de una API// 

fetch('https://dolarapi.com/v1/dolares/blue')
  .then(response => response.json())
  .then(data => {
    const compra = data.compra;
    const venta = data.venta

    const compraElement = document.getElementById('compra')
    const ventaElement = document.getElementById ('venta')

  ventaElement.textContent = venta;

  })
  
  .catch(error=> {
    console.error("hay un error",error)
 })

fetch('https://dolarapi.com/v1/dolares/blue')
  .then(response => response.json()) 
  .then(apiData => {

    data = apiData;

    actualizarConversion();
  })
  .catch(error => {

    console.error('Error al obtener los datos:', error);
  });

function actualizarConversion() {

  const productos = document.querySelectorAll('.card');

  productos.forEach(producto => {
    
    const precioPesos = parseFloat(producto.querySelector('.price').textContent.replace('precio: $', ''));

    
    const valorDolar = data.venta;
    const precioDolares = precioPesos / valorDolar;


    producto.querySelector('#venta').textContent = precioDolares.toFixed(2);
  });
}

let valorDolar = 0;

function obtenerValorDolar() {
    fetch('https://dolarapi.com/v1/dolares/blue')
        .then(response => response.json())
        .then(data => {
            valorDolar = data.venta; // Asignamos el valor del dólar
            showCart(); // Ahora que tenemos el valor del dólar, podemos mostrar el carrito
        })
        .catch(error => console.error('Error al obtener el valor del dólar:', error));
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    localStorage.setItem("cartCount", cartCount);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Mostrar productos en el carrito (paginados.html)
function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productosList = document.getElementById("productos-lista");
    const totalPriceElem = document.getElementById("total");
    
    productosList.innerHTML = ""; // Limpiar la lista de productos
    let totalPrice = 0;
    let totalPriceDolares = 0;

    if (valorDolar === 0) {
        console.error("El valor del dólar no está disponible.");
        return;
    }

    cart.forEach(product => {
        const productItem = document.createElement("li");
        
        const precioDolares = (product.price * product.quantity) / valorDolar;
        
        productItem.textContent = `${product.name} - $${product.price} (Cantidad: ${product.quantity})
         | $${(precioDolares).toFixed(2)} (en dólares)`;

        productosList.appendChild(productItem);

        totalPrice += product.price * product.quantity;
        
        totalPriceDolares += precioDolares;
    });

    totalPriceElem.textContent = `Total: $${totalPrice} (en pesos) | $${totalPriceDolares.toFixed(2)} (en dólares)`;
}

function clearCart() {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCount");
    updateCartCount(); // Actualizar el contador
    showCart(); // Actualizar la visualización del carrito
}

document.addEventListener("DOMContentLoaded", function() {
  
    const cartCount = localStorage.getItem("cartCount");
    if (cartCount) {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    document.querySelectorAll(".comprar-btn").forEach(button => {
        button.addEventListener("click", function() {
            const productName = button.getAttribute("data-name");
            const productPrice = parseInt(button.getAttribute("data-price"));
    
            addToCart(productName, productPrice);
            Swal.fire({
                icon: 'success',
                title: 'Producto añadido',
                text: `${productName} ha sido añadido a tu carrito.`,
            });
        });
    });

    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", clearCart);
    }

    obtenerValorDolar();
});
