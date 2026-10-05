

export const WHATSAPP_CONFIG = {
  number: '5534993420877',

  messages: {
    orderIntro: 'Olá! Gostaria de fazer um pedido:',
    emptyCart: 'Olá! Gostaria de conhecer os produtos da Contém Amor.',
    orderFooter: 'Aguardo a confirmação do pedido. Obrigado!',
  },
};


function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
}

export function buildEmptyCartMessage() {
  return WHATSAPP_CONFIG.messages.emptyCart;
}

export function buildOrderMessage(items, total) {
  const lines = items.map((item) => {
    const subtotal = formatCurrency(item.price * item.quantity);
    return `${item.quantity}x ${item.name} — ${subtotal}`;
  });

  return [
    WHATSAPP_CONFIG.messages.orderIntro,
    '',
    ...lines,
    '',
    `Total: ${formatCurrency(total)}`,
    '',
    WHATSAPP_CONFIG.messages.orderFooter,
  ].join('\n');
}

export function openWhatsAppWithCart(items, total) {
  const message = items.length
    ? buildOrderMessage(items, total)
    : buildEmptyCartMessage();
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
}

export function openWhatsAppPlain() {
  window.open(buildWhatsAppUrl(buildEmptyCartMessage()), '_blank', 'noopener');
}
