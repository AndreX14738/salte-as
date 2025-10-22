# 🥟 Salteñería Victoria

Sistema de punto de venta completo para salteñería desarrollado con HTML, CSS, JavaScript y MySQL.

![Salteñería Victoria](https://img.shields.io/badge/Estado-Funcional-brightgreen) ![Versión](https://img.shields.io/badge/Versión-1.0-blue) ![Licencia](https://img.shields.io/badge/Licencia-MIT-yellow)

## 📋 Descripción

Salteñería Victoria es una aplicación web completa para la gestión de una salteñería boliviana que incluye:
- Sistema de ventas con carrito de compras
- Control de inventario en tiempo real
- Panel de administración para productos
- Historial de ventas con descarga de PDF
- Métodos de pago (efectivo y QR)
- Base de datos MySQL integrada
- Diseño responsive optimizado para celulares

## ✨ Características

### 🛒 **Sistema de Ventas**
- Catálogo de salteñas y bebidas
- Búsqueda y filtros por tipo
- Carrito de compras funcional
- Control automático de stock
- Alertas de stock bajo

### 💰 **Métodos de Pago**
- **Pago en Efectivo:** Con cálculo automático de cambio
- **Pago QR:** Código QR personalizado para pagos digitales
- Precios en Bolivianos (Bs.)

### ⚙️ **Panel de Administración**
- Agregar nuevas salteñas y productos
- Editar productos existentes
- Eliminar productos
- Control de precios y stock

### 📊 **Reportes y Historial**
- Historial completo de ventas
- Detalles de productos vendidos
- Descarga de PDF por períodos (Hoy, Semana, Mes, Año, Todo)
- Función para vaciar historial
- Formato profesional para impresión

## 🥟 Productos Disponibles

- �️ **Salteña Picante** - Salteña tradicional con relleno picante (Bs. 5.00)
- 🍬 **Salteña Dulce** - Salteña con un toque dulce y suave (Bs. 5.00)
- 🍖 **Salteña de Fricasé** - Salteña con sabor al fricasé boliviano (Bs. 6.00)
- ☕ **Refresco Hervido** - Refresco caliente tradicional (Bs. 3.00)
- � **Coca-Cola** - Gaseosa Coca-Cola 500ml (Bs. 5.00)
- � **Fanta** - Gaseosa Fanta sabor naranja 500ml (Bs. 5.00)
- 💚 **Sprite** - Gaseosa Sprite 500ml (Bs. 5.00)

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** PHP 8.2+
- **Base de Datos:** MySQL 8.0+
- **Servidor:** Apache (XAMPP)
- **Colores:** Rojo (#dc143c), Negro (#1a1a1a), Blanco
- **Diseño:** Responsive para celulares y tablets

## 📁 Estructura del Proyecto

```
salteneria/
├── index.html              # Página principal de la salteñería
├── styles.css              # Estilos con tema rojo/negro/blanco
├── script.js               # Lógica de la aplicación
├── api.php                 # API REST para MySQL
├── test_conexion.php       # Test de conexión a la base de datos
├── database.sql            # Script de creación de la base de datos
├── README.md               # Este archivo
└── imagen/
    ├── WhatsApp Image...   # Logo de Salteñería Victoria
    └── Captura de...       # Código QR para pagos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- XAMPP (Apache + MySQL + PHP)
- Navegador web moderno
- Conexión a internet (para librerías CDN)

### Pasos de Instalación

1. **Instalar XAMPP**
   ```bash
   # Descargar desde: https://www.apachefriends.org/
   # Instalar en C:\xampp\
   ```

2. **Copiar el proyecto**
   ```bash
   # Copiar archivos a la carpeta de XAMPP
   xcopy "C:\Users\TuUsuario\Desktop\salteñas\*" "C:\xampp\htdocs\salteneria\" /E /H /Y
   ```

3. **Configurar la base de datos**
   ```bash
   # 1. Abrir XAMPP Control Panel
   # 2. Iniciar Apache y MySQL (deben estar en verde)
   # 3. Ir a http://localhost/phpmyadmin
   # 4. Hacer clic en "Importar"
   # 5. Seleccionar el archivo database.sql
   # 6. Hacer clic en "Continuar"
   # 7. Verificar que se creó 'salteneria_db'
   ```

4. **Verificar instalación**
   ```bash
   # Abrir: http://localhost/salteneria/test_conexion.php
   # Debe mostrar: "✅ Conexión exitosa a MySQL"
   # Y mostrar: "Base de datos salteneria_db encontrada"
   ```

## 🎮 Uso del Sistema

### 🏪 **Acceder a la Salteñería**
```
http://localhost/salteneria/index.html
```

### 📱 **Desde Celular (misma red WiFi)**
```
http://192.168.0.8/salteneria/index.html
```
*(Reemplaza 192.168.0.8 con la IP de tu computadora)*

### 🧭 **Navegación**
- **Tienda:** Realizar ventas y gestionar carrito
- **Administrar:** Gestión de productos y stock
- **Historial:** Ver ventas y descargar PDF

### 💳 **Proceso de Venta**
1. Seleccionar salteñas y cantidades
2. Agregar al carrito
3. Proceder al pago
4. Elegir método de pago (Efectivo/QR)
5. Confirmar venta
6. Stock se actualiza automáticamente

## 🗄️ Base de Datos

### Base de datos: `salteneria_db`

### Tabla: `productos`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- nombre (VARCHAR(100))
- descripcion (TEXT)
- precio (DECIMAL(10,2))
- stock (INT)
```

### Tabla: `ventas`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- fecha (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- total (DECIMAL(10,2))
```

### Tabla: `detalle_venta`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- id_venta (INT, FOREIGN KEY)
- id_producto (INT, FOREIGN KEY)
- cantidad (INT)
- precio_unitario (DECIMAL(10,2))
- subtotal (DECIMAL(10,2), GENERATED)
```

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `api.php?action=getProductos` | Obtener todas las salteñas |
| GET | `api.php?action=getVentas` | Obtener historial de ventas |
| POST | `api.php?action=addProducto` | Agregar nueva salteña |
| PUT | `api.php?action=updateProducto` | Actualizar producto |
| DELETE | `api.php?action=deleteProducto&id={id}` | Eliminar producto |
| POST | `api.php?action=addVenta` | Registrar nueva venta |
| DELETE | `api.php?action=clearVentas` | Vaciar historial |

## 🎨 Diseño y UX

- **Diseño Responsivo:** Optimizado para celulares
- **Colores Corporativos:** Rojo (#dc143c), Negro, Blanco
- **Header Compacto:** Optimizado para pantallas pequeñas
- **Interfaz Intuitiva:** Botones grandes para fácil uso
- **Feedback Visual:** Mensajes de confirmación y alertas
- **Loading States:** Indicadores de carga
- **PDF Descargable:** Historial de ventas en formato PDF

## 📱 Optimización Móvil

- Header reducido en celulares (32px de logo)
- Textos más pequeños pero legibles
- Espaciado optimizado
- Botones táctiles grandes
- Grids adaptables
- PDF descargable desde celular

## 🔒 Configuración de Seguridad

### Configuración MySQL (desarrollo)
```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "salteneria_db";
```

⚠️ **Importante:** Cambiar credenciales para producción

## 🐛 Solución de Problemas

### Error: "Not Found"
```bash
# Verificar que los archivos estén en:
C:\xampp\htdocs\salteneria\

# Verificar que Apache esté running (verde) en XAMPP
```

### Error de Conexión MySQL
```bash
# 1. Verificar que MySQL esté running (verde) en XAMPP
# 2. Verificar que la base de datos 'salteneria_db' exista en phpMyAdmin
# 3. Revisar credenciales en api.php
# 4. Probar: http://localhost/salteneria/test_conexion.php
```

### El PDF no se descarga
```bash
# EN CELULAR:
# 1. Abrir los 3 puntos (⋮) en el navegador
# 2. Seleccionar "Compartir" o "Imprimir"
# 3. Elegir "Guardar como PDF"

# EN PC:
# 1. Presionar Ctrl+P
# 2. Seleccionar "Guardar como PDF"
# 3. Hacer clic en "Guardar"
```

### No puedo acceder desde el celular
```bash
# 1. Asegúrate de que el celular esté en la misma red WiFi
# 2. Obtén la IP de tu PC con: ipconfig (Windows) o ifconfig (Mac/Linux)
# 3. Usa: http://TU_IP/salteneria/index.html
# Ejemplo: http://192.168.0.8/salteneria/index.html
```

### El header se ve muy grande en celular
```bash
# Ya está optimizado. Si aún se ve grande:
# 1. Limpia el caché del navegador
# 2. Recarga la página (F5 o desliza hacia abajo)
# 3. Verifica que styles.css esté actualizado
```

## 📈 Funcionalidades Futuras

- [ ] Integración con impresora térmica
- [ ] Sistema de usuarios y roles (admin, cajero)
- [ ] Reportes de ventas por fechas personalizadas
- [ ] Backup automático de base de datos
- [ ] Integración con pasarelas de pago
- [ ] Sistema de descuentos y promociones
- [ ] Programa de fidelidad de clientes
- [ ] Notificaciones de stock bajo por WhatsApp
- [ ] Dashboard con gráficos de ventas

## 🌟 Características Destacadas

- ✅ **100% Responsive** - Funciona perfectamente en celulares
- ✅ **Sin conexión a internet** - Funciona en red local
- ✅ **Base de datos MySQL** - Datos persistentes
- ✅ **PDF Descargable** - Reportes profesionales
- ✅ **Código QR Personalizado** - Para pagos digitales
- ✅ **Control de Stock** - Actualizaciones automáticas
- ✅ **Colores de Marca** - Diseño personalizado rojo/negro

## 👥 Créditos

**Salteñería Victoria** - Sistema desarrollado con tecnologías web modernas

**Desarrollado por:** [Tu Nombre]
**Año:** 2025
**Ubicación:** Bolivia 🇧🇴

## 📞 Soporte

Para soporte o consultas, contacta a través de:
- **WhatsApp:** [Tu número]
- **Email:** [Tu email]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - puedes usarlo libremente para tu negocio.

---

### 🥟 ¡Gracias por usar Salteñería Victoria! 🥟

*"Las mejores salteñas con el mejor sistema de ventas"*

