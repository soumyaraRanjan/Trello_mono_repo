import { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface x{
  dragEnters:Function,
  dragStart:Function,
  drop:Function
}
// export default function Doing(dragStart:any,dragEnter:Function) {
  const Doing:React.FC<x> = ({dragEnters,dragStart,drop}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [body, setBody] = useState<{ title: string; content: string; id:any;}>({
    title: "",
    content: "",
    id:null
  });
  const [todo, setTodo] = useState<typeof body[]>([]);

  useEffect(() => {
    const existingTodo = JSON.parse(localStorage.getItem("Doing")!);
    if (existingTodo) {
      setTodo(existingTodo);
    }
  }, []);

  useEffect(() => {
    todo?.length ? localStorage.setItem("Doing", JSON.stringify(todo)) : null;
  }, [todo]);

  const onClick = () => {
    setModal(!modal);
  };
  const onSubmit = (e: SubmitEvent) => {
    const { title, content } = body;
    if (!title || !content) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
      });
      return;
    }

    setTodo([...todo, body]);
    setBody({ title: "", content: "" ,id:null});
  };
  const setData = (item:any,index:any) => {
    const { title, content } = body;
    setBody({ title: item.title, content: item.content,id:index});
    
    console.log(body);
    
 }

 const updateData = () =>{
  const data = JSON.parse(localStorage.getItem('Doing'))
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
  localStorage.setItem('Doing',JSON.stringify(data));
  setBody({ title: "", content: "" ,id:null});



 }

  return (
    <>
      <div className="card" style={{ marginRight: "20px" }}>
        <div className="card-body">
          <div className="headrs">
            <div>
              <h5 className="card-title bi bi-plus-lg font-weight-bold text-xl-left">
                DOING
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
                <div
                  key={index}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => {
                    // dragEnter(e, index)
                    dragEnters(e,index)
                    console.log("this is the drag enter doing");

                    // console.log("thhhh----",dragEnter);
                    
                  }}
                  onDragEnd={()=> {drop()
                 
                    console.log("--------------------------this is the  drop in  doing");
                  }}

                  className="todo-card section"
                  style={{ marginBottom: "8px", borderRadius: "10px" }}
                  draggable
                >
                  <p className="card-header" style={{ fontWeight: "bold" }}>
                    {item?.title}
                  </p>
                  <div className="card-body">
                    <p className="card-text">{item?.content}</p>
                  </div>
                  <button className="btn btn-primary" onClick={()=> {
      setModal(true)
      setData(item,index)
      }}>Edit</button>
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
          <span
            onClick={() => setModal(!modal)}
            style={{
              position: "absolute",
              top: "2%",
              left: "60%",
              zIndex: "200",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            X
          </span>
          <div
            className="card-body p-5 text-center modal-style"
            style={{ backgroundColor: "#0f0f0f" }}
          >
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">To Do</h2>
              <p className="text-white-50 mb-5">
                Please Title and Content here!
              </p>

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
                <input
                  type="text"
                  className="form-control form-control-lg mb-5 py-5"
                  placeholder="Write your title here"
                  value={body.content}
                  name="content"
                  onChange={(e) =>
                    setBody({ ...body, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-outline-light btn-lg px-5"
                type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-outline-light btn-lg px-5"
                type="submit"
                onClick={updateData}
              >
                update
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}


export default Doing