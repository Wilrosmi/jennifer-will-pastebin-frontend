import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from "./utils/types";
import InputText from "./component/InputText";
import ElementItem from "./component/ElementItem";
import IndividualPostPage from "./component/IndividualPostPage";
import findPostFromId from "./utils/findPostFromId";

// Change to http://localhost:4000 if running server locally
// export const url = "http://localhost:4000";

export const url = "https://jennifer-will-pastebin-backend.herokuapp.com";

function App(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [sideSummary, setSideSummary] = useState<string>("");
  const [pageToDisplay, setPageToDisplay] = useState<string>("homepage");
  const [idOfPostToDisplay, setIdOfPostToDisplay] = useState<number>(NaN);
  const [editPost, setEditPost] = useState<number>(NaN);

  useEffect(() => {
    async function getPosts(): Promise<void> {
      const serverRes: IPost[] = (await axios.get(url)).data.data;
      setPosts(serverRes);
    }
    getPosts();
  }, []);

  return (
    <div>
      <h1 className="title">Welcome to Will & Jennifer's Pastebin!</h1>
      {pageToDisplay === "homepage" ? (
        <div>
          <InputText
            setPosts={setPosts}
            postToEdit={findPostFromId(posts, editPost)}
            setEditPost={setEditPost}
          />
          <div id="all-pastes">
            {posts.map((element) => (
              <ElementItem
                key={element.id}
                element={element}
                setPosts={setPosts}
                setSideSummary={setSideSummary}
                setIdOfPostToDisplay={setIdOfPostToDisplay}
                setPageToDisplay={setPageToDisplay}
                setEditPost={setEditPost}
              />
            ))}
          </div>
          <p className="side-summary">{sideSummary}</p>
        </div>
      ) : (
        <IndividualPostPage
          postToDisplay={findPostFromId(posts, idOfPostToDisplay)}
          setPageToDisplay={setPageToDisplay}
          setIdPostToDisplay={setIdOfPostToDisplay}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}

export default App;
