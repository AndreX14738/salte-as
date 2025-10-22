// Base de datos de productos (simulando la base de datos MySQL)
let productos = [
    // PICANTE
    { id: 1, nombre: 'Salteña Picante', precio: 6.00, cantidad: 50, categoria: 'Picante', imagen: 'https://www.shutterstock.com/image-photo/typical-bolivian-empanada-traditional-snack-260nw-2494051069.jpg' },
    
    // DULCE
    { id: 4, nombre: 'Salteña Dulce', precio: 6.00, cantidad: 35, categoria: 'Dulce', imagen: 'https://www.shutterstock.com/image-photo/typical-bolivian-empanada-traditional-snack-260nw-2494051069.jpg' },
   
    
    // FRICASÉ
    { id: 7, nombre: 'Salteña de Fricasé', precio: 10.00, cantidad: 30, categoria: 'Fricasé', imagen: 'https://www.shutterstock.com/image-photo/typical-bolivian-empanada-traditional-snack-260nw-2494051069.jpg' },
    
    // ESPECIAL
    { id: 10, nombre: 'Salteña Especial Mixta', precio: 10.00, cantidad: 25, categoria: 'Especial', imagen: 'https://www.shutterstock.com/image-photo/typical-bolivian-empanada-traditional-snack-260nw-2494051069.jpg' },

     // Refresco Hervido
    { id: 11, nombre: 'Refresco Hervido', precio: 2.50, cantidad: 20, categoria: 'Refresco Hervido', imagen: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj55wHYpKTykmb_gWWo3hQUHIQOtTLRTL_ZWxYhIMVosC62k6uxlqlJyWXC6zwfwFt2Nnt8Q-jycppSXlW2z3wbYSLwq7I8NVkfo4YFapV0zomEEwc9WeZHwL6hNJNCCx1MXMSnC1gt0ik/s1600/spih13_0.jpg' },

    // Cocacola
    { id: 12, nombre: 'Cocacola', precio: 3.00, cantidad: 20, categoria: 'Gaseosas', imagen: 'https://c8.alamy.com/comp/F0DN2E/aytos-bulgaria-august-11-2015-global-brand-of-fruit-flavored-carbonated-F0DN2E.jpg' },

];

// Variables globales
let carrito = [];
let historialVentas = [];
let nextProductId = 14;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
    mostrarProductosAdmin();
    actualizarContadorCarrito();
    cargarHistorial();
    updateCategoryFilter(); // Cargar filtro de categorías
    
    // Event listeners
    document.getElementById('search-input').addEventListener('input', filtrarProductos);
    document.getElementById('category-filter').addEventListener('change', filtrarProductos);
    document.getElementById('product-form').addEventListener('submit', guardarProducto);
    document.getElementById('efectivo-recibido').addEventListener('input', calcularCambio);
    
    // Click en el carrito
    document.querySelector('.cart-container').addEventListener('click', abrirCarrito);
    
    // Cerrar modales al hacer click fuera
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// Funciones de navegación
function showSection(sectionName) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionName).classList.add('active');
    
    // Actualizar enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Actualizar contenido según la sección
    if (sectionName === 'administrar') {
        mostrarProductosAdmin();
    } else if (sectionName === 'historial') {
        mostrarHistorial();
    }
}

// Funciones de productos
function mostrarProductos() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    const productosFiltrados = filtrarProductosArray();
    
    productosFiltrados.forEach(producto => {
        const card = crearTarjetaProducto(producto);
        grid.appendChild(card);
    });
}

function crearTarjetaProducto(producto) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    const stockClass = producto.cantidad <= 5 ? 'low-stock' : '';
    const stockText = producto.cantidad <= 5 ? `¡Solo quedan ${producto.cantidad}!` : `Stock: ${producto.cantidad}`;
    
    div.innerHTML = `
        <div class="product-image">
            <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-name">${producto.nombre}</div>
            <div class="product-category">${producto.categoria}</div>
            <div class="product-price">Bs. ${producto.precio.toFixed(2)}</div>
            <div class="product-stock ${stockClass}">${stockText}</div>
        </div>
        <div class="product-actions">
            <div class="quantity-selector">
                <button class="quantity-btn" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                <input type="number" id="qty-${producto.id}" class="quantity-input" value="1" min="1" max="${producto.cantidad}">
                <button class="quantity-btn" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
            <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id})" 
                    ${producto.cantidad === 0 ? 'disabled' : ''}>
                ${producto.cantidad === 0 ? 'Sin Stock' : 'Agregar'}
            </button>
        </div>
    `;
    
    return div;
}

