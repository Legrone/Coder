(function () {
  const STORAGE_KEY_CART = "miHeladeria_carrito";
  const STORAGE_KEY_TOTAL = "miHeladeria_total";

  function saveCartToStorage(cart) {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      // Si no se pudo guardar, mostramos UX
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar el carrito." });
    }
  }

  function loadCartFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CART);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo leer el carrito guardado." });
      return [];
    }
  }

  function saveTotalToStorage(total) {
    try {
      localStorage.setItem(STORAGE_KEY_TOTAL, String(total));
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar el total." });
    }
  }

  function loadTotalFromStorage() {
    try {
      const t = localStorage.getItem(STORAGE_KEY_TOTAL);
      return t ? parseInt(t, 10) : 0;
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo leer el total guardado." });
      return 0;
    }
  }

  function calculateTotal(cart) {
    return cart.reduce((acc, item) => acc + Number(item.precio || 0), 0);
  }

  // Render del carrito en el DOM
  function renderCartDOM(cart, totalElement, listElement) {
    listElement.innerHTML = "";
    if (!cart.length) {
      listElement.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
          <span>${item.nombre}</span>
          <span>$${item.precio}</span>
        `;
        listElement.appendChild(div);
      });
    }
    totalElement.innerText = `Total: $${calculateTotal(cart)}`;
  }

  // API pública
  window.Cart = {
    add(item) {
      try {
        const cart = loadCartFromStorage();
        cart.push(item);
        saveCartToStorage(cart);
        const total = calculateTotal(cart);
        saveTotalToStorage(total);
        return { cart, total };
      } catch (e) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo agregar al carrito." });
        return null;
      }
    },

    clear() {
      try {
        localStorage.removeItem(STORAGE_KEY_CART);
        localStorage.removeItem(STORAGE_KEY_TOTAL);
        return { cart: [], total: 0 };
      } catch (e) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo vaciar el carrito." });
        return null;
      }
    },

    load() {
      const cart = loadCartFromStorage();
      const total = calculateTotal(cart);
      return { cart, total };
    },

    render(listElement, totalElement) {
      const { cart } = this.load();
      renderCartDOM(cart, totalElement, listElement);
    }
  };
})();
