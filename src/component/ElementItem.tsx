import { IPost } from "../utils/types";
import axios from "axios";
import { url } from "../App";

interface IProps {
  element: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setSideSummary: React.Dispatch<React.SetStateAction<string>>;
}

export default function ElementItem({
  element,
  setPosts,
  setSideSummary,
}: IProps): JSX.Element {
  async function handleDelete(): Promise<void> {
    await axios.delete(`${url}/${element.id}`);
    const serverRes = (await axios.get(url)).data.data;
    setPosts(serverRes);
  }

  function clickForSideSummary(
    setSideSummary: React.Dispatch<React.SetStateAction<string>>
  ): void {
    setSideSummary(element.message);
  }

  return (
    <div className="individual-paste">
      <p className="paste-title">{element.title}</p>
      <p
        className="paste-message"
        onClick={() => clickForSideSummary(setSideSummary)}
      >
        {element.message}
      </p>
      <p className="paste-date">{element.post_date}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
