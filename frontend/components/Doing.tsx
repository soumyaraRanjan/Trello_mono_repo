import { useState } from "react";
import Swal from "sweetalert2";


export default function Doing () {
  const [modal,setModal] = useState (false)
  const [Title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const data = {
    title:"",
    content:""
  }
  const [todo,SetTodo] = useState([data])

  const onClick = () =>{
    setModal(!modal);
    console.log("click function",modal);
    

  };
  const onSubmit = (e:any) =>{
   
    if (!Title && !content) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fill in your title and content or close the form!'
      })
  } else if (!Title && content) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fill in your title!'
      })
  } else if (Title && !content) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fill in your content!'
      })
  } else {
    data.title=Title
    data.content=content
    todo.push(data)
    localStorage.setItem('Todo',JSON.stringify(todo) );

    console.log("my data",todo);
    
  }
  setTitle('');
  setContent('');

  }
    return(
        <>
        <div className="card">
        <div className="card-body">
          <div className="headrs">
      <div>
        <h5 className="card-title bi bi-plus-lg font-weight-bold text-xl-left">DOING</h5>
      </div>
    <div className="btn">
      <button className="button " onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-lg "  viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
    </svg>

      </button>
    </div>

    </div>
    <div className="section">
    <div className="cards">
  <div className="card-header">
  Title
  </div>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
    
  </div>
</div>
{ 
  modal && (
    <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" >
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">To Do</h2>
              <p className="text-white-50 mb-5">Please Title  and Content here!</p>

              <div className="form-outline form-white mb-4">
              <label className="form-label" >Title</label>

                <input type="text" 
                 className="form-control form-control-lg" 
                 placeholder="Write your title here"
                 value={Title} onChange={(e) => setTitle(e.target.value)}
                 />
              </div>

              <div className="form-outline form-white mb-4">
                <label className="form-label" >Content</label>
                <input type="text"  
                className="form-control form-control-lg mb-5 py-5" 
                placeholder="Write your title here"
                value={content} onChange={(e) => setContent(e.target.value)}

                />
              </div>


              <button className="btn btn-outline-light btn-lg px-5"
               type="submit" onClick={onSubmit}
               >
                Submit
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}
        </>

    );
}