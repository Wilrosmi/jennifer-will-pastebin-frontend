import { IComment } from "../utils/types";
import axios from "axios";
import { url } from "../App";

interface IProps {
  commentData: IComment;
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
  setTypeComment: React.Dispatch<React.SetStateAction<string>>;
  setCreateOrEdit: React.Dispatch<
    React.SetStateAction<{
      postOrPut: 0 | 1;
      comment: IComment;
    }>
  >;
}

export default function Comment({
  commentData,
  setCommentList,
  setTypeComment,
  setCreateOrEdit,
}: IProps): JSX.Element {
  async function handleDeleteComment(): Promise<void> {
    await axios.delete(
      `${url}/${commentData.post_id}/comments/${commentData.comment_id}`
    );
    const dbres = (await axios.get(`${url}/${commentData.post_id}/comments`))
      .data.data;
    setCommentList(dbres);
  }

  async function handleEditComment(): Promise<void> {
    setTypeComment(commentData.comment);
    setCreateOrEdit({ postOrPut: 1, comment: commentData });
  }

  return (
    <div>
      <div className="commentWrapper">
        <p>{commentData.comment}</p>
        <p>{commentData.time.slice(0, 10)}</p>

        <button className="editCommentButton" onClick={handleEditComment}>
          Edit Comment
        </button>
        <button className="deleteCommentButton" onClick={handleDeleteComment}>
          Delete
        </button>
      </div>
    </div>
  );
}
