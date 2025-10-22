<?php<?php<?php<?php

header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');header('Content-Type: application/json');

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

header('Access-Control-Allow-Headers: Content-Type');header('Access-Control-Allow-Origin: *');header('Content-Type: application/json');header('Content-Type: application/json');



// Configuración de la base de datosheader('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$host = 'localhost';

$dbname = 'salteneria_db';header('Access-Control-Allow-Headers: Content-Type');header('Access-Control-Allow-Origin: *');header('Access-Control-Allow-Origin: *');

$username = 'root';

$password = '';



try {// Configuración de la base de datos - SALTEÑERÍAheader('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);$servername = "localhost";

} catch(PDOException $e) {

    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));$username = "root";header('Access-Control-Allow-Headers: Content-Type');header('Access-Control-Allow-Headers: Content-Type');

}

$password = "";

// Obtener método y acción

$method = $_SERVER['REQUEST_METHOD'];$dbname = "salteneria_db";

$action = isset($_GET['action']) ? $_GET['action'] : '';



// Enrutador

switch($action) {try {// Configuración de la base de datos// Configuración de la base de datos

    case 'getProductos':

        getProductos($pdo);    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);

        break;

    case 'getVentas':    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);$servername = "localhost";$servername = "localhost";

        getVentas($pdo);

        break;    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    case 'addProducto':

        addProducto($pdo);} catch(PDOException $e) {$username = "root";$username = "root";

        break;

    case 'updateProducto':    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));

        updateProducto($pdo);

        break;}$password = "";$password = "";

    case 'deleteProducto':

        deleteProducto($pdo);

        break;

    case 'addVenta':$method = $_SERVER['REQUEST_METHOD'];$dbname = "salteneria_db";$dbname = "tienda_abarrotes";

        addVenta($pdo);

        break;$action = $_GET['action'] ?? '';

    case 'clearVentas':

        clearVentas($pdo);

        break;

    default:switch($method) {

        echo json_encode(['error' => 'Acción no válida']);

}    case 'GET':try {try {



// Funciones        if ($action === 'productos') {



function getProductos($pdo) {            getProductos();    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);    $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    $stmt = $pdo->query("SELECT * FROM productos ORDER BY nombre");

    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);        } elseif ($action === 'ventas') {

    echo json_encode($productos);

}            getVentas();    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



function getVentas($pdo) {        }

    $stmt = $pdo->query("

        SELECT v.id, v.fecha, v.total,         break;    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);} catch(PDOException $e) {

               GROUP_CONCAT(CONCAT(p.nombre, ' (', dv.cantidad, ')') SEPARATOR ', ') as productos

        FROM ventas v    

        LEFT JOIN detalle_venta dv ON v.id = dv.id_venta

        LEFT JOIN productos p ON dv.id_producto = p.id    case 'POST':} catch(PDOException $e) {    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));

        GROUP BY v.id

        ORDER BY v.fecha DESC        if ($action === 'producto') {

    ");

    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);            addProducto();    die(json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]));}

    echo json_encode($ventas);

}        } elseif ($action === 'venta') {



function addProducto($pdo) {            addVenta();}

    $data = json_decode(file_get_contents('php://input'), true);

            }

    $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)");

    $stmt->execute([        break;$method = $_SERVER['REQUEST_METHOD'];

        $data['nombre'],

        $data['descripcion'],    

        $data['precio'],

        $data['stock']    case 'PUT':$method = $_SERVER['REQUEST_METHOD'];$action = $_GET['action'] ?? '';

    ]);

            if ($action === 'producto') {

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);

}            updateProducto();$action = $_GET['action'] ?? '';



