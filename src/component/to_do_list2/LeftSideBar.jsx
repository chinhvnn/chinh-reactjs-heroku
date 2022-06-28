import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actChangeFilter , actChangePage } from "../../redux/reducer";
import { useSelector } from "react-redux/es/exports";

function LeftSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleFilter = (str) => {
    navigate("/todolist2", { replace: true });
    dispatch(actChangeFilter(str));
    dispatch(actChangePage(1));
  };
  return (
    <div className="col-flex-md-2 left-side-bar p-3">
      <p>
        <i className="fa fa-tachometer" aria-hidden="true"></i> DASHBOARD
      </p>
      <hr></hr>
      <ul>
        <li>
          <span style={filter==="All"?{color: "rgb(80, 3, 110)"}:{}} onClick={() => handleFilter("All")}>All task</span>
        </li>
        <li>
          <span style={filter==="New"?{color: "rgb(80, 3, 110)"}:{}} onClick={() => handleFilter("New")}>New task</span>
        </li>
        <li>
          <span style={filter==="Doing"?{color: "rgb(80, 3, 110)"}:{}} onClick={() => handleFilter("Doing")}>Doing task</span>
        </li>
        <li>
          <span style={filter==="Done"?{color: "rgb(80, 3, 110)"}:{}} onClick={() => handleFilter("Done")}>Done task</span>
        </li>
      </ul>
    </div>
  );
}

export default LeftSideBar;
