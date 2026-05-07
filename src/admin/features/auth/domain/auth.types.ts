export interface Administrador {
  idadministrador: number;
  nombre: string;
  email: string;
  estado: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    administrador: Administrador;
    token: string;
    token_type: string;
  };
}
