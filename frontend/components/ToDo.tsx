import Link from "next/link";
import React, { MouseEventHandler, useEffect, useState ,useRef} from "react";
import Swal from "sweetalert2";

interface x{
  dragEnters:Function,
  dragStart:Function,
  drop:Function
}


const ToDo:React.FC<x> = ({dragEnters,dragStart,drop}) => {
// export default function ToDo(dragStart:any,dragEnter:any) {
  // const Todo:React.RC
  const [modal, setModal] = useState<boolean>(false);
  const [button,setButton] = useState<boolean>(false)
  const [submitButton,setsubmitButton] = useState<boolean>(false)

  const [body, setBody] = useState<{ title: string; content: string; id:any;}>({
    title: "",
    content: "",
    id:null
  });
  const [todo, setTodo] = useState<typeof body[]>([]);

  useEffect(() => {
    const existingTodo = JSON.parse(localStorage.getItem("Todo")!);
    if (existingTodo) {
      setTodo(existingTodo);
    }
  }, []);

  useEffect(() => {
    todo?.length ? localStorage.setItem("Todo", JSON.stringify(todo)) : null;
  }, [todo]);

  const onClick = () => {
    setsubmitButton(true)
    setModal(!modal);
    setButton(false)
  };
  const onSubmit = (e: any) => {
    var letters = /^[A-Za-z]+$/;
    const { title, content ,id} = body;
    if (!title || !content || !id || !body.content.match(letters)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      
      return;
    }
    
    setModal(!modal)
    setTodo([...todo, body]);
    setBody({ title: "", content: "" ,id:null});
  };

  const setData = (item:any,index:any) => {
    setButton(true)
    setsubmitButton(false)
    const { title, content } = body;
    setBody({ title: item.title, content: item.content,id:index});
    
    console.log(body);
    
 }

 const updateData = () =>{
  const data = JSON.parse(localStorage.getItem('Todo')|| '{}')
  let allData= {
    id:body.id,
    title:body.title,
    content:body.content
  };
  setTodo(data)
  console.log("updated id",data);
  
  data[body.id].title=body.title
  data[body.id].content=body.content
  setBody(allData);
  localStorage.setItem('Todo',JSON.stringify(data));
  setBody({ title: "", content: "" ,id:null});
  setModal(!modal)

 };

  return (
    <>
     
      <div className="card" style={{ marginRight: "20px" }}>
        <div className="card-body">
          <div className="headrs">
            <div>
              <h5 className="card-title bi bi-plus-lg font-weight-bold text-xl-left">
                Todo
              </h5>
            </div>
            <div className="btn" onClick={onClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-plus-lg "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>
            </div>
          </div>
          <div className="">
            {todo.length &&
              todo.map((item, index) => (
              //   <Link
              //   href={`/todo/${index}`}
                
              // > 
                <div
                  key={index}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => {
                    console.log("this is the drag enter todo");
                    dragEnters(e, index)

                    // console.log("drag---",dragEnter);
                    
                  }}
                  onDragEnd={(e)=> {drop(e)
                 
                    console.log("this >>>>>>>>>>> is the drag drop todo");
                  }}

                  className="todo-card section"
                  style={{ marginBottom: "8px", borderRadius: "10px" }}
                  draggable
                >
                  <div className="d-flex ">

                  <div className="card-header w-100" style={{ fontWeight: "bold" }}>
                    {item?.title}
                  </div>
                  <div className="card-header" style={{ fontWeight: "bold" }}>
                    {item?.id}
                  </div>
                  </div>
                  <div className="card-body d-flex justify-content-between">

                    <div className="card-text">{item?.content}</div>
                    <div className="">
                  <button className="btn btn- bg-transparent " onClick={()=> {
      setModal(true)
      setData(item,index)
      }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil  " viewBox="0 0 16 16">
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg></button>
       <Link href={`/todo/${item.id}`}> 
            <button className="btn btn- bg-transparent mx-100" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>  
              </button>
        </Link> 
       </div>
       </div>
      </div>
                
              ))}
          </div>
        </div>
      </div>
      
      {modal && (
        <section
          className="gradient-custom "
          style={{
            color: "#fff",
            height: "100vh",
            width: "100vw",
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            zIndex: "100",
            backgroundColor: "rgba(0,0,0, .2)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="p-5 text-center modal-style"
            style={{ backgroundColor: "#0f0f0f", borderRadius: "10px" }}
          >
            <span
              onClick={() => setModal(!modal)}
              style={{
                position: "absolute",
                top: "2%",
                left: "90%",
                zIndex: "200",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              X
            </span>
            <div className="">
              <h2 className="fw-bold mb-2 text-uppercase">To Do</h2>
              <p className="text-white-50 mb-5">
                Please Write Title and Content here!
              </p>
              <div className="form-outline form-white mb-4">
                <label className="form-label">Id</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Id"
                  value={body.id}
                  name="id"
                  onChange={(e) =>
                    setBody({ ...body, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label">Title</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Write your title here"
                  value={body.title}
                  name="title"
                  onChange={(e) =>
                    setBody({ ...body, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control form-control-lg mb-5 "
                  placeholder="Write your title here"
                  value={body.content}
                  name="content"
                  onChange={(e) =>
                    setBody({ ...body, [e.target.name]: e.target.value })
                  }
                />
              </div>
             {
              submitButton  && (
                <button
                className="btn btn-outline-light btn-lg px-5"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>

              )
             }

             
              {
                button && (
                  <button
                  className="btn btn-outline-light btn-lg px-5"
                  type="submit"
                  onClick={updateData}
                >
                  update
                </button>
                )
              }
             
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ToDo