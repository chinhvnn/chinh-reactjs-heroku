import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import ModelLogin from "./ModelLogin";
import { useModal } from "../../store/hooks";
import { Link } from "react-router-dom";

function Header() {
  //init
  const { isShowing, toggle } = useModal();
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isViewMobile, setIsViewMobile] = useState(
    window.innerWidth < 768 && true
  );

  //lifecycle
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {};
  }, []);

  //handle resize to responsive
  const handleResize = () => {
    setIsViewMobile(window.innerWidth < 768 ? true : false);
    setIsShowingMenu(window.innerWidth >768 && false)
  };

  const Menu = () => {
    return (
      <div className={`row-flex`} style={isViewMobile?{flexDirection:"column"}:{}}>
        <div>
          <ul className="row-flex nav__list__menu" style={isViewMobile?{flexDirection:"column", margin:"10px"}:{}}>
            <li className="m-1">
              <Link to="/">HOME </Link>
            </li>
            <li className="m-1">
              <Link to="/todolist2">TO DO LIST 2</Link>
            </li >
            <li className="m-1">
              <Link to="/todolist">TO DO LIST</Link>
            </li>
          </ul>
        </div>
        <div className="row-flex a-items-center nav__form">
          <Button title="Login" classProps="btn--yellow" handleClick={toggle} />
          <Button title="Register" classProps="btn" handleClick={toggle} />
          <ModelLogin isShowing={isShowing} hide={toggle} />
        </div>
      </div>
    );
  };

  return (
    <header>
      <nav>
        <div>
          {isViewMobile ? (
            <div className="row-flex j-content-between a-items-center">
              <div className="nav__title">CHINH-APP</div>
              <div className="m-2">
                <button
                  onClick={() => {
                    setIsShowingMenu(!isShowingMenu);
                  }}
                >
                  <i className="fa-solid fa-bars" style={{fontSize: "1.5rem"}}></i>
                </button>
              </div>
              {isShowingMenu&&(
              <div style={{flexBasis:"100%"}}>
                {Menu()}
              </div>)}
            </div>
          ) : (
            <div className="row-flex j-content-between a-items-center">
              <div className="nav__title">CHINH-APP</div>
              <div>{Menu()}</div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