function cambiarCantidad(productoId, cambio) {
    const input = document.getElementById(`qty-${productoId}`);
    const producto = productos.find(p => p.id === productoId);
    let nuevaCantidad = parseInt(input.value) + cambio;
    
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    if (nuevaCantidad > producto.cantidad) nuevaCantidad = producto.cantidad;
    
    input.value = nuevaCantidad;
}

function filtrarProductosArray() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    
    return productos.filter(producto => {
        const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || producto.categoria === categoryFilter;
        return matchesSearch && matchesCategory;
    });
}

function filtrarProductos() {
    mostrarProductos();
}

// Funciones de carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const cantidadInput = document.getElementById(`qty-${productoId}`);
    const cantidad = parseInt(cantidadInput.value);
    
    if (producto.cantidad < cantidad) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    const itemExistente = carrito.find(item => item.id === productoId);
    
    if (itemExistente) {
        if (itemExistente.cantidad + cantidad > producto.cantidad) {
            alert('No hay suficiente stock para agregar más unidades');
            return;
        }
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }
    
    actualizarContadorCarrito();
    cantidadInput.value = 1;
    
    // Mostrar mensaje de éxito
    mostrarMensaje(`${producto.nombre} agregado al carrito`, 'success');
}

function actualizarContadorCarrito() {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = total;
}

