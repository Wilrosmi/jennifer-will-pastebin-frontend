import { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { IPost } from "../utils/types";

interface IProps {
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  postToEdit: IPost;
  setEditPost: React.Dispatch<React.SetStateAction<number>>;
}

export default function InputText({
  setPosts,
  postToEdit,
  setEditPost,
}: IProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function handleInputTitle(e: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(e.target.value);
  }

  function handleInputMessage(e: React.ChangeEvent<HTMLInputElement>): void {
    setMessage(e.target.value);
  }

  useEffect(() => {
    if (!isNaN(postToEdit.id)) {
      setMessage(postToEdit.message);
      setTitle(postToEdit.title ?? "");
    }
  }, [postToEdit]);

  async function addTextToDb(): Promise<void> {
    try {
      if (isNaN(postToEdit.id)) {
        await axios.post(url, { message: message, title: title });
      } else {
        const reqObject = { message: message, title: title };
        await axios.put(`${url}/${postToEdit.id}`, reqObject);
      }
      const serverRes = (await axios.get(url)).data.data;
      setPosts(serverRes);
      setEditPost(NaN);
      setMessage("");
      setTitle("");
    } catch (error) {
      window.alert("Need a message body!");
    }
  }

  return (
    <div id="input-field">
      <label id="title-label" htmlFor="titleInput">
        Title (optional):{" "}
      </label>
      <input
        id="title-input"
        name="titleInput"
        value={title}
        onChange={(e) => handleInputTitle(e)}
      />
      <p></p>
      <label id="message-label" htmlFor="messageInput">
        Paste Message Here (required):{" "}
      </label>
      <input
        id="message-input"
        name="messageInput"
        value={message}
        onChange={(e) => handleInputMessage(e)}
      />
      <p></p>
      <button id="submit-button" onClick={addTextToDb}>
        Submit
      </button>
    </div>
  );
}
