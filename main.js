
// Función para filtrar productos por el título
function filtrar(event) {
    event.preventDefault(); // Prevenir el envío del formulario y recarga de la página
    
    // Obtener el valor del campo de búsqueda
    let productoabuscar = document.getElementById("searchInputNavbar").value.trim().toLowerCase();
    
    // Obtener todas las tarjetas de producto
    let cards = document.querySelectorAll(".card");

    // Recorrer todas las tarjetas
    cards.forEach(card => {
        // Obtener el título de cada tarjeta
        let titulo = card.querySelector(".card-title").textContent.trim().toLowerCase();
        
        // Comprobar si el título contiene el texto de búsqueda
        if (titulo.includes(productoabuscar)) {
            card.style.display = "block";  // Mostrar la tarjeta
        } else {
            card.style.display = Swal.fire({
                icon: "error",
                title: "Producto no encontrado",
                text: "No hay ningun producto que coincida con los datos ingresados",
                footer: '<a href="index.html">Buscar nuevamente</a>'
              });
              ;   // Ocultar la tarjeta
        }
    });
}

// Agregar un "event listener" al formulario de búsqueda
document.querySelector("form[role='search']").addEventListener("submit", filtrar);


let cart = [];

// Función para manejar el clic en el botón "Comprar"
function handleBuyClick(event) {
    const productName = event.target.getAttribute('data-name');
    const productPrice = parseInt(event.target.getAttribute('data-price'));

    // Crear un objeto de producto
    const product = {
        name: productName,
        price: productPrice
    };

    // Agregar el producto al carrito
    cart.push(product);

    // Guardar el carrito en localStorage
    saveCartToLocalStorage();

    // Actualizar la lista del carrito
    updateCart();
}

// Función para actualizar el carrito en la interfaz de usuario
function updateCart() {
    const cartList = document.getElementById('cartItemsList');
    cartList.innerHTML = ''; // Limpiar la lista actual

    let total = 0;

    // Crear los elementos de la lista para cada producto
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            ${item.name} - $${item.price}
            <button class="btn btn-danger btn-sm float-end" onclick="removeItem(${index})">Eliminar</button>
        `;
        cartList.appendChild(listItem);
        total += item.price;
    });

    // Mostrar el total del carrito
    document.getElementById('totalPrice').textContent = total;
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    cart.splice(index, 1); // Eliminar el producto del carrito
    saveCartToLocalStorage(); // Guardar el carrito actualizado en localStorage
    updateCart(); // Actualizar la vista del carrito
}

// Función para vaciar el carrito
function clearCart() {
    cart = []; // Vaciar el carrito
    saveCartToLocalStorage(); // Guardar el carrito vacío en localStorage
    updateCart(); // Actualizar la vista del carrito
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    // Convertir el carrito a una cadena JSON y guardarlo en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
    // Verificar si hay un carrito guardado en localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        // Convertir la cadena JSON en un array y asignarlo a la variable cart
        cart = JSON.parse(storedCart);
        // Actualizar la vista del carrito
        updateCart();
    }
}

// Asegúrate de que el evento de clic en los botones "Comprar" se añade después de que los elementos sean cargados
window.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito desde localStorage cuando la página se carga
    loadCartFromLocalStorage();

    // Añadir el evento de clic a cada botón de "Comprar"
    const buyButtons = document.querySelectorAll('.comprar-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyClick);
    });

    // Añadir evento para vaciar el carrito
    document.getElementById('clearCart').addEventListener('click', clearCart);
});

