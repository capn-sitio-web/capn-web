import { axiosClient } from "../../../config/axiosClient";
import { authStorage } from "./auth.storage";
import type { LoginRequest, LoginResponse } from "../domain/auth.types";

const AUTH_BASE = "/auth";

export const authService = {
  async iniciarSesion(payload: LoginRequest) {
    const response = await axiosClient.post<LoginResponse>(
      `${AUTH_BASE}/login`,
      payload
    );

    const { administrador, token } = response.data.data;

    authStorage.guardarToken(token);
    authStorage.guardarUsuario(administrador);

    return response.data;
  },

  async cerrarSesion() {
    await axiosClient.post(`${AUTH_BASE}/logout`);
    authStorage.limpiarSesion();
  },

  async obtenerPerfil() {
    const response = await axiosClient.get(`${AUTH_BASE}/me`);
    return response.data;
  },
};
