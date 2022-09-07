import axios from "axios";
import { url } from "../App";
import { IPost } from "./types";

export default async function handleDelete(id: number): Promise<IPost[]> {
  await axios.delete(`${url}/${id}`);
  const serverRes: IPost[] = (await axios.get(url)).data.data;
  return serverRes;
}
