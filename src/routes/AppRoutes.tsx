import { MainLayout } from "@/components/layout"
import { AsylumRequests } from "@/pages/asylumRequests"
import { Dashboard } from "@/pages/dashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/requests" element={<AsylumRequests/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}