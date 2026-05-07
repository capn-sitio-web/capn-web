import { z } from "zod";

export const aboutMissionVisionValidation = z.object({
  mission: z.string().trim().min(1, "La misión es obligatoria."),
  vision: z.string().trim().min(1, "La visión es obligatoria."),
});
