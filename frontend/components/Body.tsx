import Doing from "./Doing";
import Done from "./Done";
import DownNavBar from "./DownNavBar";
import ToDo from "./ToDo";
import React, { useState, useRef } from 'react';


export default function Body() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const  dragStart = (e:any, position:any) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
  const dragEnter = (e:any, position:any) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  return (
    <>
      <DownNavBar />
      <div className="container" style={{}}>
        <ToDo 
        dragStart={dragStart}
        dragEnter={dragEnter}/>
        <Doing 
        dragStart={dragStart}
        dragEnter={dragEnter}/>
        <Done 
        dragStart={dragStart}
        dragEnter={dragEnter}/>
      </div>
    </>
  );
}
