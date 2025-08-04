import { Outlet } from "react-router-dom"
import { Container } from "./styles"
import { Navbar } from "./navbar"

export const MainLayout = () => {
    return (
        <Container>
            <Navbar/>
            <Outlet/>
        </Container>
    )
}