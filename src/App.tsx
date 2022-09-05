import { greet } from "./utils/greet";
import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from "./utils/types";
import InputText from "./component/InputText";
import ElementItem from "./component/ElementItem";

export const url = "http://localhost:4000";

function App(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function getPosts(): Promise<void> {
      const serverRes: IPost[] = (await axios.get(url)).data.data;
      setPosts(serverRes);
    }
    getPosts();
  }, []);

  return (
    <>
      <InputText setPosts={setPosts} />
      <div id="all-pastes">
        {posts.map((element) => (
          <ElementItem key={element.id} element={element} setPosts={setPosts} />
        ))}
      </div>
    </>
  );
}

export default App;
