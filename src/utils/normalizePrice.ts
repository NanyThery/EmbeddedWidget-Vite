export function normalizePrice(price: string | number): string | null {
  if (!price) return null;
  let normalizedPrice: number;

  if (typeof price === "string") {
    normalizedPrice = parseFloat(price.replace(",", "."));
  } else {
    normalizedPrice = price;
  }

  const multipliedPrice = normalizedPrice * 100;
  return (multipliedPrice < 0 ? 0 : multipliedPrice).toFixed(0);
}
