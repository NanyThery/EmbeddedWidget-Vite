import { useCallback, useEffect, useState } from "react";
import { MappedInstalmentInfo } from "../types/instalments";
import { CREDIT_AGREEMENTS_URL } from "../settings";
import { mapInstalments } from "../utils/instalmentMapper";
import { normalizePrice } from "../utils/normalizePrice";

export default function useInstalments(price: number | string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [instalments, setInstalments] = useState<MappedInstalmentInfo[]>([]);
  const [selectedInstalment, setSelectedInstalment] = useState<number>(0);

  const fetchInstallments = useCallback(async (totalPrice: string | number) => {
    setLoading(true);

    const parsedPrice = normalizePrice(totalPrice);

    if (!parsedPrice) return setInstalments([]);

    const params = new URLSearchParams({
      totalWithTax: parsedPrice.toString(),
    });

    try {
      const response = await fetch(
        `${CREDIT_AGREEMENTS_URL}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching instalments");
      }

      const data = await response.json();
      setInstalments(mapInstalments(data));
    } catch (e) {
      // Here error monitoring (Sentry, etc)
      console.error(`[InstalmentsWidget] ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstallments(price);
  }, [price, fetchInstallments]);

  return { instalments, selectedInstalment, setSelectedInstalment, loading };
}