function abrirCarrito() {
    mostrarCarrito();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

function mostrarCarrito() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    if (carrito.length === 0) {
        container.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        document.getElementById('cart-total').textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        div.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">Bs. ${item.precio.toFixed(2)} x ${item.cantidad} = Bs. ${subtotal.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="cambiarCantidadCarrito(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button class="quantity-btn" onclick="cambiarCantidadCarrito(${item.id}, 1)">+</button>
                <button class="btn btn-danger" onclick="removerDelCarrito(${item.id})">Eliminar</button>
            </div>
        `;
        
        container.appendChild(div);
    });
    
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function cambiarCantidadCarrito(productoId, cambio) {
    const itemCarrito = carrito.find(item => item.id === productoId);
    const producto = productos.find(p => p.id === productoId);
    
    if (!itemCarrito) return;
    
    const nuevaCantidad = itemCarrito.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        removerDelCarrito(productoId);
        return;
    }
    
    if (nuevaCantidad > producto.cantidad) {
        alert('No hay suficiente stock disponible');
        return;
    }
    
    itemCarrito.cantidad = nuevaCantidad;
    mostrarCarrito();
    actualizarContadorCarrito();
}

function removerDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    mostrarCarrito();
    actualizarContadorCarrito();
}

function clearCart() {
    carrito = [];
    mostrarCarrito();
    actualizarContadorCarrito();
}

// Funciones de pago
function showPaymentModal() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    document.getElementById('payment-modal').style.display = 'block';
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('efectivo-total').textContent = total.toFixed(2);
    document.getElementById('qr-total').textContent = total.toFixed(2);
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
    document.getElementById('payment-details').classList.add('hidden');
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
}

function selectPayment(method) {
    // Quitar selección anterior
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Seleccionar método actual
    event.target.closest('.payment-option').classList.add('selected');
    
    // Mostrar detalles del pago
    document.getElementById('payment-details').classList.remove('hidden');
    document.querySelectorAll('.payment-detail').forEach(detail => {
        detail.classList.add('hidden');
    });
    
    document.getElementById(`${method}-details`).classList.remove('hidden');
}

function calcularCambio() {
    const total = parseFloat(document.getElementById('efectivo-total').textContent);
    const recibido = parseFloat(document.getElementById('efectivo-recibido').value) || 0;
    const cambio = recibido - total;
    
    const cambioInfo = document.getElementById('cambio-info');
    const cambioAmount = document.getElementById('cambio-amount');
    
    if (recibido >= total && recibido > 0) {
        cambioInfo.classList.remove('hidden');
        cambioAmount.textContent = cambio.toFixed(2);
    } else {
        cambioInfo.classList.add('hidden');
    }
}

function processEfectivoPayment() {
    const total = parseFloat(document.getElementById('efectivo-total').textContent);
    const recibido = parseFloat(document.getElementById('efectivo-recibido').value) || 0;
    
    if (recibido < total) {
        alert('El monto recibido es insuficiente');
        return;
    }
    
    procesarVenta('Efectivo');
}

function processQRPayment() {
    procesarVenta('QR');
}

function procesarVenta(metodoPago) {
    // Actualizar stock
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        producto.cantidad -= item.cantidad;
    });
    
    // Registrar venta en historial
    const venta = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        productos: [...carrito],
        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        metodoPago: metodoPago
    };
    
    historialVentas.push(venta);
    guardarHistorial();
    
    // Limpiar carrito
    carrito = [];
    
    // Cerrar modales
    closePaymentModal();
    closeCartModal();
    
    // Actualizar displays
    actualizarContadorCarrito();
    mostrarProductos();
    mostrarProductosAdmin();
    
    // Mostrar mensaje de éxito
    mostrarMensaje(`Venta procesada exitosamente. Total: Bs. ${venta.total.toFixed(2)}`, 'success');
    
    // Limpiar campos
    document.getElementById('efectivo-recibido').value = '';
    document.getElementById('cambio-info').classList.add('hidden');
}

// Funciones de administración
function mostrarProductosAdmin() {
    const grid = document.getElementById('admin-products-grid');
    grid.innerHTML = '';
    
    productos.forEach(producto => {
        const card = crearTarjetaProductoAdmin(producto);
        grid.appendChild(card);
    });
}

function crearTarjetaProductoAdmin(producto) {
    const div = document.createElement('div');
    div.className = 'admin-product-card';
    
    const stockClass = producto.cantidad <= 5 ? 'text-danger' : producto.cantidad <= 10 ? 'text-warning' : 'text-success';
    
    div.innerHTML = `
        <div class="admin-product-image">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="admin-product-info">
            <div class="product-name">${producto.nombre}</div>
            <div class="product-category">${producto.categoria}</div>
            <div class="product-price">Bs. ${producto.precio.toFixed(2)}</div>
            <div class="product-stock ${stockClass}">Stock: ${producto.cantidad}</div>
        </div>
        <div class="admin-product-actions">
            <button class="btn btn-primary" onclick="editarProducto(${producto.id})">Editar</button>
            <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </div>
    `;
    
    return div;
}

function showAddProductModal() {
    document.getElementById('product-modal-title').textContent = 'Agregar Producto';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    // limpiar campo de URL
    const urlField = document.getElementById('product-image-url');
    if (urlField) urlField.value = '';
    document.getElementById('product-modal').style.display = 'block';
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    
    document.getElementById('product-modal-title').textContent = 'Editar Producto';
    document.getElementById('product-id').value = producto.id;
    document.getElementById('product-name').value = producto.nombre;
    document.getElementById('product-price').value = producto.precio;
    document.getElementById('product-quantity').value = producto.cantidad;
    document.getElementById('product-category').value = producto.categoria;
    // Prellenar URL de la imagen si existe
    const urlField = document.getElementById('product-image-url');
    if (urlField) urlField.value = producto.imagen && producto.imagen !== 'imagenes/productos/default-product.svg' ? producto.imagen : '';
    
    document.getElementById('product-modal').style.display = 'block';
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productos = productos.filter(p => p.id !== id);
        mostrarProductosAdmin();
        mostrarProductos();
        mostrarMensaje('Producto eliminado correctamente', 'success');
    }
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function guardarProducto(event) {
    event.preventDefault();

    const id = document.getElementById('product-id').value;
    const nombre = document.getElementById('product-name').value;
    const precio = parseFloat(document.getElementById('product-price').value);
    const cantidad = parseInt(document.getElementById('product-quantity').value);
    const categoria = document.getElementById('product-category').value;
    const imagenUrlInput = document.getElementById('product-image-url').value.trim();

    let imagenUrl = 'imagenes/productos/default-product.svg'; // imagen por defecto
    if (imagenUrlInput) {
        imagenUrl = imagenUrlInput;
    }

    if (id) {
        // Editar producto existente
        const producto = productos.find(p => p.id === parseInt(id));
        producto.nombre = nombre;
        producto.precio = precio;
        producto.cantidad = cantidad;
        producto.categoria = categoria;
        if (imagenUrlInput) {
            producto.imagen = imagenUrl;
        }
        mostrarMensaje('Producto actualizado correctamente', 'success');
    } else {
        // Agregar nuevo producto
        productos.push({
            id: nextProductId++,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            categoria: categoria,
            imagen: imagenUrl
        });
        mostrarMensaje('Producto agregado correctamente', 'success');
    }

    closeProductModal();
    mostrarProductosAdmin();
    mostrarProductos();
}

// Funciones de historial
function mostrarHistorial() {
    const container = document.getElementById('sales-history');
    
    if (historialVentas.length === 0) {
        container.innerHTML = '<p class="text-center">No hay ventas registradas</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Mostrar ventas más recientes primero
    const ventasOrdenadas = [...historialVentas].reverse();
    
    ventasOrdenadas.forEach(venta => {
        const div = document.createElement('div');
        div.className = 'sale-item';
        
        const productosTexto = venta.productos.map(p => `${p.nombre} (${p.cantidad})`).join(', ');
        
        // Formatear la fecha correctamente
        const fechaFormateada = new Date(venta.fecha).toLocaleString('es-BO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        div.innerHTML = `
            <div class="sale-info">
                <div class="sale-date">${fechaFormateada} - ${venta.metodoPago}</div>
                <div class="sale-products">${productosTexto}</div>
            </div>
            <div class="sale-total">Bs. ${venta.total.toFixed(2)}</div>
        `;
        
        container.appendChild(div);
    });
}

// Funciones de almacenamiento local
function guardarHistorial() {
    localStorage.setItem('historialVentas', JSON.stringify(historialVentas));
}

function cargarHistorial() {
    const historialGuardado = localStorage.getItem('historialVentas');
    if (historialGuardado) {
        historialVentas = JSON.parse(historialGuardado);
    }
}

function vaciarHistorial() {
    if (confirm('¿Estás seguro de que quieres vaciar todo el historial de ventas? Esta acción no se puede deshacer.')) {
        historialVentas = [];
        guardarHistorial();
        mostrarHistorial();
        mostrarMensaje('Historial vaciado correctamente', 'success');
    }
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${tipo === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    div.textContent = mensaje;
    
    document.body.appendChild(div);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Función para mostrar ganancias
function mostrarGanancias() {
    console.log('=== INICIO CÁLCULO DE GANANCIAS ===');
    
    // Obtener ventas del localStorage
    const historialGuardado = localStorage.getItem('historialVentas');
    console.log('Historial crudo del localStorage:', historialGuardado);
    
    let ventasData = [];
    
    if (historialGuardado) {
        try {
            ventasData = JSON.parse(historialGuardado);
            console.log('Ventas parseadas exitosamente:', ventasData);
        } catch (e) {
            console.error('Error al parsear historial:', e);
            alert('Error al leer el historial de ventas: ' + e.message);
            return;
        }
    }
    
    console.log('Número de ventas encontradas:', ventasData.length);
    
    if (ventasData.length === 0) {
        alert('No hay ventas registradas en localStorage. Realiza algunas ventas primero.');
        return;
    }
    
    // Mostrar detalles de cada venta
    ventasData.forEach((venta, index) => {
        console.log(`Venta ${index + 1}:`, {
            fecha: venta.fecha,
            total: venta.total,
            tipo_total: typeof venta.total
        });
    });
    
    // Calcular fechas de referencia
    const ahora = new Date();
    console.log('Fecha actual:', ahora);
    
    const inicioHoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const inicioSemana = new Date(ahora);
    inicioSemana.setDate(ahora.getDate() - ahora.getDay());
    inicioSemana.setHours(0, 0, 0, 0);
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const inicioAno = new Date(ahora.getFullYear(), 0, 1);
    
    console.log('Fechas de referencia:', {
        hoy: inicioHoy,
        semana: inicioSemana,
        mes: inicioMes,
        ano: inicioAno
    });
    
    let gananciaDia = 0;
    let gananciaSemana = 0;
    let gananciaMes = 0;
    let gananciaAno = 0;
    
    // Procesar cada venta
    ventasData.forEach((venta, index) => {
        try {
            let fechaVenta;
            
            console.log(`Procesando venta ${index + 1}, fecha original:`, venta.fecha);
            
            // Múltiples formatos de fecha soportados
            if (venta.fecha.includes('/') && venta.fecha.includes(',')) {
                // Formato: "8/10/2025, 10:18:30 p. m. - QR"
                const fechaParte = venta.fecha.split(',')[0]; // "8/10/2025"
                const fechaParts = fechaParte.split('/'); // ["8", "10", "2025"]
                fechaVenta = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
            } else if (venta.fecha.includes('/') && venta.fecha.includes(' ')) {
                // Formato: "08/10/2025 10:18:30 - QR"
                const fechaParts = venta.fecha.split(' ')[0].split('/');
                fechaVenta = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
            } else if (venta.fecha.includes('/')) {
                // Formato simple: "08/10/2025"
                const fechaParts = venta.fecha.split('/');
                fechaVenta = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
            } else {
                // Intentar parsear directamente
                fechaVenta = new Date(venta.fecha);
            }
            
            console.log(`Fecha parseada:`, fechaVenta);
            console.log(`Es válida:`, !isNaN(fechaVenta.getTime()));
            
            const totalVenta = parseFloat(venta.total) || 0;
            console.log(`Total de la venta:`, totalVenta);
            
            if (isNaN(fechaVenta.getTime())) {
                console.warn(`Fecha inválida en venta ${index + 1}:`, venta.fecha);
                return;
            }
            
            // Comparar fechas con más detalle
            console.log(`Comparaciones para venta ${index + 1}:`);
            console.log(`  fechaVenta >= inicioHoy (${inicioHoy}):`, fechaVenta >= inicioHoy);
            console.log(`  fechaVenta >= inicioSemana (${inicioSemana}):`, fechaVenta >= inicioSemana);
            console.log(`  fechaVenta >= inicioMes (${inicioMes}):`, fechaVenta >= inicioMes);
            console.log(`  fechaVenta >= inicioAno (${inicioAno}):`, fechaVenta >= inicioAno);
            
            // Comparar fechas y sumar ganancias
            if (fechaVenta >= inicioHoy) {
                gananciaDia += totalVenta;
                console.log(`✅ Sumando ${totalVenta} a ganancias del día. Total día: ${gananciaDia}`);
            }
            if (fechaVenta >= inicioSemana) {
                gananciaSemana += totalVenta;
                console.log(`✅ Sumando ${totalVenta} a ganancias de la semana. Total semana: ${gananciaSemana}`);
            }
            if (fechaVenta >= inicioMes) {
                gananciaMes += totalVenta;
                console.log(`✅ Sumando ${totalVenta} a ganancias del mes. Total mes: ${gananciaMes}`);
            }
            if (fechaVenta >= inicioAno) {
                gananciaAno += totalVenta;
                console.log(`✅ Sumando ${totalVenta} a ganancias del año. Total año: ${gananciaAno}`);
            }
            
        } catch (error) {
            console.error(`Error procesando venta ${index + 1}:`, error);
        }
    });
    
    console.log('GANANCIAS FINALES:', {
        dia: gananciaDia,
        semana: gananciaSemana,
        mes: gananciaMes,
        ano: gananciaAno
    });
    
    // Verificar que los elementos del modal existen
    const elemDia = document.getElementById('ganancia-dia');
    const elemSemana = document.getElementById('ganancia-semana');
    const elemMes = document.getElementById('ganancia-mes');
    const elemAno = document.getElementById('ganancia-ano');
    const modal = document.getElementById('ganancias-modal');
    
    console.log('Elementos del DOM:', {
        elemDia: !!elemDia,
        elemSemana: !!elemSemana,
        elemMes: !!elemMes,
        elemAno: !!elemAno,
        modal: !!modal
    });
    
    if (!elemDia || !elemSemana || !elemMes || !elemAno || !modal) {
        alert('Error: No se encontraron todos los elementos del modal en el DOM');
        return;
    }
    
    // Actualizar el modal
    elemDia.textContent = gananciaDia.toFixed(2);
    elemSemana.textContent = gananciaSemana.toFixed(2);
    elemMes.textContent = gananciaMes.toFixed(2);
    elemAno.textContent = gananciaAno.toFixed(2);
    
    console.log('Valores actualizados en el modal');
    
    // Mostrar el modal
    modal.style.display = 'block';
    console.log('Modal mostrado');
    console.log('=== FIN CÁLCULO DE GANANCIAS ===');
}

// Función para cerrar modal de ganancias
function closeGananciasModal() {
    document.getElementById('ganancias-modal').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    const modal = document.getElementById('ganancias-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ===== FUNCIONES DE GESTIÓN DE CATEGORÍAS =====

// Variable para almacenar categorías personalizadas
let categoriasPersonalizadas = JSON.parse(localStorage.getItem('categoriasPersonalizadas')) || [];

// Obtener todas las categorías (predeterminadas + personalizadas)
function getAllCategorias() {
    const categoriasPredet = [...new Set(productos.map(p => p.categoria))];
    const todasCategorias = [...categoriasPredet, ...categoriasPersonalizadas];
    return [...new Set(todasCategorias)]; // Eliminar duplicados
}

// Mostrar modal de categorías
function showCategoryModal() {
    loadCategoriesList();
    document.getElementById('category-modal').style.display = 'block';
}

// Cerrar modal de categorías
function closeCategoryModal() {
    document.getElementById('category-modal').style.display = 'none';
    document.getElementById('new-category-name').value = '';
}

// Cargar lista de categorías
function loadCategoriesList() {
    const categoriesList = document.getElementById('categories-list');
    const categorias = getAllCategorias();
    
    categoriesList.innerHTML = '';
    
    categorias.forEach(categoria => {
        const productosEnCategoria = productos.filter(p => p.categoria === categoria).length;
        const esPersonalizada = categoriasPersonalizadas.includes(categoria);
        
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <div>
                <span class="category-name">${categoria}</span>
                <span class="category-count">${productosEnCategoria} productos</span>
            </div>
            <button 
                class="delete-category-btn" 
                onclick="deleteCategory('${categoria}')"
                ${!esPersonalizada || productosEnCategoria > 0 ? 'disabled' : ''}
                title="${!esPersonalizada ? 'No se puede eliminar una categoría predeterminada' : 
                        productosEnCategoria > 0 ? 'No se puede eliminar una categoría con productos' : 'Eliminar categoría'}"
            >
                🗑️ Eliminar
            </button>
        `;
        categoriesList.appendChild(categoryItem);
    });
}

