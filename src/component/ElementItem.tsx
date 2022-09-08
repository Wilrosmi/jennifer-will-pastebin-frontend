import { IPost } from "../utils/types";
import { useState } from "react";
import fillEmptyTitle from "../utils/fillEmptyTitle";
import handleDelete from "../utils/handleDelete";

interface IProps {
  element: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setSideSummary: React.Dispatch<React.SetStateAction<string>>;
  setPageToDisplay: React.Dispatch<React.SetStateAction<string>>;
  setIdOfPostToDisplay: React.Dispatch<React.SetStateAction<number>>;
  setEditPost: React.Dispatch<React.SetStateAction<number>>;
}

export default function ElementItem({
  element,
  setPosts,
  setSideSummary,
  setIdOfPostToDisplay,
  setPageToDisplay,
  setEditPost,
}: IProps): JSX.Element {
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

  async function handleClickDelete(): Promise<void> {
    const updatedData = await handleDelete(element.id);
    setPosts(updatedData);
  }

  async function handleEditPost(): Promise<void> {
    setEditPost(element.id);
    setSideSummary("");
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
      <p className="paste-date">{element.post_date.slice(0, 10)}</p>
      <button className="comment-button" onClick={handleViewComment}>
        View Post and Comments
      </button>
      <button className="edit-button" onClick={handleEditPost}>
        Edit Post
      </button>
      <button className="delete-button" onClick={handleClickDelete}>
        Delete
      </button>
    </div>
  );
}
