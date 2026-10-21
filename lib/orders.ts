import type { CartItem } from "./cart";

export type Order = {
  id: string;
  wine: string;
  vintage: string;
  variety: string;
  sku: string;
  qty: number;
  total: number;
  date: string;
  placed: string;
  status: string;
  image: string;
  address: string[];
  summary: { subtotal: number; shipping: number; tax: number; total: number };
  items?: CartItem[];
  userEmail?: string;
};

export const createOrderFromCart = (
  items: CartItem[],
  currentUser: {
    firstName?: string;
    lastName?: string;
    email?: string;
    address1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  },
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    bottles: number;
  }
): Order => {
  const timestamp = Date.now();
  const dateObj = new Date(timestamp);
  return {
    id: `PMW-${timestamp.toString().slice(-4)}`,
    wine: items[0]?.name || "Estate Wine Selection",
    vintage: items[0]?.vintage || "2024",
    variety: items[0]?.variety || "Wine",
    sku: items[0]?.sku || "GL-ORD-2024",
    qty: totals.bottles,
    total: totals.total,
    date: dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    placed: dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    status: "Processing",
    image: items[0]?.image || "/images/wine.svg",
    address: [
      `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
        "Valued Member",
      currentUser.address1 || "128 Vineyard Lane",
      `${currentUser.city || "Yountville"}, ${currentUser.state || "CA"} ${currentUser.zip || "94599"}`,
      currentUser.country || "United States",
    ],
    summary: {
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
    },
    items: [...items],
    userEmail: currentUser.email,
  };
};

export const getOrders = (userEmail?: string): Order[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("orders");
    const allOrders: Order[] = raw ? JSON.parse(raw) : [];
    if (userEmail) {
      return allOrders.filter(
        (o) => !o.userEmail || o.userEmail.toLowerCase() === userEmail.toLowerCase()
      );
    }
    return allOrders;
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("orders");
    const allOrders: Order[] = raw ? JSON.parse(raw) : [];
    allOrders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(allOrders));
    window.dispatchEvent(new Event("storage"));
  } catch {}
};
