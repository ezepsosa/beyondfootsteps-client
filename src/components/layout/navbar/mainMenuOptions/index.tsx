import { useLocation } from "react-router-dom";
import { LinkElement } from "../general/style";

export const MainMenuOptions = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <LinkElement
        to="/dashboard"
        $active={currentPath === "/dashboard"}
        $linearGradient="linear-gradient(90deg, #232526, #414345);"
      >
        Dashboard
      </LinkElement>
      <LinkElement
        to="/requests"
        $active={currentPath === "/requests"}
        $linearGradient="linear-gradient(90deg, #232526, #414345);"
      >
        Asylum Requests
      </LinkElement>
      <LinkElement
        to="/decisions"
        $active={currentPath === "/decisions"}
        $linearGradient="linear-gradient(90deg, #232526, #414345);"
      >
        Asylum Decisions
      </LinkElement>
      <LinkElement
        to="/resettlements"
        $active={currentPath === "/resettlements"}
        $linearGradient="linear-gradient(90deg, #232526, #414345);"
      >
        Resettlements
      </LinkElement>
    </>
  );
};
