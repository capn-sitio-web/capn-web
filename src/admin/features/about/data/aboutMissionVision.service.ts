import { axiosClient } from "../../../config/axiosClient";
import type { MissionVision, SectionResponse } from "../domain/about.types";

type SeccionApiResponse = {
  message: string;
  data: SectionResponse;
};

export const aboutMissionVisionService = {
  async obtenerMisionVision(): Promise<MissionVision> {
    const response = await axiosClient.get<SeccionApiResponse>(
      "/public/nosotros/mision-y-vision"
    );

    const seccion = response.data.data;

    const missionElement = seccion.elementos.find(
      (elemento) => elemento.clave === "mision"
    );

    const visionElement = seccion.elementos.find(
      (elemento) => elemento.clave === "vision"
    );

    if (!missionElement || !visionElement) {
      throw new Error("No se encontraron los elementos de misión y visión.");
    }

    return {
      seccionId: seccion.idseccion,
      missionElementId: missionElement.idelemento,
      visionElementId: visionElement.idelemento,
      mission: missionElement.descripcion ?? "",
      vision: visionElement.descripcion ?? "",
    };
  },

  async actualizarMisionVision(data: MissionVision): Promise<MissionVision> {
    if (!data.seccionId || !data.missionElementId || !data.visionElementId) {
      throw new Error("Faltan identificadores para actualizar misión y visión.");
    }

    await Promise.all([
      axiosClient.put(`/admin/elementos-seccion/${data.missionElementId}`, {
        seccion_idseccion: data.seccionId,
        clave: "mision",
        titulo: "Nuestra Misión",
        descripcion: data.mission,
        icono: null,
        imagen_url: null,
      }),
      axiosClient.put(`/admin/elementos-seccion/${data.visionElementId}`, {
        seccion_idseccion: data.seccionId,
        clave: "vision",
        titulo: "Nuestra Visión",
        descripcion: data.vision,
        icono: null,
        imagen_url: null,
      }),
    ]);

    return data;
  },
};
