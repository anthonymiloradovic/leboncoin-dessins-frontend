import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../pages/Test1$';

function Art() {
  const { Post, setPost } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPosts(data);
        setPost(data[0].image_url);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <h3>{post.category}</h3>
          <h3>{post.artist}</h3>
          <img src={post.image_url} alt="post" className="image"/>
        </div>
      ))}
    </div>
  )
}

export default Art;
