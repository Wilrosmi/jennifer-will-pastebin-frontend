import { IPost } from "../utils/types";
import axios from "axios";
import { url } from "../App";
import { useState } from "react";
import fillEmptyTitle from "../utils/fillEmptyTitle";

interface IProps {
  element: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setSideSummary: React.Dispatch<React.SetStateAction<string>>;
  setPageToDisplay: React.Dispatch<React.SetStateAction<string>>;
  setIdOfPostToDisplay: React.Dispatch<React.SetStateAction<number>>;
}

export default function ElementItem({
  element,
  setPosts,
  setSideSummary,
  setIdOfPostToDisplay,
  setPageToDisplay,
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

  function handleViewComment(): void {
    setIdOfPostToDisplay(element.id);
    setPageToDisplay("individual post");
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
      <button className="comment-button" onClick={handleViewComment}>
        View Post and Comments
      </button>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
