/**
 * Renderização de interface: categorias, cardápio, carrinho e pequenos
 * utilitários visuais (toast, header que aparece ao rolar).
 */

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function productImageMarkup(product) {
  return `
    <img
      src="${product.image}"
      alt="${product.name}"
      width="320"
      height="240"
      loading="lazy"
      decoding="async"
      onerror="this.closest('.product-media').classList.add('product-media--fallback'); this.remove();"
    />
    <span class="product-media-fallback" aria-hidden="true">🍪</span>
  `;
}

export function renderCategories(container, categories, activeId, onSelect) {
  container.innerHTML = categories
    .map(
      (cat) => `
      <button
        type="button"
        class="category-chip${cat.id === activeId ? ' category-chip--active' : ''}"
        data-category="${cat.id}"
        role="tab"
        aria-selected="${cat.id === activeId}"
      >${cat.label}</button>
    `
    )
    .join('');

  container.querySelectorAll('.category-chip').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.category));
  });
}

export function renderProducts(container, products, cart, handlers) {
  if (!products.length) {
    container.innerHTML = `<p class="menu-empty">Nenhum produto nessa categoria por enquanto.</p>`;
    return;
  }

  container.innerHTML = products
    .map((product) => {
      const qty = cart.getQuantity(product.id);
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            ${productImageMarkup(product)}
          </div>
          <div class="product-body">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
              <span class="product-price">${formatCurrency(product.price)}</span>
              <div class="product-controls" data-qty="${qty}">
                <button
                  type="button"
                  class="product-add${qty > 0 ? ' is-hidden' : ''}"
                  aria-label="Adicionar ${product.name} ao pedido"
                  data-action="add"
                >+</button>
                <div class="qty-stepper${qty > 0 ? '' : ' is-hidden'}">
                  <button type="button" class="qty-btn" data-action="decrease" aria-label="Diminuir quantidade de ${product.name}">−</button>
                  <span class="qty-value" aria-live="polite">${qty}</span>
                  <button type="button" class="qty-btn" data-action="increase" aria-label="Aumentar quantidade de ${product.name}">+</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  container.querySelectorAll('.product-card').forEach((card) => {
    const id = Number(card.dataset.id);
    card.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => handlers[btn.dataset.action](id));
    });
  });
}

export function updateProductControls(container, productId, quantity) {
  const card = container.querySelector(`.product-card[data-id="${productId}"]`);
  if (!card) return;
  const addBtn = card.querySelector('.product-add');
  const stepper = card.querySelector('.qty-stepper');
  const value = card.querySelector('.qty-value');
  value.textContent = quantity;
  addBtn.classList.toggle('is-hidden', quantity > 0);
  stepper.classList.toggle('is-hidden', quantity === 0);
}

export function renderCartItems(container, items) {
  if (!items.length) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <span class="cart-item-price">${formatCurrency(item.price)}</span>
        </div>
        <div class="qty-stepper">
          <button type="button" class="qty-btn" data-action="decrease" aria-label="Diminuir quantidade de ${item.name}">−</button>
          <span class="qty-value" aria-live="polite">${item.quantity}</span>
          <button type="button" class="qty-btn" data-action="increase" aria-label="Aumentar quantidade de ${item.name}">+</button>
        </div>
        <span class="cart-item-subtotal">${formatCurrency(item.price * item.quantity)}</span>
        <button type="button" class="icon-btn cart-item-remove" data-action="remove" aria-label="Remover ${item.name} do carrinho">✕</button>
      </div>
    `
    )
    .join('');
}

export function showToast(el, message) {
  el.textContent = message;
  el.hidden = false;
  el.classList.add('toast--visible');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => {
    el.classList.remove('toast--visible');
    setTimeout(() => {
      el.hidden = true;
    }, 200);
  }, 1800);
}

export function formatPrice(value) {
  return formatCurrency(value);
}
