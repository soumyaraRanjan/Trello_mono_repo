import Doing from "./Doing";
import Done from "./Done";
import DownNavBar from "./DownNavBar";
import ToDo from "./ToDo";
import React, { useState, useRef, useEffect } from 'react';


const Body =()=> {

  const [todo, setTodo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])

  useEffect(() => {
    const getTodoData = JSON.parse(localStorage.getItem("Todo")!);
    if (getTodoData) {
      setTodo(getTodoData);
    }
  }, []);
  useEffect(() => {
    const getDoingData = JSON.parse(localStorage.getItem("Doing")!);
    if (getDoingData) {
      setDoing(getDoingData);
    }
  }, []);

  useEffect(() => {
    const getDoneData = JSON.parse(localStorage.getItem("Done")!);
    if (getDoneData) {
      setDone(getDoneData);
    }
  }, []);
  console.log("body data todo",todo);
  console.log("body data doing",doing);
  console.log("body data done",done);


  

  const dragItem = useRef();
  const dragOverItem = useRef();

  const  dragStart = (e:any, position:any) => {
    dragItem.current = position;
    console.log("this is the drag start");
    
    console.log(e.target.innerHTML);
  };
  const dragEnters = (e:any, position:any) => {
    dragOverItem.current = position;
    console.log("this is the drag enter");

    console.log(e.target.innerHTML);
  };

  const drop = (e:any) => {
    const copyListItems = [...doing];
    // const dragItemContent = copyListItems[dragItem.current];
    // copyListItems.splice(dragItem.current, 1);
    // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = null;
    // dragOverItem.current = null;
    // setDoing(copyListItems);
    // localStorage.setItem('Doing',JSON.stringify(doing));

    console.log("body drop",doing);
    
  };
  return (
    <>
      <DownNavBar />
      <div className="container" style={{}}>
        <ToDo 
        dragStart={dragStart}
        dragEnters={dragEnters} 
        drop={drop}/>
        <Doing 
        dragStart={dragStart}
        dragEnters={dragEnters}
        drop={drop}/>
        <Done 
        dragStart={dragStart}
        dragEnters={dragEnters}/>
      </div>
    </>
  );
}
export default Body 