function updateProducto($pdo) {        }

    $data = json_decode(file_get_contents('php://input'), true);

            break;switch($method) {

    $stmt = $pdo->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?");

    $stmt->execute([    

        $data['nombre'],

        $data['descripcion'],    case 'DELETE':switch($method) {    case 'GET':

        $data['precio'],

        $data['stock'],        if ($action === 'producto') {

        $data['id']

    ]);            deleteProducto();    case 'GET':        if ($action === 'productos') {

    

    echo json_encode(['success' => true]);        } elseif ($action === 'ventas') {

}

            clearVentas();        if ($action === 'productos') {            getProductos();

function deleteProducto($pdo) {

    $id = isset($_GET['id']) ? $_GET['id'] : 0;        }

    

    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");        break;            getProductos();        } elseif ($action === 'ventas') {

    $stmt->execute([$id]);

    }

    echo json_encode(['success' => true]);

}        } elseif ($action === 'ventas') {            getVentas();



function addVenta($pdo) {// Obtener todos los productos

    $data = json_decode(file_get_contents('php://input'), true);

    function getProductos() {            getVentas();        }

    try {

        $pdo->beginTransaction();    global $pdo;

        

        // Insertar venta    try {        }        break;

        $stmt = $pdo->prepare("INSERT INTO ventas (total) VALUES (?)");

        $stmt->execute([$data['total']]);        $stmt = $pdo->query("SELECT * FROM productos ORDER BY id");

        $ventaId = $pdo->lastInsertId();

                echo json_encode($stmt->fetchAll());        break;    

        // Insertar detalles y actualizar stock

        $stmtDetalle = $pdo->prepare("INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)");    } catch(PDOException $e) {

        $stmtStock = $pdo->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");

                echo json_encode(['error' => $e->getMessage()]);        case 'POST':

        foreach($data['productos'] as $producto) {

            $stmtDetalle->execute([    }

                $ventaId,

                $producto['id'],}    case 'POST':        if ($action === 'producto') {

                $producto['cantidad'],

                $producto['precio']

            ]);

            // Obtener todas las ventas con detalle        if ($action === 'producto') {            addProducto();

            $stmtStock->execute([

                $producto['cantidad'],function getVentas() {

                $producto['id']

            ]);    global $pdo;            addProducto();        } elseif ($action === 'venta') {

        }

            try {

        $pdo->commit();

        echo json_encode(['success' => true, 'id' => $ventaId]);        $stmt = $pdo->query("SELECT * FROM ventas ORDER BY fecha DESC");        } elseif ($action === 'venta') {            addVenta();

        

    } catch(Exception $e) {        $ventas = $stmt->fetchAll();

        $pdo->rollBack();

        echo json_encode(['error' => 'Error al procesar la venta: ' . $e->getMessage()]);                    addVenta();        }

    }

}        foreach ($ventas as &$venta) {



function clearVentas($pdo) {            $stmt = $pdo->prepare("        }        break;

    try {

        $pdo->exec("DELETE FROM detalle_venta");                SELECT dv.*, p.nombre 

        $pdo->exec("DELETE FROM ventas");

        $pdo->exec("ALTER TABLE ventas AUTO_INCREMENT = 1");                FROM detalle_venta dv         break;    

        echo json_encode(['success' => true]);

    } catch(Exception $e) {                INNER JOIN productos p ON dv.id_producto = p.id 

        echo json_encode(['error' => 'Error al limpiar ventas: ' . $e->getMessage()]);

    }                WHERE dv.id_venta = ?        case 'PUT':

}

?>            ");


            $stmt->execute([$venta['id']]);    case 'PUT':        if ($action === 'producto') {

            $venta['productos'] = $stmt->fetchAll();

        }        if ($action === 'producto') {            updateProducto();

        

        echo json_encode($ventas);            updateProducto();        }

    } catch(PDOException $e) {

        echo json_encode(['error' => $e->getMessage()]);        }        break;

    }

}        break;    



// Agregar producto        case 'DELETE':

function addProducto() {

    global $pdo;    case 'DELETE':        if ($action === 'producto') {

    $data = json_decode(file_get_contents('php://input'), true);

            if ($action === 'producto') {            deleteProducto();

    try {

        $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)");            deleteProducto();        } elseif ($action === 'ventas') {

        $stmt->execute([

            $data['nombre'],        } elseif ($action === 'ventas') {            clearVentas();

            $data['descripcion'] ?? '',

            $data['precio'],            clearVentas();        }

            $data['stock']

        ]);        }        break;

        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);

    } catch(PDOException $e) {        break;}

        echo json_encode(['error' => $e->getMessage()]);

    }}

}

