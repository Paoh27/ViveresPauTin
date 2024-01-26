const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function cargarInicial() {
  const archivoInicial = fs.readFileSync('archivoInicial.txt', 'utf8');
  fs.writeFileSync('archivo1.txt', archivoInicial); 
  console.log('Carga inicial realizada.');
}

function mostrarListaProductos() {
  const archivo = fs.readFileSync('archivoInicial.txt', 'utf8');
  const lineas = archivo.split('\n');
  console.log('Lista de productos:');

  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].startsWith('Nombre producto:')) {
      const producto = lineas[i].split(': ')[1];
      const cantidad = parseInt(lineas[i + 1].split(': ')[1]);
      const precio = parseFloat(lineas[i + 2].split(': ')[1]); 
      console.log(`Nombre: ${producto}\nCantidad: ${cantidad}\nPrecio: ${precio}`);
    }
  }
}

function buscarProducto() {
  rl.question('Ingrese el nombre del producto a buscar: ', (productoBuscar) => {
    const archivo = fs.readFileSync('archivoInicial.txt', 'utf8');
    const lineas = archivo.split('\n');

    let encontrado = false;
    for (let i = 0; i < lineas.length; i++) {
      if (lineas[i].startsWith('Nombre producto:')) {
        const producto = lineas[i].split(': ')[1];
        const cantidad = parseInt(lineas[i + 1].split(': ')[1]);
        const precio = parseFloat(lineas[i + 2].split(': ')[1]); 

        if (producto === productoBuscar) {
          console.log(`Nombre: ${producto}\nCantidad: ${cantidad}\nPrecio: ${precio}`);
          encontrado = true;
          break;
        }
      }
    }

    if (!encontrado) {
      console.log(`Producto "${productoBuscar}" no encontrado.`);
    }

    rl.close();
  });
}

function agregarProducto() {
  rl.question('Ingrese el nombre del nuevo producto: ', (nuevoProducto) => {
    rl.question('Ingrese la cantidad del nuevo producto: ', (nuevaCantidad) => {
      rl.question('Ingrese el precio del nuevo producto: ', (nuevoPrecio) => {
        const archivoNuevoProducto = `\nNombre producto: ${nuevoProducto}\nCantidad: ${parseInt(nuevaCantidad)}\nPrecio: ${parseFloat(nuevoPrecio)}\n`;

    
        const archivoInicial = fs.readFileSync('archivoInicial.txt', 'utf8');
        fs.writeFileSync('archivoInicial.txt', archivoInicial + archivoNuevoProducto);
        console.log('Producto agregado correctamente.');

        rl.close();
      });
    });
  });
}

function borrarProducto() {
  rl.question('Ingrese el nombre del producto a borrar: ', (productoBorrar) => {
    const archivoInicial = fs.readFileSync('archivoInicial.txt', 'utf8');
    const lineasInicial = archivoInicial.split('\n');
    const indiceProducto = lineasInicial.findIndex((linea) => {
      return linea.startsWith('Nombre producto:') && linea.includes(productoBorrar);
    });

    if (indiceProducto !== -1) {
      lineasInicial.splice(indiceProducto, 3); 
      fs.writeFileSync('archivoInicial.txt', lineasInicial.join('\n'));
      console.log(`Producto "${productoBorrar}" borrado correctamente.`);
    } else {
      console.log(`Producto "${productoBorrar}" no encontrado.`);
    }

    rl.close();
  });
}





function main() {
  cargarInicial();
  rl.question(`
    1. Mostrar lista de productos
    2. Buscar producto
    3. Agregar producto
    4. Borrar producto 
    0. Salir
    Seleccione una opción: `, (opcion) => {
    switch (parseInt(opcion)) {
      case 1:
        mostrarListaProductos();
        rl.close();
        break;
      case 2:
        buscarProducto();
        break;
      case 3:
        agregarProducto();
        break;
      case 4:
        borrarProducto();
        break;
      case 0:
        console.log('Saliendo del programa.');
        rl.close();
        break;
      default:
        console.log('Opción no válida. Inténtelo de nuevo.');
        main();
    }
  });
}

main();
