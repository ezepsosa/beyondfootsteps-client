import { MainLayout } from "@/components/layout"
import { Dashboard } from "@/pages/dashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}