function getProductos() {

// Actualizar producto

function updateProducto() {// ========== FUNCIONES PRODUCTOS ==========    global $pdo;

    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);    $stmt = $pdo->query("SELECT * FROM productos ORDER BY categoria, nombre");

    

    try {// Obtener todos los productos    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

        $stmt = $pdo->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?");

        $stmt->execute([function getProductos() {}

            $data['nombre'],

            $data['descripcion'] ?? '',    global $pdo;

            $data['precio'],

            $data['stock'],    try {function getVentas() {

            $data['id']

        ]);        $stmt = $pdo->query("SELECT * FROM productos ORDER BY id");    global $pdo;

        echo json_encode(['success' => true]);

    } catch(PDOException $e) {        $productos = $stmt->fetchAll();    $stmt = $pdo->query("SELECT * FROM ventas ORDER BY fecha DESC");

        echo json_encode(['error' => $e->getMessage()]);

    }        echo json_encode($productos);    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

}

    } catch(PDOException $e) {}

// Eliminar producto

function deleteProducto() {        echo json_encode(['error' => $e->getMessage()]);

    global $pdo;

    $id = $_GET['id'] ?? 0;    }function addProducto() {

    

    try {}    global $pdo;

        $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");

        $stmt->execute([$id]);    $data = json_decode(file_get_contents('php://input'), true);

        echo json_encode(['success' => true]);

    } catch(PDOException $e) {// Agregar producto    

        echo json_encode(['error' => $e->getMessage()]);

    }function addProducto() {    $stmt = $pdo->prepare("INSERT INTO productos (nombre, precio, cantidad, categoria, imagen) VALUES (?, ?, ?, ?, ?)");

}

    global $pdo;    $stmt->execute([

// Registrar nueva venta

function addVenta() {    $data = json_decode(file_get_contents('php://input'), true);        $data['nombre'],

    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);            $data['precio'],

    

    try {    try {        $data['cantidad'],

        $pdo->beginTransaction();

                $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)");        $data['categoria'],

        // Insertar venta

        $stmt = $pdo->prepare("INSERT INTO ventas (total) VALUES (?)");        $stmt->execute([        $data['imagen'] ?? 'imagenes/productos/default-product.svg'

        $stmt->execute([$data['total']]);

        $id_venta = $pdo->lastInsertId();            $data['nombre'],    ]);

        

        // Insertar detalle de venta y actualizar stock            $data['descripcion'] ?? '',    

        $stmt_detalle = $pdo->prepare("

            INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario)             $data['precio'],    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);

            VALUES (?, ?, ?, ?)

        ");            $data['stock']}

        

        $stmt_stock = $pdo->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");        ]);

        

        foreach ($data['productos'] as $producto) {        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);function updateProducto() {

            $stmt_detalle->execute([

                $id_venta,    } catch(PDOException $e) {    global $pdo;

                $producto['id'],

                $producto['cantidad'],        echo json_encode(['error' => $e->getMessage()]);    $data = json_decode(file_get_contents('php://input'), true);

                $producto['precio']

            ]);    }    

            

            $stmt_stock->execute([}    $stmt = $pdo->prepare("UPDATE productos SET nombre=?, precio=?, cantidad=?, categoria=?, imagen=? WHERE id=?");

                $producto['cantidad'],

                $producto['id']    $stmt->execute([

            ]);

        }// Actualizar producto        $data['nombre'],

        

        $pdo->commit();function updateProducto() {        $data['precio'],

        echo json_encode(['success' => true, 'id' => $id_venta]);

    } catch(PDOException $e) {    global $pdo;        $data['cantidad'],

        $pdo->rollBack();

        echo json_encode(['error' => $e->getMessage()]);    $data = json_decode(file_get_contents('php://input'), true);        $data['categoria'],

    }

}            $data['imagen'],



// Vaciar historial de ventas    try {        $data['id']

function clearVentas() {

    global $pdo;        $stmt = $pdo->prepare("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?");    ]);

    try {

        $pdo->exec("DELETE FROM ventas");        $stmt->execute([    

        echo json_encode(['success' => true]);

    } catch(PDOException $e) {            $data['nombre'],    echo json_encode(['success' => true]);

        echo json_encode(['error' => $e->getMessage()]);

    }            $data['descripcion'] ?? '',}

}

?>            $data['precio'],


            $data['stock'],function deleteProducto() {

            $data['id']    global $pdo;

        ]);    $id = $_GET['id'];

        echo json_encode(['success' => true]);    

    } catch(PDOException $e) {    $stmt = $pdo->prepare("DELETE FROM productos WHERE id=?");

        echo json_encode(['error' => $e->getMessage()]);    $stmt->execute([$id]);

    }    

}    echo json_encode(['success' => true]);

}

