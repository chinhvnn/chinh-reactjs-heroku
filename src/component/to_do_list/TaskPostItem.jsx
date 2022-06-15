import React, { Component } from "react";
import Button from "../common/Button";
import Divider from "../common/Divider";

class TaskPostItem extends Component {
  render() {
    const {clickDelete, clickUpdate, clickCheckCompleted, listItemPerPage} = this.props;
    // console.log(typeDataList);

    return (
      <div>
        {listItemPerPage.map((val) => (
        <div key={val.key}>
          <div className={"task-post-item"} >
            <p className={val.isCompleted ? "color-blue" : ""}>{val.key +' - '+ val.content}</p>
            <div style={{ display: "flex", alignItems: "center" }}>

            <Button
                classProps="btn-check"
                title={<i className={"fa fa-check-circle" + (val.isCompleted?" color-blue":" color-gray")}></i>}
                handleClick={() => clickCheckCompleted(val.key)}
              />
           
              <Button
                classProps="btn-special"
                title={<i className="fa-solid fa-pen-to-square"></i>}
                handleClick={() => clickUpdate(val.key)}
              />

              <Button
                classProps="btn-special"
                title={<i className="fa-solid fa-trash"></i>}
                handleClick={() => clickDelete(val.key)}
              />
            </div>
          </div>
          <Divider width='100%'/>
        </div>
          
        ))}
      </div>
    );
  }
}

export default TaskPostItem;
