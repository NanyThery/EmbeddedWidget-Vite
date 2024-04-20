import { useEffect, useState } from "react";
import { MappedInstalmentInfo } from "../types/instalments";
import { CREDIT_AGREEMENTS_URL } from "../settings";
import { mapInstalments } from "../utils/instalmentMapper";

export default function useInstalments(price: number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [instalments, setInstalments] = useState<MappedInstalmentInfo[]>([]);
  const [selectedInstalment, setSelectedInstalment] = useState<number>(0);

  async function fetchInstallments(totalPrice: number): Promise<void> {
    setLoading(true);

    const params = new URLSearchParams({
      totalWithTax: totalPrice.toString(),
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
  }

  useEffect(() => {
    fetchInstallments(price);
  }, [price]);

  return { instalments, selectedInstalment, setSelectedInstalment, loading };
}
