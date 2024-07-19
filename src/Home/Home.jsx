import React from 'react';
import Header from './Header';
import Ballina from './Ballina.jpg';
import SmallBallina from './SmallBallina.png';

export default function Home() {
  return (
    <>
      <Header pos={false}/>
      <img src={Ballina} alt="" className="full-height-image md:block hidden" />
      <img src={SmallBallina} alt="" className="full-height-image md:hidden" />
    </>
  );
}
