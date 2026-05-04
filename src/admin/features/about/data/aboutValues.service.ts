import type { Values } from "../domain/about.types";

const mockValues: Values = {
  seccionId: null,
  sectionTitle: "Nuestros Valores",
  sectionDescription: "Los principios que guían nuestro trabajo diario",
  cards: [
    {
      id: crypto.randomUUID(),
      icon: "shield",
      title: "Responsabilidad",
      description:
        "Compromiso con la exactitud y confiabilidad en cada análisis realizado.",
    },
    {
      id: crypto.randomUUID(),
      icon: "trophy",
      title: "Excelencia",
      description:
        "Búsqueda constante de la mejora continua en todos nuestros procesos.",
    },
    {
      id: crypto.randomUUID(),
      icon: "heart",
      title: "Compromiso",
      description:
        "Dedicación total a la seguridad alimentaria y el bienestar social.",
    },
    {
      id: crypto.randomUUID(),
      icon: "eye",
      title: "Transparencia",
      description:
        "Información clara y honesta en todos nuestros procedimientos.",
    },
  ],
};

export const aboutValuesService = {
  async obtenerValores(): Promise<Values> {
    return mockValues;
  },

  async actualizarValores(data: Values): Promise<Values> {
    return data;
  },
};
