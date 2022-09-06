import { IPost } from "../utils/types";
import axios from "axios";
import { url } from "../App";
import { useState } from "react";
import fillEmptyTitle from "../utils/fillEmptyTitle";

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

  const [messageIsShown, setMessageIsShown] = useState<boolean>(true);

  function clickForSideSummary(
    setSideSummary: React.Dispatch<React.SetStateAction<string>>
  ): void {
    setSideSummary(element.message);
  }

  return (
    <div className="individual-paste">
      <p className="paste-title">{fillEmptyTitle(element.title)}</p>
      <p
        className="paste-message"
        onMouseEnter={() => setMessageIsShown(false)}
        onMouseLeave={() => setMessageIsShown(true)}
        onClick={() => clickForSideSummary(setSideSummary)}
      >
        {messageIsShown ? element.message : "Click to expand the message!"}
      </p>
      <p className="paste-date">{element.post_date}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
