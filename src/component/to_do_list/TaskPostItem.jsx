import React, { useContext } from "react";
import Button from "../common/Button";
import Divider from "../common/Divider";
import { EventHandleContext } from "./TaskList";

function TaskPostItem({ listItemPerPage }) {
  const {
    handleClickDelete,
    handleClickUpdate,
    handleCheckCompleted,
  } = useContext(EventHandleContext);

  return (
    <div>
      {listItemPerPage.map((val) => (
        <div key={val.id}>
          <div className={"tasks__item"}>
            <p className={val.isCompleted ? "color-blue" : ""}>
              {val.id + " - " + val.content}
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                classProps="btn-check"
                title={
                  <i
                    className={
                      "fa fa-check-circle" +
                      (val.isCompleted ? " color-blue" : " color-gray")
                    }
                  ></i>
                }
                handleClick={() => handleCheckCompleted(val.id)}
              />

              <Button
                classProps="btn-special"
                title={<i className="fa-solid fa-pen-to-square"></i>}
                handleClick={() => handleClickUpdate(val.id)}
              />

              <Button
                classProps="btn-special"
                title={<i className="fa-solid fa-trash"></i>}
                handleClick={() => handleClickDelete(val.id)}
              />
            </div>
          </div>
          <Divider width="100%" />
        </div>
      ))}
    </div>
  );
}
export default TaskPostItem;