// Agregar nueva categoría
function addNewCategory() {
    const input = document.getElementById('new-category-name');
    const nombreCategoria = input.value.trim();
    
    if (!nombreCategoria) {
        alert('Por favor, ingresa un nombre para la categoría');
        input.focus();
        return;
    }
    
    if (nombreCategoria.length > 30) {
        alert('El nombre de la categoría no puede tener más de 30 caracteres');
        input.focus();
        return;
    }
    
    const categoriasExistentes = getAllCategorias();
    if (categoriasExistentes.some(cat => cat.toLowerCase() === nombreCategoria.toLowerCase())) {
        alert('Ya existe una categoría con ese nombre');
        input.focus();
        return;
    }
    
    // Agregar categoría personalizada
    categoriasPersonalizadas.push(nombreCategoria);
    localStorage.setItem('categoriasPersonalizadas', JSON.stringify(categoriasPersonalizadas));
    
    // Actualizar el select del modal de productos
    updateCategorySelect();
    
    // Actualizar el filtro de categorías en la tienda
    updateCategoryFilter();
    
    // Recargar lista de categorías
    loadCategoriesList();
    
    // Limpiar input
    input.value = '';
    
    // Mostrar mensaje de éxito
    mostrarNotificacion(`Categoría "${nombreCategoria}" agregada exitosamente`, 'success');
}

