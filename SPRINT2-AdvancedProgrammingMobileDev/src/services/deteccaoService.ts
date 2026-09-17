import api from "./api";
import { DeteccaoEpi } from "../types";

export async function listarDeteccoes(): Promise<DeteccaoEpi[]> {
  const response = await api.get<DeteccaoEpi[]>("/deteccoes");
  return response.data;
}

export async function buscarDeteccaoPorId(id: number): Promise<DeteccaoEpi> {
  const response = await api.get<DeteccaoEpi>(`/deteccoes/${id}`);
  return response.data;
}

export async function criarDeteccao(
  deteccao: Omit<DeteccaoEpi, "id">
): Promise<DeteccaoEpi> {
  const response = await api.post<DeteccaoEpi>("/deteccoes", deteccao);
  return response.data;
}