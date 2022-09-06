import { IPost } from "./types";

export default function findPostFromId(allPosts: IPost[], id: number): IPost {
  const postToReturn = allPosts.find((post) => post.id === id);
  if (postToReturn === undefined) {
    return {
      title: "error",
      message: "error",
      id: NaN,
      post_date: "error",
    };
  } else {
    return postToReturn;
  }
}
