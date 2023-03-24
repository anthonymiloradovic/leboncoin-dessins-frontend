import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

function Tinder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  const [posts, setPosts] = useState([]);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(posts.length)
        .fill(0)
        .map((i) => React.createRef()),
    [posts.length]
  );

  useEffect(() => {
    fetch('https://starfish-app-3xk6j.ondigitalocean.app/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.sort((a, b) => a.id - b.id)); // tri des images dans l'ordre
      })
      .catch((error) => console.error(error));
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex > 0;

  const canSwipe = currentIndex < posts.length;

  const swiped = (direction, nameToDelete, index) => {
    console.log(`Swiped ${nameToDelete} (${index}), direction: ${direction}`);
    setLastDirection(direction);
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      const newPosts = [...posts];
      const removed = newPosts.splice(idx, 1)[0];
      newPosts.push(removed);
      setPosts(newPosts);

      childRefs[idx].current.restoreCard();
      updateCurrentIndex(currentIndexRef.current - 1);
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < posts.length) {
      await childRefs[currentIndex].current.swipe(dir);
      setPosts(posts.slice(0, currentIndex).concat(posts.slice(currentIndex + 1)));
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex - 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        {posts.map((post, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={post.id}
            onSwipe={(dir) => swiped(dir, post.title, index)}
            onCardLeftScreen={() => outOfFrame(post.title, index)}
          >
            <div style={{ backgroundImage: `url(${post.image_url})` }} className="card">
              <h3>{post.title}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>
          Swipe left!
        </button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>
          Undo swipe!
        </button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Tinder