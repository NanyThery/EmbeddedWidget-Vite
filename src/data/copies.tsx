export const getCopies = (userLang: string = "es") => {
  switch (userLang) {
    case "es":
      return { ui: esUiCopies, modal: esModalCopies };
    case "en":
    default:
      return { ui: enUiCopies, modal: enModalCopies };
  }
};

interface UiCopies {
  title: string;
  moreInfo: string;
  instalments: string;
  month: string;
}

interface ModalCopies {
  title: string;
  advantages: { copy: string; imgUrl: string }[];
  bottomLine: (amount: string) => string;
  close: string;
}

export const esUiCopies: UiCopies = {
  title: "Págalo en",
  moreInfo: "Más info",
  instalments: "cuotas",
  month: "mes",
};

export const esModalCopies: ModalCopies = {
  title: "Fracciona tu pago",
  advantages: [
    { copy: "Fracciona tu pago solo con un coste fijo por cuota.", imgUrl: "" },
    { copy: "Ahora solo pagas la primera cuota", imgUrl: "" },
    {
      copy: "El resto de pagos se cargarán automáticamente a tu tarjeta",
      imgUrl: "",
    },
  ],
  bottomLine: (amount: string) =>
    `Además en el importe mostrado ya se incluye la cuota única mensual de ${amount}, por lo que no tendrás ninguna sorpresa.`,
  close: "Cerrar",
};

// translate all the strings in the uiCopies and modalCopies objects to English

export const enUiCopies: UiCopies = {
  title: "Pay in",
  moreInfo: "More info",
  instalments: "instalments",
  month: "month",
};

export const enModalCopies: ModalCopies = {
  title: "Split your payment",
  advantages: [
    {
      copy: "Split your payment with a fixed cost per instalment.",
      imgUrl: "",
    },
    { copy: "Now you only pay the first instalment", imgUrl: "" },
    {
      copy: "The rest of the payments will be automatically charged to your card",
      imgUrl: "",
    },
  ],
  bottomLine: (amount: string) =>
    `Also, the amount shown already includes the unique monthly instalment of ${amount}, so you won't have any surprises.`,
  close: "Close",
};
