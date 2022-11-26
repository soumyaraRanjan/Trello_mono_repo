

import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const DonePage =() =>{
  const [done,setDone] = useState ()
    const routs = useRouter();
    const id=routs.query.done_id;
    console.log("-------------------",id);
    useEffect(() => {
      const existingTodo = JSON.parse(localStorage.getItem("Done")!);
      if (existingTodo) {
        setDone(existingTodo);
      }
    }, []);

    
    
  
    
    
    
    return(
       
            <div className="d-flex justify-content-center "style={{ marginTop: '20rem' }}>
            <div className="card text-white bg-primary mb-3 " >
            {done?.filter(data => data.id == id).map(filteredPerson => (
              <div>
       < div className="card-header">Header</div>
          <div className="card-body">
          <h5 className="card-title">{filteredPerson.title}</h5>
          <p className="card-text">{filteredPerson.content}Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       </div>
       </div>
  ))}
        </div>
        </div>
    )

}
export default DonePage