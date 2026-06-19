export type PublicBannerResponse = {
  message: string;
  data: PublicBannerData;
};

export type PublicBannerData = {
  seccionId: number;
  sectionTitle: string;
  description: string;
  image: {
    previewUrl: string;
    imageId: number | null;
    alt: string;
  } | null;
};

export type PublicSectionResponse = {
  message: string;
  data: PublicSectionData;
};

export type PublicSectionData = {
  idseccion: number;
  slug: string;
  titulo: string;
  descripcion: string | null;
  contenido_extenso?: string | null;

  listas: PublicListItem[];
  elementos: PublicElementItem[];
  imagenes?: PublicImageItem[];

  personal?: PublicPersonItem[];
  contactos?: PublicContactItem[];

  image?: {
    previewUrl: string;
    imageId: number | null;
    alt: string;
  };

  galleryImages?: {
    id: number;
    previewUrl: string;
    alt: string;
    order: number | null;
  }[];
};

export type PublicListItem = {
  id?: number;
  idlista_seccion?: number;
  seccion_idseccion?: number;
  texto_item: string;
  created_at?: string;
  updated_at?: string;
};

export type PublicElementItem = {
  idelemento: number;
  seccion_idseccion?: number;
  clave?: string | null;
  titulo: string;
  descripcion: string | null;
  icono: string | null;
  imagen_url: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicImageItem = {
  idimagen_seccion: number;
  seccion_idseccion?: number;
  imagen_url: string;
  imagen_alt: string;
  tipo_imagen?: string | null;
  orden?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicPersonItem = {
  idpersonal: number;
  seccion_idseccion: number;
  nombre: string;
  cargo: string;
  descripcion: string;
  foto_url: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicContactItem = {
  idcontacto: number;
  seccion_idseccion: number;
  ubicacion_nombre: string;
  ubicacion_url: string;
  telefono: string;
  correo: string;
  facebook_url: string | null;
  created_at?: string;
  updated_at?: string;
};
