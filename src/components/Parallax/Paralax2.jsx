import React from 'react';
import { Parallax } from 'react-parallax';
import Parallax2 from "../../assets/parallax2.jpg";


const Paralax2 = () => (
    <div className='parallax-container'>
    <Parallax className='image' blur={0} bgImage={Parallax2} strength={300} bgImageStyle={{minHeight:"100vh"}}>
        <div className='content'>
            <span className="img-txt">Ouvert a tout le monde</span>
        </div>
    </Parallax>
    </div>
);

export default Paralax2;