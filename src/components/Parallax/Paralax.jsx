import React from 'react';
import { Parallax } from 'react-parallax';
import Parallax1 from '../../assets/parallax1.jpg';



const Paralax = () => (
    <div className='parallax-container'>
    <Parallax className='image' blur={0} bgImage={Parallax1} strength={300} bgImageStyle={{minHeight:"100vh"}}>
        <div className='content'>
            <span className="img-txt">Leboncoin des dessins</span>
        </div>
    </Parallax>
    </div>
);

export default Paralax;