import { IPost, IComment } from "../utils/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import Comment from "./Comment";

//Maybe change postToDisplay and idPostToDisplay if theyre confusing
interface IProps {
  postToDisplay: IPost;
  setPageToDisplay: React.Dispatch<React.SetStateAction<string>>;
  setIdPostToDisplay: React.Dispatch<React.SetStateAction<number>>;
}

export default function IndividualPostPage({
  postToDisplay,
  setPageToDisplay,
  setIdPostToDisplay,
}: IProps): JSX.Element {
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [typeComment, setTypeComment] = useState<string>("");

  useEffect(() => {
    async function getComments(): Promise<void> {
      const dbres: IComment[] = (
        await axios.get(`${url}/${postToDisplay.id}/comments`)
      ).data.data;
      setCommentList(dbres);
    }
    if (!isNaN(postToDisplay.id)) {
      getComments();
    }
  }, [postToDisplay]);

  function backToHomepage(): void {
    setPageToDisplay("homepage");
    setIdPostToDisplay(NaN);
  }

  async function addComment(): Promise<void> {
    await axios.post(`${url}/${postToDisplay.id}/comments`, {
      comment: typeComment,
    });
    const dbres: IComment[] = (
      await axios.get(`${url}/${postToDisplay.id}/comments`)
    ).data.data;
    setCommentList(dbres);
    setTypeComment("");
  }

  return (
    <div>
      <p>{postToDisplay.title}</p>
      <p>{postToDisplay.message}</p>
      <p>{postToDisplay.post_date}</p>
      <div className="all-comments">
        {commentList.map((comment) => (
          <Comment
            key={comment.comment_id}
            commentData={comment}
            setCommentList={setCommentList}
          />
        ))}
      </div>
      <input
        onChange={(e) => setTypeComment(e.target.value)}
        value={typeComment}
        placeholder="Add comment!"
      />
      <button onClick={addComment}>Submit</button>
      <button onClick={backToHomepage}>Homepage</button>
    </div>
  );
}
