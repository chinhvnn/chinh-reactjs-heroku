import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  actChangeFilter,
  actGetCurrentPage,
} from "../../redux/actions/tdl2Action";
import { useSelector } from "react-redux/es/exports";
import LeftSideBarSkeleton from "../skeleton/LeftSideBarSkeleton";

function LeftSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const data = useSelector((state) => state.tasksData);
  const isLoading = useSelector((state) => state.isLoading);

  const handleFilter = (str) => {
    navigate("/todolist2", { replace: true });
    dispatch(actChangeFilter(str));
    dispatch(actGetCurrentPage(1));
  };
  return (
    <div className="col-flex-md-2 left-side-bar p-3">
      <p>
        <i className="fa fa-tachometer" aria-hidden="true"></i> DASHBOARD
      </p>
      <hr></hr>
      {isLoading?<LeftSideBarSkeleton/>:(<ul>
        <li>
          <span
            style={filter === "All" ? { color: "rgb(80, 3, 110)" } : {}}
            onClick={() => handleFilter("All")}
          >
            All task ({data.length})
          </span>
        </li>
        <li>
          <span
            style={filter === "New" ? { color: "rgb(80, 3, 110)" } : {}}
            onClick={() => handleFilter("New")}
          >
            New task ({data.filter(i => i.status === "New").length})
          </span>
        </li>
        <li>
          <span
            style={filter === "Doing" ? { color: "rgb(80, 3, 110)" } : {}}
            onClick={() => handleFilter("Doing")}
          >
            Doing task ({data.filter(i => i.status === "Doing").length})
          </span>
        </li>
        <li>
          <span
            style={filter === "Done" ? { color: "rgb(80, 3, 110)" } : {}}
            onClick={() => handleFilter("Done")}
          >
            Done task ({data.filter(i => i.status === "Done").length})
          </span>
        </li>
      </ul>)}
    </div>
  );
}

export default LeftSideBar;
