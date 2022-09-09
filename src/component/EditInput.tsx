import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from "../utils/types";
import { url } from "../App";

interface IProps {
  post: IPost;
  setEditPost: React.Dispatch<React.SetStateAction<number>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export default function EditInput({
  post,
  setEditPost,
  setPosts,
}: IProps): JSX.Element {
  const [editTitle, setEditTitle] = useState<string>("");
  const [editMessage, setEditMessage] = useState<string>("");

  useEffect(() => {
    setEditTitle(post.title ?? "");
    setEditMessage(post.message);
  }, [post]);

  async function handleSubmitEdits(): Promise<void> {
    await axios.put(`${url}/${post.id}`, {
      title: editTitle,
      message: editMessage,
    });
    const dbres = (await axios.get(`${url}/`)).data.data;
    setPosts(dbres);
    setEditPost(NaN);
  }

  return (
    <>
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      ></input>
      <input
        value={editMessage}
        onChange={(e) => setEditMessage(e.target.value)}
      ></input>
      <button onClick={handleSubmitEdits}> Submit </button>
    </>
  );
}
