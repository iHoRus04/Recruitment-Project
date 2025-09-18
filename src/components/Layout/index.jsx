
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";


function LayoutDefault(){
    
    return(
        <>
           

            <div className="layout">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </>
    )
}
export default LayoutDefault;