import type { Administrador } from "../domain/auth.types";

const TOKEN_KEY = "capn_admin_token";
const USER_KEY = "capn_admin_user";

export const authStorage = {
  guardarToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  eliminarToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  guardarUsuario(usuario: Administrador) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },

  obtenerUsuario(): Administrador | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  eliminarUsuario() {
    localStorage.removeItem(USER_KEY);
  },

  limpiarSesion() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  estaAutenticado(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
