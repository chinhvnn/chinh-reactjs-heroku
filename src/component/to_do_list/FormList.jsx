import React, { useContext } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { EventHandleContext } from "./TaskList";

function FormList(props) {
  const {
    handleOnChange,
    handleKeyEnter,
    handleClickAdd,
    handleCompletedUpdate,
    handleSearch,
    handleBlurUpdate,
  } = useContext(EventHandleContext);
  return (
    <div className="row-flex">
      <div className="col-flex-sm-8">
        <Input
          type="text"
          name="contentInput"
          placeholder="Add task name here"
          handleOnChange={handleOnChange}
          value={props.contentInput}
          handleRef={props.inputRef}
          handlePressKey={handleKeyEnter}
          handleOnBlur={handleBlurUpdate}
        />
      </div>
      <div className="col-flex-sm-4">
        {props.keyUpdate === -1 && props.typeDataList !== "search" && (
          <>
            <Button title={"Add"} handleClick={handleClickAdd} />
            <Button title={"Search"} handleClick={handleSearch} />
          </>
        )}
        {props.keyUpdate !== -1 && props.typeDataList !== "search" && (
          <Button title={"Apply"} handleClick={handleCompletedUpdate} />
        )}
        {props.typeDataList === "search" && (
          <Button title={"Cancle search"} handleClick={handleSearch} />
        )}
      </div>
    </div>
  );
}

export default FormList;
