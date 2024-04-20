"use client";
import { useEffect, useState } from "react";
import { InstalmentInfo } from "../types/instalments";

export default function useInstalments(price: number) {
  const [loading, setLoading] = useState<boolean>(true);
  const [instalments, setInstalments] = useState<InstalmentInfo[]>([]);
  const [selectedInstalment, setSelectedInstalment] = useState<number>(0);

  const url = "http://localhost:8080/credit_agreements";

  async function fetchInstallments(totalPrice: number): Promise<void> {
    setLoading(true);

    const params = new URLSearchParams({
      totalWithTax: totalPrice.toString(),
    });

    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching instalments");
      }

      const data = await response.json();
      setInstalments(data);
    } catch (e) {
      // Here error monitoring (Sentry, etc)
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInstallments(price);
  }, [price]);

  return { instalments, selectedInstalment, setSelectedInstalment, loading };
}
