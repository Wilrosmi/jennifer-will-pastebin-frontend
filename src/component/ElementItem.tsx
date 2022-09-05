import { IPost } from "../utils/types";
import axios from "axios";
import { url } from "../App";

interface IProps {
  element: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export default function ElementItem({
  element,
  setPosts,
}: IProps): JSX.Element {
  async function handleDelete(): Promise<void> {
    await axios.delete(`${url}/${element.id}`);
    const serverRes = (await axios.get(url)).data.data;
    setPosts(serverRes);
  }

  return (
    <div className="individual-paste">
      <p className="paste-title">{element.title}</p>
      <p className="paste-message">{element.message}</p>
      <p className="paste-date">{element.post_date}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
