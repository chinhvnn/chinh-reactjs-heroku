import React from "react";
import Divider from "../common/Divider";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { actUpdateTaskSuccess } from "../../redux/actions/tdl2Action";

function TaskItem({ id, title, status, creator, description }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-flex-md-3 p-2">
        <div className="task-item">
          <div>
            <p className="task-item__title">Title: {title}</p>
            <p>Creator: {creator}</p>
            <p
              className={
                status === "New"
                  ? "task-item__status"
                  : (status === "Done"
                  ? "task-item__status-done"
                  : "task-item__status-doing")
              }
            >
              Status: {status}
            </p>
            <Divider />
            <p className="task-item__title">Description:</p>
            <p className="task-item__des">{description}</p>
          </div>
          <div className="task-item__btn">
            <Link to={"/todolist2/"+id}><button className="btn-default" onClick={()=>dispatch(actUpdateTaskSuccess(false))}>Update</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItem;
