import React, { useState } from "react";

const Footer = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="footer">
      <div className="top">
        <div>
          <h1>LeBonCoinDuDessin</h1>
          <p>Choisis ton dessin au meilleur prix</p>
        </div>
      </div>
      <div className="bottom">
        <div>
          <h4>Github </h4>
          <a href="https://github.com/anthonymiloradovic/leboncoin-dessins-frontend">
            {" "}
            Front
          </a>
          <a href="https://github.com/klt56/final-project2"> Back</a>
        </div>
        <div>
          <h4>Communauté Github</h4>
          <a href="https://github.com/anthonymiloradovic"> Anthony</a>
          <a href="https://github.com/klt56"> Kevin</a>
          <a href="https://github.com/jerryfarwell"> Jerry</a>
          <a href="https://github.com/Sarahmela93"> Sarah</a>
        </div>
        <div>
          <h4>Aide</h4>
          <a
            href="/"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Contact nous
          </a>
          {isHovering && <p>au: 0101010101</p>}
          <a href="/">Nous supporter</a>
        </div>
        <div>
          <h4>A Propos</h4>
          <a href="/">Notre histoire</a>
          <a href="/">Notre team</a>
          <a href="/">Carrieres</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