// Eliminar categoría
function deleteCategory(categoria) {
    const productosEnCategoria = productos.filter(p => p.categoria === categoria).length;
    
    if (productosEnCategoria > 0) {
        alert('No se puede eliminar una categoría que tiene productos asignados');
        return;
    }
    
    if (!categoriasPersonalizadas.includes(categoria)) {
        alert('No se puede eliminar una categoría predeterminada');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoria}"?`)) {
        // Eliminar de las categorías personalizadas
        categoriasPersonalizadas = categoriasPersonalizadas.filter(cat => cat !== categoria);
        localStorage.setItem('categoriasPersonalizadas', JSON.stringify(categoriasPersonalizadas));
        
        // Actualizar el select del modal de productos
        updateCategorySelect();
        
        // Actualizar el filtro de categorías en la tienda
        updateCategoryFilter();
        
        // Recargar lista de categorías
        loadCategoriesList();
        
        mostrarNotificacion(`Categoría "${categoria}" eliminada exitosamente`, 'success');
    }
}

// Actualizar el filtro de categorías en la página principal
function updateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        const categorias = getAllCategorias();
        const valorActual = categoryFilter.value;
        
        // Guardar las opciones estáticas
        const primeraOpcion = categoryFilter.querySelector('option[value=""]');
        
        // Limpiar todas las opciones excepto la primera
        categoryFilter.innerHTML = '';
        if (primeraOpcion) {
            categoryFilter.appendChild(primeraOpcion);
        } else {
            categoryFilter.innerHTML = '<option value="">Todas las categorías</option>';
        }
        
        // Agregar las categorías dinámicamente
        categorias.sort().forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoryFilter.appendChild(option);
        });
        
        // Restaurar valor seleccionado si existe
        if (valorActual && categorias.includes(valorActual)) {
            categoryFilter.value = valorActual;
        }
    }
}

