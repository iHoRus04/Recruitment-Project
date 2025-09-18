import { useRoutes } from "react-router-dom";
import LayoutDefault from "../components/Layout";
import Home from "../pages/Home";
import SearchResult from "../components/SearchResult";
import JobDetails from "../components/JobDetails";
import Company from "../pages/Company";
import CompanyResult from "../components/CompanyResult";
import PrivateProtect from "../components/PrivateProtect";
import LayoutAdmin from "../components/LayoutAdmin";
import CompanyStatistic from "../pages/Dashboard/CompanyStatistic";
import InfoCompany from "../pages/Dashboard/InfoCompany";
import ManageCV from "../pages/Dashboard/ManangeCV";
import DetailCV from "../pages/Dashboard/detailCV";
import ManageJobs from "../pages/Dashboard/ManageJobs";
import DetailJob from "../pages/Dashboard/DetailJob";
import CreateJob from "../components/CreateJob";
function RouterObject (){
    const routers = useRoutes([
        {
            path: "/",
            element: <LayoutDefault/>,
            children:[{
                index: true,
                element: <Home/>
            },
            {
                path:"search",
                element: <SearchResult/> 
            },
            {
                path:"jobs/:id",
                element: <JobDetails/> 
            },
            {
                path:"companies",
                element: <Company/> 
            },
            {
                path:"companies/:id",
                element: <CompanyResult/> 
            }
            ]
        },
        {
            element:<PrivateProtect/>,
            children:[
                {
                    path:"admin",
                    element:<LayoutAdmin/>,
                    children:[
                        {
                            index: true,
                            element: <CompanyStatistic/>
                        },
                        {
                            path: "info-company",
                            element: <InfoCompany/>
                        },
                        {
                            path: "manage-cv",
                            element: <ManageCV/>
                        },
                        {
                            path: "manage-cv/:id",
                            element: <DetailCV/>
                        },
                        {
                            path: "manage-jobs",
                            element: <ManageJobs/>
                        },
                        {
                            path: "manage-jobs/:id",
                            element: <DetailJob/>
                        },
                        {
                            path: "create-job",
                            element: <CreateJob/>
                        },

                        
                    ]
                }
            ]

        }
    ]);
    return routers;
}
export default RouterObject;