import Doing from "./Doing";
import Done from "./Done";
import DownNavBar from "./DownNavBar";
import ToDo from "./ToDo";

export default function Body () {
    return(
        <>
        <DownNavBar/>
        <div className="container">
            <div>
                <ToDo/>
            </div>
            <div>
                <Doing/>
            </div>
            <div>
                <Done/>
            </div>

        </div>
        </>
    );
}