// Actualizar el select de categorías en el modal de productos
function updateCategorySelect() {
    const categorySelect = document.getElementById('product-category');
    if (categorySelect) {
        const categorias = getAllCategorias();
        const valorActual = categorySelect.value;
        
        categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
        
        categorias.sort().forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categorySelect.appendChild(option);
        });
        
        // Restaurar valor seleccionado si existe
        if (valorActual && categorias.includes(valorActual)) {
            categorySelect.value = valorActual;
        }
    }
}

// Cerrar modal de categorías al hacer clic fuera
window.addEventListener('click', function(event) {
    const categoryModal = document.getElementById('category-modal');
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
});

// Permitir agregar categoría con Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('new-category-name');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNewCategory();
            }
        });
    }
    
    // Actualizar select de categorías al cargar
    updateCategorySelect();
    updateCategoryFilter();
});

// ===== FUNCIONES DE IMPRESIÓN PDF =====

// Mostrar modal de impresión PDF
function mostrarModalImprimirPDF() {
    document.getElementById('pdf-modal').style.display = 'block';
}

// Cerrar modal de impresión PDF
function closePDFModal() {
    document.getElementById('pdf-modal').style.display = 'none';
}

// Función para filtrar ventas por período
function filtrarVentasPorPeriodo(periodo) {
    // Si no hay ventas, retornar array vacío
    if (!historialVentas || historialVentas.length === 0) {
        return [];
    }
    
    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    
    return historialVentas.filter(venta => {
        // Intentar crear fecha de diferentes maneras para manejar diferentes formatos
        let fechaVenta;
        
        if (typeof venta.fecha === 'string') {
            // Si es string, intentar parsearlo
            fechaVenta = new Date(venta.fecha);
        } else if (venta.fecha instanceof Date) {
            fechaVenta = venta.fecha;
        } else {
            // Si no se puede parsear, incluir la venta en "todo"
            return periodo === 'todo';
        }
        
        // Verificar que la fecha es válida
        if (isNaN(fechaVenta.getTime())) {
            return periodo === 'todo';
        }
        
        switch(periodo) {
            case 'hoy':
                // Comparar solo año, mes y día
                return fechaVenta.getDate() === ahora.getDate() &&
                       fechaVenta.getMonth() === ahora.getMonth() &&
                       fechaVenta.getFullYear() === ahora.getFullYear();
                
            case 'semana':
                const inicioSemana = new Date(hoy);
                inicioSemana.setDate(hoy.getDate() - hoy.getDay());
                inicioSemana.setHours(0, 0, 0, 0);
                return fechaVenta.getTime() >= inicioSemana.getTime();
                
            case 'mes':
                return fechaVenta.getMonth() === ahora.getMonth() && 
                       fechaVenta.getFullYear() === ahora.getFullYear();
                
            case 'año':
                return fechaVenta.getFullYear() === ahora.getFullYear();
                
            case 'todo':
            default:
                return true;
        }
    });
}

