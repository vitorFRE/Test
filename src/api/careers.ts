import type { Post } from "../types/post";
import { apiClient } from "./client";

export interface CareerPostResponse {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  author_ip?: string;
}

export interface CareersListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CareerPostResponse[];
}

function mapCareerToPost(item: CareerPostResponse): Post {
  return {
    id: String(item.id),
    title: item.title,
    content: item.content,
    username: item.username,
    createdAt: new Date(item.created_datetime),
  };
}

export interface CareersListResult {
  posts: Post[];
  count: number;
  next: string | null;
  previous: string | null;
}

export async function getList(
  limit = 10,
  offset = 0,
  signal?: AbortSignal
): Promise<CareersListResult> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  const path = `/careers/?${params.toString()}`;
  const data = await apiClient.get<CareersListResponse>(path, { signal });
  return {
    posts: data.results.map(mapCareerToPost),
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
}

export interface CreateCareerPayload {
  username: string;
  title: string;
  content: string;
  created_datetime: string;
  author_ip: string;
}

export async function create(payload: CreateCareerPayload): Promise<Post> {
  const data = await apiClient.post<CareerPostResponse>("/careers/", {
    body: payload,
  });
  return mapCareerToPost(data);
}

export interface UpdateCareerPayload {
  title: string;
  content: string;
}

export async function update(
  id: string,
  payload: UpdateCareerPayload
): Promise<Post> {
  const data = await apiClient.patch<CareerPostResponse>(`/careers/${id}/`, {
    body: payload,
  });
  return mapCareerToPost(data);
}

export async function remove(id: string): Promise<void> {
  await apiClient.delete(`/careers/${id}/`);
}

export const careersApi = { getList, create, update, delete: remove };
