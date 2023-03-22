
import React, { useContext } from "react";
import { AppContext } from "../pages/Test1$";


function AddArt() {
  const { Post, setPost } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    data.append("post[title]", event.target.title.value);
    data.append("post[image]", event.target.image.files[0]);
    data.append("post[description]", event.target.description.value);
    data.append("post[category]", event.target.category.value);
    data.append("post[artist]", event.target.artist.value);


    submitToAPI(data);
  }


  function submitToAPI(data) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data.image_url);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>FileForm</h1>
      <br/>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />


        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
        <br />

        <label htmlFor="category">category</label>
        <textarea name="category" id="category"></textarea>
        <br />

        <label htmlFor="artist">artist</label>
        <textarea name="artist" id="artist"></textarea>
        <br />

        <label htmlFor="image">Image</label>
        <input type="file" name="image" id="image" />
        <br />

        <button type="submit">Create Post</button>
      </form>

    </div>

  );
}

export default AddArt;
