import React from 'react';
import { Parallax } from 'react-parallax';
import Fleur from '../../assets/home3.jpg';



const Paralax = () => (
    <div className='parallax-container'>
    <Parallax className='image' blur={0} bgImage={Fleur} strength={300} bgImageStyle={{minHeight:"100vh"}}>
        <div className='content'>
            <span className="img-txt">Des dessins à tout va</span>
        </div>
    </Parallax>
    </div>
);

export default Paralax;