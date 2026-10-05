import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { Cart } from './cart.js';
import { openWhatsAppWithCart, buildWhatsAppUrl, buildEmptyCartMessage } from './whatsapp.js';
import { renderCategories, renderProducts, updateProductControls, renderCartItems, showToast, formatPrice } from './ui.js';

const cart = new Cart(PRODUCTS);
let activeCategory = 'todos';

const els = {
  header: document.getElementById('header'),
  heroSentinel: document.getElementById('heroSentinel'),
  categoriesTrack: document.getElementById('categoriesTrack'),
  menuGrid: document.getElementById('menuGrid'),
  headerWhatsapp: document.getElementById('headerWhatsapp'),
  ctaWhatsapp: document.getElementById('ctaWhatsapp'),
  footerWhatsapp: document.getElementById('footerWhatsapp'),
  cartToggle: document.getElementById('cartToggle'),
  cartCount: document.getElementById('cartCount'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartClose: document.getElementById('cartClose'),
  cartItems: document.getElementById('cartItems'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartFooter: document.getElementById('cartFooter'),
  cartTotal: document.getElementById('cartTotal'),
  cartCheckout: document.getElementById('cartCheckout'),
  cartClear: document.getElementById('cartClear'),
  floatingCart: document.getElementById('floatingCart'),
  floatingCartBtn: document.getElementById('floatingCartBtn'),
  floatingCartCount: document.getElementById('floatingCartCount'),
  floatingCartTotal: document.getElementById('floatingCartTotal'),
  toast: document.getElementById('toast'),
  year: document.getElementById('year'),
};

function getVisibleProducts() {
  if (activeCategory === 'todos') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === activeCategory);
}

const productHandlers = {
  add(id) {
    cart.add(id);
    const product = PRODUCTS.find((p) => p.id === id);
    showToast(els.toast, `${product.name} adicionado ao pedido`);
  },
  increase(id) {
    cart.increase(id);
  },
  decrease(id) {
    cart.decrease(id);
  },
};

function renderMenu() {
  renderProducts(els.menuGrid, getVisibleProducts(), cart, productHandlers);
}

function setActiveCategory(id) {
  activeCategory = id;
  renderCategories(els.categoriesTrack, CATEGORIES, activeCategory, setActiveCategory);
  renderMenu();
}

function openCart() {
  els.cartDrawer.classList.add('cart-drawer--open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  els.cartOverlay.hidden = false;
  els.cartToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  els.cartDrawer.classList.remove('cart-drawer--open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  els.cartOverlay.hidden = true;
  els.cartToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

function updateCartUI(state) {
  const { items, itemCount, total } = state;

  els.cartCount.textContent = itemCount;
  els.cartCount.hidden = itemCount === 0;

  renderCartItems(els.cartItems, items);
  els.cartEmpty.hidden = items.length > 0;
  els.cartFooter.hidden = items.length === 0;
  els.cartTotal.textContent = formatPrice(total);

  els.floatingCart.hidden = itemCount === 0;
  els.floatingCartCount.textContent = itemCount;
  els.floatingCartTotal.textContent = formatPrice(total);

  getVisibleProducts().forEach((product) => {
    updateProductControls(els.menuGrid, product.id, cart.getQuantity(product.id));
  });

  els.cartItems.querySelectorAll('.cart-item').forEach((row) => {
    const id = Number(row.dataset.id);
    row.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.action === 'increase') cart.increase(id);
        if (btn.dataset.action === 'decrease') cart.decrease(id);
        if (btn.dataset.action === 'remove') cart.remove(id);
      });
    });
  });
}

function setupHeaderScroll() {
  if (!els.heroSentinel) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      els.header.classList.toggle('header--scrolled', !entry.isIntersecting);
    },
    { rootMargin: '0px' }
  );
  observer.observe(els.heroSentinel);
}

function setupWhatsAppLinks() {
  const plainUrl = buildWhatsAppUrl(buildEmptyCartMessage());
  [els.headerWhatsapp, els.ctaWhatsapp, els.footerWhatsapp].forEach((el) => {
    if (el) el.href = plainUrl;
  });
}

function init() {
  setupWhatsAppLinks();
  setupHeaderScroll();
  setActiveCategory('todos');

  cart.onChange(updateCartUI);
  updateCartUI(cart.getState());

  els.cartToggle.addEventListener('click', openCart);
  els.cartClose.addEventListener('click', closeCart);
  els.cartOverlay.addEventListener('click', closeCart);
  els.floatingCartBtn.addEventListener('click', openCart);

  els.cartClear.addEventListener('click', () => {
    cart.clear();
    closeCart();
  });

  els.cartCheckout.addEventListener('click', () => {
    openWhatsAppWithCart(cart.getItems(), cart.getTotal());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && els.cartDrawer.classList.contains('cart-drawer--open')) {
      closeCart();
    }
  });

  if (els.year) {
    els.year.textContent = new Date().getFullYear();
  }
}

init();
