import React, { Component } from "react";
import Input from "../common/Input";

class FilterTask extends Component {
  render() {
    const {handleRadio, allTask, completedTask, unCompletedTask, typeDataList}  = this.props;
    return (
        <div className="task-filter" onChange={handleRadio}>
          <span>FILTER: </span>
          <div>
            <Input type="radio" name="checkCompleted" value="alltask" id="alltask" checked={typeDataList==="alltask"&&true}/>
            <label htmlFor="alltask">All task ({allTask})</label>
          </div>
          <div>
            <Input type="radio" name="checkCompleted" value="completed" id="completed" checked={typeDataList==="completed"&&true}/>
            <label htmlFor="completed">Completed ({completedTask})</label>
          </div>
          <div>
            <Input type="radio" name="checkCompleted" value="uncompleted" id="uncompleted" checked={typeDataList==="uncompleted"&&true}/>
            <label htmlFor="uncompleted">UnComplete ({unCompletedTask})</label>
          </div>
        </div>
    );
  }
}

export default FilterTask;
