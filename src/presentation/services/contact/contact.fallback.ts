import contactHero from "../../../assets/page-headers/contact.jpg";

import type { ContactPageData } from "./contact.types";

const fallbackMapUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1903.696612959249!2d-66.1452607671082!3d-17.392906671602976!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373461dd2a507%3A0xf7dfd911f9012582!2sCentro%20de%20Alimentos%20y%20Productos%20Naturales%2C%20UMSS!5e0!3m2!1ses-419!2sbo!4v1763854558834!5m2!1ses-419!2sbo";

export const contactFallbackData: ContactPageData = {
  banner: {
    title: "Contacto",
    subtitle:
      "Estamos aquí para ayudarte con todos tus requerimientos de análisis de alimentos.",
    image: contactHero,
  },

  location: {
    title: "Nuestra Ubicación",
    subtitle: "Visítanos en la Facultad de Ciencias y Tecnología - UMSS.",
    mapSrc: fallbackMapUrl,
    locationName: "UMSS - Facultad de Ciencias y Tecnología Cochabamba, Bolivia",
    phone: "+591 4 4234567",
    email: "capn@umss.edu.bo",
    facebookUrl: "https://www.facebook.com/profile.php?id=100076011953997",
  },
};
