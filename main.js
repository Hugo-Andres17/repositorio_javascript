
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

    cart.forEach(product => {
        const productItem = document.createElement("li");
        productItem.textContent = `${product.name} - $${product.price} (Cantidad: ${product.quantity})`;
        productosList.appendChild(productItem);
        totalPrice += product.price * product.quantity;
    });

    totalPriceElem.textContent = `Total: $${totalPrice}`;
}


function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    showCart();
}


document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el contador del carrito con el número de productos que tenga
    const cartCount = localStorage.getItem("cartCount");
    if (cartCount) {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }

    // Asignar evento a los botones de "comprar"
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

    // Asignar evento al botón para vaciar el carrito
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener("click", clearCart);
    }

    // Mostrar el carrito al cargar la página
    showCart();
});
