import {Outlet} from "react-router-dom";
function Main(){
    return(
        <>
            <div className="layout__main">
                <Outlet/>
            </div>
        </>
    )
}
export default Main;