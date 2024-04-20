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
  sequra: string;
  title: string;
  advantages: { copy: string; imageName: string; imgAlt: string }[];
  bottomLine: (amount: string) => string;
  close: string;
}

export const esUiCopies: UiCopies = {
  title: "Págalo en",
  moreInfo: "Más info",
  instalments: "cuotas de",
  month: "mes",
};

export const esModalCopies: ModalCopies = {
  sequra: "SeQura",
  title: "Fracciona tu pago",
  advantages: [
    {
      copy: "Fracciona tu pago solo con un coste fijo por cuota.",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
    {
      copy: "Ahora solo pagas la primera cuota",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
    {
      copy: "El resto de pagos se cargarán automáticamente a tu tarjeta",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
  ],
  bottomLine: (amount: string) =>
    `Además en el importe mostrado ya se incluye la cuota única mensual de ${amount}/mes, por lo que no tendrás ninguna sorpresa.`,
  close: "Cerrar",
};

// translate all the strings in the uiCopies and modalCopies objects to English

export const enUiCopies: UiCopies = {
  title: "Pay in",
  moreInfo: "More info",
  instalments: "instalments of",
  month: "month",
};

export const enModalCopies: ModalCopies = {
  sequra: "SeQura",
  title: "Split your payment",
  advantages: [
    {
      copy: "Split your payment with a fixed cost per instalment.",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
    {
      copy: "Now you only pay the first instalment",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
    {
      copy: "The rest of the payments will be automatically charged to your card",
      imageName: "placeholder",
      imgAlt: "Placeholder image",
    },
  ],
  bottomLine: (amount: string) =>
    `Also, the amount shown already includes the unique monthly instalment of ${amount}/month, so you won't have any surprises.`,
  close: "Close",
};
