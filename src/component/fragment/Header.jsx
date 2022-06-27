import React from "react";
import Button from "../common/Button";
import ModelLogin from "./ModelLogin";
import { useModal } from "../../store/hooks";
import {Link} from "react-router-dom"
import { useState } from "react";

function Header() {
  const { isShowing, toggle } = useModal();
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  // console.log(isShowingMenu);
  return (
    <header>
      <nav>
        <div>
          <div className="row-flex j-content-between a-items-center">
            
              <div className="nav__title">CHINH-APP</div>
              <div className="nav__mobileview">
                <button
                  onClick={() => {
                    setIsShowingMenu(!isShowingMenu);
                  }}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
              <div className={`row-flex nav__desktopview`}>
                <div>
                  <ul className="row-flex j-content-between a-items-center nav__list__menu">
                    <li>
                      <Link to="/">HOME </Link>
                    </li>
                    <li>
                      <Link to="/todolist2">TO DO LIST 2</Link>
                    </li>
                    <li>
                      <Link to="/todolist">TO DO LIST</Link>
                    </li>
                  </ul>
                </div>
                <div className="row-flex a-items-center nav__form">
                  <Button
                    title="Login"
                    classProps="btn--yellow"
                    handleClick={toggle}
                  />
                  <Button
                    title="Register"
                    classProps="btn"
                    handleClick={toggle}
                  />
                  <ModelLogin isShowing={isShowing} hide={toggle} />
                </div>
              </div>
              
            
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
