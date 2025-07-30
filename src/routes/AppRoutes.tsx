import { MainLayout } from "@/components/layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout/>}/>
        </Routes>
        </BrowserRouter>
    )
}