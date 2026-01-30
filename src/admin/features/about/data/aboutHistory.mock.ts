import type { History } from "../domain/about.types";

export const aboutHistoryMock: History = {
  sectionTitle: "Nuestra Historia",
  paragraphs: [
    {
      id: 1,
      text:
        "El Centro de Alimentos y Productos Naturales (CAPN) fue fundado en 2008 como una iniciativa de la Facultad de Ciencias y Tecnología de la Universidad Mayor de San Simón (UMSS), con el objetivo de brindar servicios especializados en análisis de alimentos y productos naturales.",
    },
    {
      id: 2,
      text:
        "Desde sus inicios, el CAPN se ha posicionado como un referente en Bolivia por su compromiso con la excelencia científica y la innovación tecnológica. En 2015, iniciamos el proceso de acreditación bajo la norma internacional ISO/IEC 17025, convirtiéndonos en 2018 en el primer laboratorio de análisis de alimentos certificado en el país.",
    },
    {
      id: 3,
      text:
        "A lo largo de estos años, hemos evolucionado constantemente, incorporando nuevas metodologías, equipos de última generación y ampliando nuestro alcance de servicios para responder a las necesidades del sector alimentario boliviano.",
    },
  ],
  image: {
    file: null,
    previewUrl: "", // cuando haya API, aquí puede venir una URL remota
  },
};
