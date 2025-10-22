<!DOCTYPE html><!DOCTYPE html><?php<?php

<html lang="es">

<head><html lang="es">

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0"><head>// Test de conexión a base de datos - SALTEÑERÍA VICTORIA// Archivo de conexión simple a MySQL

    <title>Test Conexión - Salteñería Victoria</title>

    <style>    <meta charset="UTF-8">

        * {

            margin: 0;    <title>Test de Conexión - Salteñería Victoria</title>$servername = "localhost";$servername = "localhost";

            padding: 0;

            box-sizing: border-box;    <style>

        }

        body {        body {$username = "root";$username = "root";

            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

            background: linear-gradient(135deg, #1a1a1a 0%, #dc143c 100%);            font-family: Arial, sans-serif;

            min-height: 100vh;

            display: flex;            max-width: 800px;$password = "";$password = "";

            justify-content: center;

            align-items: center;            margin: 50px auto;

            padding: 20px;

        }            padding: 20px;$dbname = "salteneria_db";

        .container {

            background: white;            background: linear-gradient(135deg, #1a1a1a 0%, #dc143c 100%);

            border-radius: 15px;

            padding: 40px;            color: white;

            max-width: 600px;

            width: 100%;        }try {try {

            box-shadow: 0 10px 30px rgba(0,0,0,0.3);

        }        .container {

        h1 {

            color: #dc143c;            background: white;    $conn = new mysqli($servername, $username, $password, $dbname);    // Crear conexión

            margin-bottom: 30px;

            text-align: center;            color: #1a1a1a;

            font-size: 28px;

        }            padding: 30px;        $conn = new mysqli($servername, $username, $password, $dbname);

        .status {

            padding: 15px;            border-radius: 10px;

            border-radius: 8px;

            margin: 15px 0;            box-shadow: 0 4px 6px rgba(0,0,0,0.3);    if ($conn->connect_error) {    

            font-size: 16px;

        }        }

        .success {

            background: #d4edda;        h1 { color: #dc143c; }        die("❌ Conexión fallida: " . $conn->connect_error);    // Verificar conexión

            color: #155724;

            border-left: 4px solid #28a745;        .success { color: #28a745; font-weight: bold; }

        }

        .error {        .error { color: #dc143c; font-weight: bold; }    }    if ($conn->connect_error) {

            background: #f8d7da;

            color: #721c24;        .info { background: #f8f9fa; padding: 15px; border-left: 4px solid #dc143c; margin: 10px 0; }

            border-left: 4px solid #dc143c;

        }    </style>            die("Conexión fallida: " . $conn->connect_error);

        .info {

            background: #fff3cd;</head>

            color: #856404;

            border-left: 4px solid #ffc107;<body>    echo "<h2 style='color: #dc143c;'>✅ Conexión exitosa a MySQL</h2>";    }

        }

        .data {    <div class="container">

            background: #f8f9fa;

            padding: 20px;        <h1>🥟 Salteñería Victoria - Test de Conexión</h1>    echo "<h3>🥟 Salteñería Victoria</h3>";    

            border-radius: 8px;

            margin: 20px 0;        

        }

        .data p {        <?php    echo "<p>Base de datos: <strong>$dbname</strong></p>";    echo "<h2>✅ Conexión exitosa a MySQL</h2>";

            margin: 10px 0;

            font-size: 16px;        $servername = "localhost";

        }

        .data strong {        $username = "root";    echo "<p>Servidor: <strong>$servername</strong></p>";    echo "<p>Base de datos: <strong>$dbname</strong></p>";

            color: #dc143c;

        }        $password = "";

        a {

            display: inline-block;        $dbname = "salteneria_db";    echo "<hr>";    echo "<p>Servidor: <strong>$servername</strong></p>";

            background: #dc143c;

            color: white;

            padding: 12px 30px;

            text-decoration: none;        // Crear conexión        

            border-radius: 5px;

            margin-top: 20px;        $conn = new mysqli($servername, $username, $password);

            transition: background 0.3s;

        }    // Mostrar productos    // Mostrar productos de la base de datos

        a:hover {

            background: #b01030;        // Verificar conexión

        }

        ol {        if ($conn->connect_error) {    echo "<h3>📦 Productos en la base de datos:</h3>";    echo "<h3>📦 Productos en la base de datos:</h3>";

            margin: 15px 0;

            padding-left: 25px;            echo "<p class='error'>❌ Error de conexión: " . $conn->connect_error . "</p>";

        }

        ol li {            die();    $result = $conn->query("SELECT COUNT(*) as total FROM productos");    $result = $conn->query("SELECT COUNT(*) as total FROM productos");

            margin: 8px 0;

            color: #333;        }

        }

    </style>    if ($result) {    if ($result) {

</head>

<body>        echo "<p class='success'>✅ Conexión exitosa a MySQL</p>";

    <div class="container">

        <h1>🥟 Salteñería Victoria</h1>        $row = $result->fetch_assoc();        $row = $result->fetch_assoc();

        <h2 style="text-align: center; color: #666; margin-bottom: 30px;">Test de Conexión a Base de Datos</h2>

                // Verificar si existe la base de datos

        <?php

        $servername = "localhost";        $result = $conn->query("SHOW DATABASES LIKE 'salteneria_db'");        echo "<p>Total de productos: <strong>" . $row['total'] . "</strong></p>";        echo "<p>Total de productos: <strong>" . $row['total'] . "</strong></p>";

        $username = "root";

        $password = "";        

        $dbname = "salteneria_db";

        if ($result->num_rows == 0) {    }    }

        // Intentar conectar a MySQL

        $conn = new mysqli($servername, $username, $password);            echo "<div class='info'>";



        // Verificar conexión            echo "<p>⚠️ La base de datos <strong>salteneria_db</strong> no existe aún.</p>";        

        if ($conn->connect_error) {

            echo '<div class="status error">';            echo "<p><strong>Pasos para crear la base de datos:</strong></p>";

            echo '❌ <strong>Error de conexión a MySQL:</strong><br>';

            echo $conn->connect_error;            echo "<ol>";    // Mostrar ventas    // Mostrar ventas de la base de datos  

            echo '</div>';

            echo '<div class="info">';            echo "<li>Ve a <a href='http://localhost/phpmyadmin' target='_blank'>phpMyAdmin</a></li>";

            echo '<p><strong>Solución:</strong></p>';

            echo '<ol>';            echo "<li>Haz clic en 'Importar' en el menú superior</li>";    echo "<h3>💰 Ventas en la base de datos:</h3>";    echo "<h3>💰 Ventas en la base de datos:</h3>";

            echo '<li>Asegúrate de que XAMPP esté iniciado</li>';

            echo '<li>Verifica que MySQL esté corriendo (verde en XAMPP Control)</li>';            echo "<li>Selecciona el archivo <strong>database.sql</strong></li>";

            echo '<li>Si el problema persiste, reinicia Apache y MySQL</li>';

            echo '</ol>';            echo "<li>Haz clic en 'Continuar'</li>";    $result = $conn->query("SELECT COUNT(*) as total FROM ventas");    $result = $conn->query("SELECT COUNT(*) as total FROM ventas");

            echo '</div>';

            die();            echo "</ol>";

        }

            echo "</div>";    if ($result) {    if ($result) {

        echo '<div class="status success">✅ <strong>Conexión exitosa a MySQL</strong></div>';

        } else {

        // Verificar si existe la base de datos

        $result = $conn->query("SHOW DATABASES LIKE '$dbname'");            // Conectar a la base de datos        $row = $result->fetch_assoc();        $row = $result->fetch_assoc();

        

        if ($result->num_rows == 0) {            $conn->select_db($dbname);

            echo '<div class="status error">';

            echo '❌ <strong>La base de datos "salteneria_db" no existe</strong>';            echo "<p class='success'>✅ Base de datos <strong>salteneria_db</strong> encontrada</p>";        echo "<p>Total de ventas: <strong>" . $row['total'] . "</strong></p>";        echo "<p>Total de ventas: <strong>" . $row['total'] . "</strong></p>";

            echo '</div>';

            echo '<div class="info">';            

            echo '<p><strong>Pasos para crear la base de datos:</strong></p>';

            echo '<ol>';            // Contar productos    }    }

            echo '<li>Ve a <a href="http://localhost/phpmyadmin" target="_blank" style="display:inline; padding:5px 10px; margin:0;">phpMyAdmin</a></li>';

            echo '<li>Haz clic en "Importar" en el menú superior</li>';            $result = $conn->query("SELECT COUNT(*) as total FROM productos");

            echo '<li>Selecciona el archivo <strong>database.sql</strong> de tu carpeta del proyecto</li>';

            echo '<li>Haz clic en "Continuar"</li>';            if ($result) {        

            echo '<li>Recarga esta página</li>';

            echo '</ol>';                $row = $result->fetch_assoc();

            echo '</div>';

        } else {                echo "<p>📦 Total de productos: <strong>" . $row['total'] . "</strong></p>";    echo "<hr>";    echo "<hr>";

            // Conectar a la base de datos

            $conn->select_db($dbname);            }

            

            echo '<div class="status success">✅ <strong>Base de datos "salteneria_db" encontrada</strong></div>';                echo "<p><a href='index.html' style='background: #dc143c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>🥟 Ir a la Salteñería</a></p>";    echo "<p><a href='index.html'>🏪 Ir a la tienda</a></p>";

            

            echo '<div class="data">';            // Contar ventas

            

            // Contar productos            $result = $conn->query("SELECT COUNT(*) as total FROM ventas");        

            $result = $conn->query("SELECT COUNT(*) as total FROM productos");

            if ($result) {            if ($result) {

                $row = $result->fetch_assoc();

                echo '<p>📦 <strong>Total de productos:</strong> ' . $row['total'] . '</p>';                $row = $result->fetch_assoc();} catch(Exception $e) {} catch(Exception $e) {

                

                // Mostrar algunos productos                echo "<p>💰 Total de ventas: <strong>" . $row['total'] . "</strong></p>";

                $result = $conn->query("SELECT nombre, precio FROM productos LIMIT 3");

                if ($result && $result->num_rows > 0) {            }    echo "<h2 style='color: #e74c3c;'>❌ Error de conexión</h2>";    echo "<h2>❌ Error de conexión</h2>";

                    echo '<p><strong>Productos registrados:</strong></p>';

                    echo '<ul style="margin: 10px 0; padding-left: 25px;">';            

                    while($producto = $result->fetch_assoc()) {

                        echo '<li>' . $producto['nombre'] . ' - Bs. ' . number_format($producto['precio'], 2) . '</li>';            echo "<hr>";    echo "<p>" . $e->getMessage() . "</p>";    echo "<p>" . $e->getMessage() . "</p>";

                    }

                    echo '</ul>';            echo "<p>✅ ¡Todo listo! Puedes usar la aplicación.</p>";

                }

            }            echo "<p><a href='index.html' style='color: #dc143c; font-weight: bold;'>→ Ir a la aplicación</a></p>";}}

            

            // Contar ventas        }

            $result = $conn->query("SELECT COUNT(*) as total FROM ventas");

            if ($result) {

                $row = $result->fetch_assoc();

                echo '<p>💰 <strong>Total de ventas:</strong> ' . $row['total'] . '</p>';        $conn->close();

            }

                    ?>$conn->close();$conn->close();

            echo '</div>';

                </div>

            echo '<div class="status success">';

            echo '✅ <strong>¡Todo está configurado correctamente!</strong><br>';</body>?>?>

            echo 'Tu aplicación está lista para usar.';

            echo '</div>';</html>

            

            echo '<div style="text-align: center;">';

            echo '<a href="index.html">🚀 Abrir Aplicación</a>';

            echo '</div>';<!DOCTYPE html><!DOCTYPE html>

        }

<html><html>

        $conn->close();

        ?><head><head>

    </div>

</body>    <title>Test de Conexión - Salteñería Victoria</title>    <title>Test de Conexión MySQL</title>

</html>

    <style>    <style>

        body {         body { font-family: Arial, sans-serif; margin: 40px; }

            font-family: Arial, sans-serif;         h2 { color: #27ae60; }

            margin: 40px;        .error { color: #e74c3c; }

            background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);    </style>

        }</head>

        h2 { color: #dc143c; }</html>
        h3 { color: #1a1a1a; }
        .error { color: #e74c3c; }
    </style>
</head>
</html>
