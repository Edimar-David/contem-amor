/**
 * Carrinho de pedido — estado em memória + persistência em localStorage,
 * para o pedido não se perder se a pessoa atualizar a página.
 */

const STORAGE_KEY = 'contemamor:cart';

export class Cart {
  constructor(products) {
    this.products = new Map(products.map((p) => [p.id, p]));
    this.quantities = new Map();
    this.listeners = new Set();
    this._load();
  }

  onChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  _emit() {
    this._save();
    this.listeners.forEach((cb) => cb(this.getState()));
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      Object.entries(saved).forEach(([id, qty]) => {
        const productId = Number(id);
        if (this.products.has(productId) && qty > 0) {
          this.quantities.set(productId, qty);
        }
      });
    } catch {
      /* localStorage indisponível ou dado corrompido — segue com carrinho vazio */
    }
  }

  _save() {
    try {
      const plain = Object.fromEntries(this.quantities);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plain));
    } catch {
      /* ambiente sem localStorage (ex.: modo privado) — segue sem persistir */
    }
  }

  add(productId) {
    const current = this.quantities.get(productId) || 0;
    this.quantities.set(productId, current + 1);
    this._emit();
  }

  increase(productId) {
    this.add(productId);
  }

  decrease(productId) {
    const current = this.quantities.get(productId) || 0;
    if (current <= 1) {
      this.quantities.delete(productId);
    } else {
      this.quantities.set(productId, current - 1);
    }
    this._emit();
  }

  remove(productId) {
    this.quantities.delete(productId);
    this._emit();
  }

  clear() {
    this.quantities.clear();
    this._emit();
  }

  getQuantity(productId) {
    return this.quantities.get(productId) || 0;
  }

  getItems() {
    return Array.from(this.quantities.entries()).map(([id, quantity]) => ({
      ...this.products.get(id),
      quantity,
    }));
  }

  getItemCount() {
    return Array.from(this.quantities.values()).reduce((sum, qty) => sum + qty, 0);
  }

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getState() {
    return {
      items: this.getItems(),
      itemCount: this.getItemCount(),
      total: this.getTotal(),
    };
  }
}