// Función para imprimir PDF
function imprimirPDF(periodo, autoImprimir = false) {
    closePDFModal();
    
    // Debug: ver qué hay en el historial
    console.log('Historial completo:', historialVentas);
    console.log('Período solicitado:', periodo);
    
    const ventasFiltradas = filtrarVentasPorPeriodo(periodo);
    
    console.log('Ventas filtradas:', ventasFiltradas);
    console.log('Cantidad de ventas filtradas:', ventasFiltradas.length);
    
    if (ventasFiltradas.length === 0) {
        alert('No hay ventas registradas para el período seleccionado.\n\nTip: Asegúrate de tener ventas en el historial o intenta con "Todo el Historial".');
        return;
    }
    
    // Calcular total
    const totalVentas = ventasFiltradas.reduce((sum, venta) => sum + venta.total, 0);
    
    // Obtener nombre del período
    const nombresPeriodo = {
        'hoy': 'HOY',
        'semana': 'ESTA SEMANA',
        'mes': 'ESTE MES',
        'año': 'ESTE AÑO',
        'todo': 'TODO EL HISTORIAL'
    };
    
    // Crear contenido HTML para impresión
    const contenidoHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Historial de Ventas - ${nombresPeriodo[periodo]}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #1a1a1a;
                }
                .header {
                    text-align: center;
                    border-bottom: 3px solid #dc143c;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #dc143c;
                    margin: 0;
                    font-size: 2rem;
                }
                .header h2 {
                    color: #1a1a1a;
                    margin: 10px 0 0 0;
                    font-size: 1.5rem;
                }
                .info {
                    text-align: center;
                    margin-bottom: 30px;
                    color: #666;
                }
                .venta-item {
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 15px;
                    page-break-inside: avoid;
                }
                .venta-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #dc143c;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .venta-fecha {
                    font-weight: bold;
                    color: #1a1a1a;
                }
                .venta-total {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #dc143c;
                }
                .venta-productos {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.6;
                }
                .producto-item {
                    padding: 5px 0;
                }
                .resumen {
                    margin-top: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #1a1a1a 0%, #dc143c 100%);
                    color: white;
                    border-radius: 10px;
                    text-align: center;
                }
                .resumen h3 {
                    margin: 0 0 10px 0;
                }
                .resumen .total-final {
                    font-size: 2rem;
                    font-weight: bold;
                }
                @media print {
                    body {
                        padding: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🥟 SALTEÑERÍA VICTORIA 🥟</h1>
                <h2>Historial de Ventas - ${nombresPeriodo[periodo]}</h2>
            </div>
            
            <div class="info">
                <p><strong>Fecha de Impresión:</strong> ${new Date().toLocaleDateString('es-BO', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
                <p><strong>Total de Ventas:</strong> ${ventasFiltradas.length}</p>
            </div>
            
            ${ventasFiltradas.map(venta => `
                <div class="venta-item">
                    <div class="venta-header">
                        <span class="venta-fecha">📅 ${new Date(venta.fecha).toLocaleDateString('es-BO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                        <span class="venta-total">Bs. ${venta.total.toFixed(2)}</span>
                    </div>
                    <div class="venta-productos">
                        <strong>Productos vendidos:</strong>
                        ${venta.productos.map(producto => `
                            <div class="producto-item">
                                • ${producto.nombre} x${producto.cantidad} - Bs. ${(producto.precio * producto.cantidad).toFixed(2)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            
            <div class="resumen">
                <h3>📊 RESUMEN TOTAL</h3>
                <div class="total-final">Bs. ${totalVentas.toFixed(2)}</div>
                <p>${ventasFiltradas.length} venta${ventasFiltradas.length !== 1 ? 's' : ''} registrada${ventasFiltradas.length !== 1 ? 's' : ''}</p>
            </div>
        </body>
        </html>
    `;
    
    // Crear ventana nueva para visualización/impresión
    const ventanaImpresion = window.open('', '_blank');
    
    if (!ventanaImpresion) {
        alert('Por favor, permite las ventanas emergentes para ver/imprimir el reporte.\n\nAsegúrate de permitir ventanas emergentes en la configuración de tu navegador.');
        return;
    }
    
    ventanaImpresion.document.open();
    ventanaImpresion.document.write(contenidoHTML);
    ventanaImpresion.document.close();
    
    // Abrir diálogo de impresión automáticamente (incluye opción "Guardar como PDF")
    setTimeout(() => {
        ventanaImpresion.focus();
        ventanaImpresion.print();
    }, 500);
}