// Eliminar producto

function deleteProducto() {function addVenta() {

    global $pdo;    global $pdo;

    $id = $_GET['id'] ?? 0;    $data = json_decode(file_get_contents('php://input'), true);

        

    try {    // Actualizar stock de productos

        $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");    foreach($data['productos'] as $item) {

        $stmt->execute([$id]);        $stmt = $pdo->prepare("UPDATE productos SET cantidad = cantidad - ? WHERE id = ?");

        echo json_encode(['success' => true]);        $stmt->execute([$item['cantidad'], $item['id']]);

    } catch(PDOException $e) {    }

        echo json_encode(['error' => $e->getMessage()]);    

    }    // Registrar venta

}    $stmt = $pdo->prepare("INSERT INTO ventas (productos_json, total, metodo_pago) VALUES (?, ?, ?)");

    $stmt->execute([

// ========== FUNCIONES VENTAS ==========        json_encode($data['productos']),

        $data['total'],

// Obtener todas las ventas con sus detalles        $data['metodoPago']

function getVentas() {    ]);

    global $pdo;    

    try {    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);

        // Obtener ventas}

        $stmt = $pdo->query("SELECT * FROM ventas ORDER BY fecha DESC");

        $ventas = $stmt->fetchAll();function clearVentas() {

            global $pdo;

        // Para cada venta, obtener sus productos    $stmt = $pdo->prepare("DELETE FROM ventas");

        foreach ($ventas as &$venta) {    $stmt->execute();

            $stmt = $pdo->prepare("    echo json_encode(['success' => true]);

                SELECT dv.*, p.nombre }

                FROM detalle_venta dv ?>http://localhost/abarrotes/
                INNER JOIN productos p ON dv.id_producto = p.id 
                WHERE dv.id_venta = ?
            ");
            $stmt->execute([$venta['id']]);
            $venta['productos'] = $stmt->fetchAll();
        }
        
        echo json_encode($ventas);
    } catch(PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Registrar nueva venta
function addVenta() {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $pdo->beginTransaction();
        
        // Insertar venta
        $stmt = $pdo->prepare("INSERT INTO ventas (total) VALUES (?)");
        $stmt->execute([$data['total']]);
        $id_venta = $pdo->lastInsertId();
        
        // Insertar detalle de venta y actualizar stock
        $stmt_detalle = $pdo->prepare("
            INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt_stock = $pdo->prepare("UPDATE productos SET stock = stock - ? WHERE id = ?");
        
        foreach ($data['productos'] as $producto) {
            // Insertar detalle
            $stmt_detalle->execute([
                $id_venta,
                $producto['id'],
                $producto['cantidad'],
                $producto['precio']
            ]);
            
            // Actualizar stock
            $stmt_stock->execute([
                $producto['cantidad'],
                $producto['id']
            ]);
        }
        
        $pdo->commit();
        echo json_encode(['success' => true, 'id' => $id_venta]);
    } catch(PDOException $e) {
        $pdo->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}

// Vaciar historial de ventas
function clearVentas() {
    global $pdo;
    try {
        $pdo->exec("DELETE FROM ventas");
        echo json_encode(['success' => true]);
    } catch(PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
