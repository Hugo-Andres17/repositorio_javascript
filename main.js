let searchTimeout;

// Función para manejar la búsqueda
function handleSearch() {
    const searchTerm = document.getElementById("searchInputNavbar").value.toLowerCase();
    const productosContainer = document.getElementById("productos-container");
    const productos = productosContainer.getElementsByClassName("card");

    let found = false; // Variable para verificar si encontramos coincidencias

    // Recorremos todos los productos y los mostramos o escondemos según la búsqueda
    for (let producto of productos) {
        const title = producto.querySelector(".card-title").textContent.toLowerCase();
        
        // Si el título contiene el término de búsqueda, mostramos el producto
        if (title.includes(searchTerm)) {
            producto.style.display = "";
            found = true;
        } else {
            producto.style.display = "none";
        }
    }

    // Si no se encontraron coincidencias, mostramos SweetAlert
    if (!found && searchTerm.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Producto no encontrado',
            text: 'No se encontraron productos con ese nombre.',
        });
    }
}

// Asignamos el evento de búsqueda a la caja de texto del formulario de búsqueda
document.getElementById("searchInputNavbar")?.addEventListener("input", function() {
    // Limpiamos el timeout anterior para que no se ejecute varias veces
    clearTimeout(searchTimeout);
    
    // Establecemos un nuevo timeout para realizar la búsqueda después de 500ms
    searchTimeout = setTimeout(handleSearch, 500);
});

// Función para agregar productos al carrito
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

// Función para actualizar el número de productos en el carrito
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

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    showCart();
}

// Función que se ejecuta cuando la página esté lista
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el contador del carrito con el número de productos que tenga
    const cartCount = localStorage.getItem("cartCount");
    if (cartCount) {
        document.getElementById("cart-count")?.textContent = cartCount;
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
