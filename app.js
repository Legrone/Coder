document.addEventListener("DOMContentLoaded", () => {
  const productosContainer = document.getElementById("juan");
  const titulo = document.getElementById("titulo");
  const totalDiv = document.getElementById("total");
  const listaCarrito = document.getElementById("lista-carrito");
  const vaciarBtn = document.getElementById("vaciarCarritoBtn");
  const pagarBtn = document.getElementById("pagarBtn");
  const mensajePago = document.getElementById("mensajePago");
  const errorFetchDiv = document.getElementById("errorFetch");

  titulo.innerText = "HELADERIA FTC ORDEN";

  async function fetchProducts() {
    try {
      errorFetchDiv.innerText = "";
      const resp = await fetch("products.json", { cache: "no-store" });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      return data;
    } catch (err) {
      errorFetchDiv.innerText = "Hubo un problema al cargar los productos. Intente nuevamente.";
      Swal.fire({
        icon: "error",
        title: "Error al cargar productos",
        text: "No se pudieron obtener los productos. Revisa que products.json exista.",
      });
      return null;
    }
  }

  function renderProducts(products) {
    productosContainer.innerHTML = "";
    products.forEach((p) => {
      const div = document.createElement("div");
      div.className = "border";
      div.innerHTML = `
        <span>#${p.id}</span>
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button data-id="${p.id}" class="btnAgregar">Agregar al carrito</button>
      `;
      productosContainer.appendChild(div);
    });
  }

  function setupAddButtons(products) {
    productosContainer.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".btnAgregar");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const producto = products.find(x => x.id === id);
      if (!producto) {
        Swal.fire({ icon: "error", title: "Error", text: "Producto no encontrado." });
        return;
      }

      const result = Cart.add(producto);
      if (result) {
        Cart.render(listaCarrito, totalDiv);
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
          title: `${producto.nombre} agregado`
        });
      }
    });
  }

  vaciarBtn.addEventListener("click", () => {
    const res = Cart.clear();
    if (res) {
      Cart.render(listaCarrito, totalDiv);
      mensajePago.innerText = ""; // limpiamos mensaje de pago
      Swal.fire({ 
        icon: "success", 
        title: "Carrito vaciado", 
        timer: 1200, 
        showConfirmButton: false, 
        toast: true, 
        position: "top-end" 
      });
    }
  });

  // BOTÓN PAGAR
  pagarBtn.addEventListener("click", () => {
    const estado = Cart.load();

    if (!estado.cart.length) {
      Swal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "Agrega productos antes de pagar."
      });
      return;
    }

    mensajePago.innerText = "Transferir a CALLEFALSA123, Mandar comprobante al numero:011 1111 1111";

    Swal.fire({
      icon: "success",
      title: "Instrucciones de pago",
      text: "Debajo verás los datos para transferir."
    });
  });

  (async function init() {
    const products = await fetchProducts();
    if (!products) return;
    renderProducts(products);
    setupAddButtons(products);

    Cart.render(listaCarrito, totalDiv);
  })();
});
