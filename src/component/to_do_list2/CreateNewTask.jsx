import React, { useState } from "react";
import TaskLayout from "../../layouts/TaskLayout";
import Button from "../common/Button";
import { useNavigate } from "react-router";
import { createNewTask } from "../../api/ToDoList2API ";

function CreateNewTask() {
  //init var
  const navigate = useNavigate();
  const initInputTask = {
    title: "",
    creator: "",
    createAt: "",
    description: "",
    status: "New",
  };
  const [inputValue, setInputValue] = useState(initInputTask);

  //Xu ly form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // xu ly them task
  const handleAddTask = async () => {
    const inputForm = {
      id: new Date().getTime(),
      title: inputValue.title,
      creator: inputValue.creator,
      createAt: new Date().toTimeString(),
      description: inputValue.description,
      status: inputValue.status,
    };

    try {
      await createNewTask(inputForm);
      navigate("/todolist2", { replace: true });
    } catch (error) {
      console.log(error);
    }
    // dispath redux
    // const dispatch = useDispatch();
    // dispatch(actAddTask(input));
  };

  return (
    <TaskLayout>
      <div className="row-flex j-content-center">
        <div className="create-new-task">
          <h3>CREATE NEW TASK</h3>

          <div className="row-flex ">
            <div className="col-flex-md-4 pt-3 pl-1">
              <label htmlFor="">Title</label>
            </div>
            <div className="col-flex-md-8">
              <input
                type="text"
                className="input-default"
                name="title"
                value={inputValue.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row-flex ">
            <div className="col-flex-md-4 pt-3 pl-1">
              <label htmlFor="">Creator</label>
            </div>
            <div className="col-flex-md-8">
              <input
                type="text"
                className="input-default"
                name="creator"
                value={inputValue.creator}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row-flex ">
            <div className="col-flex-md-4 pt-3 pl-1">
              <label htmlFor="">Create at</label>
            </div>
            <div className="col-flex-md-8">
              <input
                type="text"
                className="input-default"
                name="createAt"
                defaultValue={new Date().toTimeString()}
                disabled
              />
            </div>
          </div>

          <div className="row-flex ">
            <div className="col-flex-md-4 pt-3 pl-1">
              <label htmlFor="">Description</label>
            </div>
            <div className="col-flex-md-8">
              <textarea
                cols="40"
                rows="5"
                style={{ width: "100%", margin: "0.25rem" }}
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row-flex j-content-end">
            <div className="col-flex-md-8">
              <Button title="Apply and create" handleClick={handleAddTask} />
              <Button title="Clear" />
            </div>
          </div>
        </div>
      </div>
    </TaskLayout>
  );
}

export default CreateNewTask;
