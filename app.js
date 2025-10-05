function saludar(nombre) {
  console.log('Hola: ' + nombre);
}

let nombreUser = prompt("Ingrese su nombre");
saludar(nombreUser);

//a futuro hacer: TENGO EL BOTON DE PEDIDO. TAMAÑOS, SI QUIERE PREENVASADO (TRUE O FALSE, EN CASO DE TRUE DAR OPCIONES), SABORES.

const preferencias = [];

function eleccion(){
    let total = 0;
    let seleccion;
    do {
    seleccion = prompt(
        "Bienvenido/a a la heladeria, elija su preferencia:\n1. Cucurucho, \n2. vaso chico, \n3 kilo, \n4 cuarto, \n5 preenvasado, \n6 finalizar"
    );

    switch (seleccion) {
        case '1':
        total = total + 3000;
        preferencias.push('Cucurucho');
        console.log('Tu total hasta el momento es de :' + total);
        break;

        case '2':
        total = total + 1000;
        preferencias.push('Vaso Chico');
        console.log('Tu total hasta el momento es de :' + total);
        break;

        case '3':
        total = total + 13000;
        preferencias.push('Kilo');
        console.log('Tu total hasta el momento es de :' + total);
        break;

        case '4':
        total = total + 6000;
        preferencias.push('Cuarto');
        console.log('Tu total hasta el momento es de :' + total);
        break;

        case '5':
        total = total + 100000;
        preferencias.push('Preenvasado');
        console.log('Tu total hasta el momento es de :' + total);
        break;

        default:
        console.log('Gracias por su seleccion');
        break;
    }

    } while (seleccion <= 5);
    return total;
}

let total = eleccion();
let fin = confirm("desea guardar lo pedido?")
    if(fin == true) {alert("El total de tu compra fue: " + total.toString())}
    else {
        let total = eleccion() 
        alert("El total de tu compra fue: " + total.toString())};