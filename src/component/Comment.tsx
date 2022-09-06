import { IComment } from "../utils/types";
import axios from "axios";
import { url } from "../App";

interface IProps {
  commentData: IComment;
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export default function Comment({
  commentData,
  setCommentList,
}: IProps): JSX.Element {
  async function handleDeleteComment(): Promise<void> {
    await axios.delete(
      `${url}/${commentData.post_id}/comments/${commentData.comment_id}`
    );
    const dbres = (await axios.get(`${url}/${commentData.post_id}/comments`))
      .data.data;
    setCommentList(dbres);
  }

  return (
    <div>
      <p>{commentData.comment}</p>
      <p>{commentData.time}</p>
      <button onClick={handleDeleteComment}>Delete</button>
    </div>
  );
}
