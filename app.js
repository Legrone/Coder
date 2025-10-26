const helados = [
    {id: 1, nombre: "Cucurucho", precio: 6000},
    {id: 2, nombre: "Kilo", precio: 10000},
    {id: 3, nombre: "Cuarto", precio: 5000},
    {id: 4, nombre: "Vaso chico", precio: 2000}, 
    {id: 5, nombre: "Batido", precio: 4000}
];

const carrito = [];
let total = 0;

const cargarDOM = () => {
    const prodsContainer = document.getElementById("juan");
    const titulo = document.getElementById("titulo");
    const totalDiv = document.getElementById("total");

    titulo.innerText = "HELADERIA FTC ORDEN";

    helados.forEach((helado) => {
        let div = document.createElement("div");
        div.className = "border";
        div.innerHTML = `
            <span>${helado.id}</span>
            <h3>${helado.nombre}</h3>
            <p>$${helado.precio}</p>
            <button data-id=${helado.id} class="btnAgregar">Agregar al carrito</button>
        `;
        prodsContainer.appendChild(div);
    });

    let btnAgregar = document.querySelectorAll(".btnAgregar");
    btnAgregar.forEach((but) => {
        but.addEventListener("click", (e) => {
            let heladoEncontrado = helados.find((h) => h.id == e.target.dataset.id);
            carrito.push(heladoEncontrado);
            localStorage.setItem(heladoEncontrado.nombre, heladoEncontrado.precio);

            total += heladoEncontrado.precio;

            totalDiv.innerText = `Total: $${total}`;

            console.log("Carrito:", carrito);
            console.log("Total actual:", total);
        });
    });
};

cargarDOM();


// A FUTURO:
// agregar botones de compra y limpieza de carrito, en caso de compra generar un ticket con informacion extraida por medio de JSON.