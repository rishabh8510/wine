export type CartItem = {
  id: string | number;
  name: string;
  vintage: string;
  variety: string;
  sku: string;
  price: number;
  qty: number;
  image: string;
};

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("storage"));
  } catch {}
};

export const addToCart = (item: CartItem) => {
  const current = getCart();
  const index = current.findIndex((it) => it.id === item.id);
  if (index > -1) {
    current[index].qty += item.qty;
  } else {
    current.push(item);
  }
  saveCart(current);
};

export const updateCartItemQty = (id: string | number, delta: number) => {
  const current = getCart();
  const updated = current.map((it) => {
    if (it.id === id) {
      return { ...it, qty: Math.max(1, it.qty + delta) };
    }
    return it;
  });
  saveCart(updated);
  return updated;
};

export const removeFromCart = (id: string | number) => {
  const current = getCart();
  const updated = current.filter((it) => it.id !== id);
  saveCart(updated);
  return updated;
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  } catch {}
};
