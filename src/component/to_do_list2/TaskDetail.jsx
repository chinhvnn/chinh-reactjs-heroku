import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import TaskLayout from "../../layouts/TaskLayout";
import Button from "../common/Button";
import {
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../../api/ToDoList2API ";
import { useDispatch, useSelector } from "react-redux";
import { TASK_TYPE } from "../../constants/taskType";
import TaskDetailSkeleton from "../skeleton/TaskDetailSkeleton";

function TaskDetail() {
  //init var
  const initInputTask = {
    id: "",
    title: "",
    creator: "",
    createAt: "",
    description: "",
    status: "",
  };
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(initInputTask);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  //lifecycle
  useEffect(() => {
    handleGetTaskById(taskId);
    dispatch({ type: TASK_TYPE.GET_ALL_TASK });
  }, []);

  // xu ly get task data by id
  const handleGetTaskById = async (id) => {
    try {
      const data = await getTaskById(id);
      setInputValue({
        id: { ...data }.id,
        title: { ...data }.title,
        creator: { ...data }.creator,
        createAt: { ...data }.createAt,
        description: { ...data }.description,
        status: { ...data }.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //xu ly UPDATE
  const handleUpdate = async () => {
    let itemUpdate = {
      id: { ...inputValue }.id,
      title: { ...inputValue }.title,
      creator: { ...inputValue }.creator,
      createAt: { ...inputValue }.createAt,
      description: { ...inputValue }.description,
      status: { ...inputValue }.status,
    };
    try {
      await updateTaskById({ ...inputValue }.id, itemUpdate);
      navigate("/todolist2", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  //xu ly DELETE
  const handleDelete = async () => {
    try {
      await deleteTaskById({ ...inputValue }.id);
      navigate("/todolist2", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  //xu ly CLEAR form
  const handleReset = () => {
    handleGetTaskById(taskId);
  };

  //Xu ly onchange form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <TaskLayout>
      {isLoading?<TaskDetailSkeleton/>:(<div className="row-flex j-content-center">
        <div className="create-new-task">
          <h3>TASK DETAIL</h3>

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
                value={inputValue.createAt}
                onChange={handleChange}
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
                value={inputValue.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row-flex ">
            <div className="col-flex-md-4 pt-3 pl-1">
              <label>Status</label>
            </div>
            <div className="row-flex col-flex-md-8 pt-3">
              <div className="mr-3">
                <input
                  type="radio"
                  name="status"
                  id="New"
                  value="New"
                  checked={inputValue.status === "New" && true}
                  onChange={handleChange}
                />
                <label htmlFor="New">New</label>
              </div>
              <div className="mr-3">
                <input
                  type="radio"
                  name="status"
                  id="Doing"
                  value="Doing"
                  checked={inputValue.status === "Doing" && true}
                  onChange={handleChange}
                />
                <label htmlFor="Doing">Doing</label>
              </div>
              <div className="mr-3">
                <input
                  type="radio"
                  name="status"
                  id="Done"
                  value="Done"
                  checked={inputValue.status === "Done" && true}
                  onChange={handleChange}
                />
                <label htmlFor="Done">Done</label>
              </div>
            </div>
          </div>

          <div className="row-flex j-content-end mt-4">
            <div className="col-flex-md-8">
              <Button title="Apply and Save" handleClick={handleUpdate} />
              <Button title="Delete this task" handleClick={handleDelete} />
              <Button title="Reset" handleClick={handleReset}/>
            </div>
          </div>
        </div>
      </div>)}
    </TaskLayout>
  );
}

export default TaskDetail;
