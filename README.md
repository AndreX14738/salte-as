# 🏪 Abarrotes La Caserita

Sistema de punto de venta completo para abarrotes desarrollado con HTML, CSS, JavaScript y MySQL.

![Abarrotes La Caserita](https://img.shields.io/badge/Estado-Funcional-brightgreen) ![Versión](https://img.shields.io/badge/Versión-1.0-blue) ![Licencia](https://img.shields.io/badge/Licencia-MIT-yellow)

## 📋 Descripción

Abarrotes La Caserita es una aplicación web completa para la gestión de una tienda de abarrotes que incluye:
- Sistema de ventas con carrito de compras
- Control de inventario en tiempo real
- Panel de administración para productos
- Historial de ventas
- Métodos de pago (efectivo y QR)
- Base de datos MySQL integrada

## ✨ Características

### 🛒 **Sistema de Ventas**
- Catálogo de productos con imágenes
- Búsqueda y filtros por categoría
- Carrito de compras funcional
- Control automático de stock
- Alertas de stock bajo

### 💰 **Métodos de Pago**
- **Pago en Efectivo:** Con cálculo automático de cambio
- **Pago QR:** Código QR estático para pagos digitales
- Precios en Bolivianos (Bs.)

### ⚙️ **Panel de Administración**
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos
- Gestión de imágenes por URL
- Control de categorías

### 📊 **Reportes y Historial**
- Historial completo de ventas
- Detalles de productos vendidos
- Método de pago utilizado
- Función para vaciar historial

## 🗂️ Categorías de Productos

- 🌾 **Harinas** (Trigo, Maíz, Integral, Avena)
- 🧂 **Sal y Especias** (Sal, Pimienta, Comino)
- 🫒 **Aceites** (Vegetal, Girasol, Oliva)
- 🍯 **Azúcar** (Blanca, Morena, Stevia)
- 🥫 **Enlatados y Conservas** (Atún, Sardinas, Choclo, Duraznos)
- 🍝 **Pastas y Fideos** (Spaghetti, Tallarín, Pluma, Lasaña)
- 🫘 **Legumbres Secas** (Lentejas, Frejoles, Garbanzos, Arvejas)

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** PHP 8.2+
- **Base de Datos:** MySQL 8.0+
- **Servidor:** Apache (XAMPP)
- **Imágenes:** URLs externas (Unsplash)

## 📁 Estructura del Proyecto

```
abarrotes/
├── index.html              # Página principal de la tienda
├── styles.css              # Estilos y diseño responsivo
├── script.js               # Lógica de la aplicación
├── api.php                 # API REST para MySQL
├── test_conexion.php       # Test de conexión a la base de datos
├── database.sql            # Script de creación de la base de datos
├── README.md               # Este archivo
└── imagen/
    └── 4c164396-...jpg     # Logo de la tienda
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- XAMPP (Apache + MySQL + PHP)
- Navegador web moderno
- MySQL Workbench (opcional)

### Pasos de Instalación

1. **Instalar XAMPP**
   ```bash
   # Descargar desde: https://www.apachefriends.org/
   # Instalar en C:\xampp\
   ```

2. **Clonar el proyecto**
   ```bash
   # Copiar archivos a la carpeta de XAMPP
   xcopy "ruta\del\proyecto\*" "C:\xampp\htdocs\abarrotes\" /E /H /Y
   ```

3. **Configurar la base de datos**
   ```bash
   # Abrir XAMPP Control Panel
   # Iniciar Apache y MySQL
   # Ir a http://localhost/phpmyadmin
   # Crear base de datos 'tienda_abarrotes'
   # Importar database.sql
   ```

4. **Verificar instalación**
   ```bash
   # Abrir: http://localhost/abarrotes/test_conexion.php
   # Debe mostrar: "Conexión exitosa a MySQL"
   ```

## 🎮 Uso del Sistema

### 🏪 **Acceder a la Tienda**
```
http://localhost/abarrotes/index.html
```

### 🧭 **Navegación**
- **Tienda:** Realizar ventas y gestionar carrito
- **Administrar:** Gestión de productos
- **Historial:** Ver ventas realizadas

### 💳 **Proceso de Venta**
1. Seleccionar productos y cantidades
2. Agregar al carrito
3. Proceder al pago
4. Elegir método de pago (Efectivo/QR)
5. Confirmar venta

## 🗄️ Base de Datos

### Tabla: `productos`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- nombre (VARCHAR(100))
- precio (DECIMAL(10,2))
- cantidad (INT)
- categoria (VARCHAR(50))
- imagen (TEXT)
```

### Tabla: `ventas`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- fecha (DATETIME)
- productos_json (TEXT)
- total (DECIMAL(10,2))
- metodo_pago (VARCHAR(20))
```

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `api.php?action=productos` | Obtener todos los productos |
| GET | `api.php?action=ventas` | Obtener historial de ventas |
| POST | `api.php?action=producto` | Agregar nuevo producto |
| PUT | `api.php?action=producto` | Actualizar producto |
| DELETE | `api.php?action=producto&id={id}` | Eliminar producto |
| POST | `api.php?action=venta` | Registrar nueva venta |
| DELETE | `api.php?action=ventas` | Vaciar historial |

## 🎨 Diseño y UX

- **Diseño Responsivo:** Adaptable a móviles y tablets
- **Colores Corporativos:** Azul y blanco profesional
- **Interfaz Intuitiva:** Navegación clara y botones grandes
- **Feedback Visual:** Mensajes de confirmación y alertas
- **Loading States:** Indicadores de carga para mejor UX

## 🔒 Configuración de Seguridad

### Configuración MySQL (desarrollo)
```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda_abarrotes";
```

⚠️ **Importante:** Cambiar credenciales para producción

## 🐛 Solución de Problemas

### Error: "Not Found"
```bash
# Verificar que los archivos estén en:
C:\xampp\htdocs\abarrotes\

# Verificar que Apache esté running en XAMPP
```

### Error de Conexión MySQL
```bash
# Verificar que MySQL esté running en XAMPP
# Verificar que la base de datos 'tienda_abarrotes' exista
# Revisar credenciales en api.php
```

### Productos sin imágenes
```bash
# Verificar conexión a internet (imágenes son URLs externas)
# Revisar console del navegador para errores 404
```

## 📈 Funcionalidades Futuras

- [ ] Reportes de ventas por fechas
- [ ] Múltiples métodos de pago QR
- [ ] Sistema de usuarios y roles
- [ ] Backup automático de base de datos
- [ ] Integración con APIs de pagos
- [ ] Código de barras para productos
- [ ] Sistema de descuentos y promociones

## 👥 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

