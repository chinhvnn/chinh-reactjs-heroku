import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import TaskLayout from "../../layouts/TaskLayout";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { TASK_TYPE } from "../../constants/taskType";
import TaskDetailSkeleton from "../skeleton/TaskDetailSkeleton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

//------ YUP VALIDATION
const SignupSchema = yup.object().shape({
title: yup.string().required("required"),
creator: yup.string().required("required"),
});


function TaskDetail() {
  //----- init var
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const isUpdateTaskSuccess = useSelector((state) => state.isUpdateTaskSuccess);
  const taskById = useSelector((state) => state.taskById);
  const tasksData = useSelector((state) => state.tasksData);
  const indexTask = tasksData.findIndex((item) => String(item.id) === taskId);
  const nextId =
    tasksData.length > 0 &&
    indexTask < tasksData.length - 1 &&
    tasksData[indexTask+1].id;
  const previousId = indexTask > 0 && tasksData[indexTask-1].id;
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  //----- lifecycle
  useEffect(() => {
    handleGetTaskById(taskId);
    dispatch({ type: TASK_TYPE.GET_ALL_TASK });
  }, []);

  useEffect(() => {
    isUpdateTaskSuccess && navigate("/todolist2", { replace: "true" });
  }, [isUpdateTaskSuccess]);

  useEffect(() => {
    reset(taskById);
  }, [taskById]);

  //-----  xu ly get all task data by id
  const handleGetTaskById = (id) => {
    dispatch({ type: TASK_TYPE.GET_TASK_BY_ID, payload: id });
  };
  //----- xu ly SUBMIT FORM UPDATE
  const handleUpdate = (dataForm) => {
    let itemUpdate = {
      id: taskId,
      ...dataForm,
    };
    dispatch({ type: TASK_TYPE.UPDATE_TASK, payload: { taskId, itemUpdate } });
  };

  //----- xu ly DELETE
  const handleDelete = () => {
    dispatch({ type: TASK_TYPE.DELETE_TASK, payload: taskId });
  };

  //----- xu ly CLEAR form
  const handleReset = () => {
    handleGetTaskById(taskId);
  };

  return (
    <TaskLayout>
      {isLoading ? (
        <TaskDetailSkeleton />
      ) : (
        <div className="row-flex j-content-center">
          <div className="create-new-task">
            <h3>TASK DETAIL</h3>
            <div className="row-flex j-content-end">
              <button
                className="mr-3"
                onClick={() => {
                  navigate("/todolist2", { replace: "true" });
                }}
              >
                Go Back Home
              </button>
              <button
                className="mr-3"
                disabled={previousId === false && true}
                onClick={() => {
                  navigate(`/todolist2/${previousId}`, { replace: "true" });
                  handleGetTaskById(previousId);
                }}
              >
                Previous
              </button>
              <button
                className="mr-3"
                disabled={nextId === false && true}
                onClick={() => {
                  navigate(`/todolist2/${nextId}`, { replace: "true" });
                  handleGetTaskById(nextId);
                }}
              >
                Next
              </button>
            </div>
            <form>
              <div className="row-flex ">
                <div className="col-flex-md-4 pl-1 mb-3 mt-3">
                  <label htmlFor="">Id</label>
                </div>
                <div className="col-flex-md-8 mb-3 mt-3 pl-2"> {taskId}</div>
              </div>
              <div className="row-flex ">
                <div className="col-flex-md-4 pt-3 pl-1">
                  <label htmlFor="">Title</label>
                </div>
                <div className="col-flex-md-8">
                  <Controller
                    defaultValue={""}
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <input
                        type="text"
                        className="input-default"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                  {<span>&nbsp;{errors.title && errors.title.message}</span>}
                </div>
              </div>

              <div className="row-flex ">
                <div className="col-flex-md-4 pt-3 pl-1">
                  <label htmlFor="">Creator</label>
                </div>
                <div className="col-flex-md-8">
                  <Controller
                    defaultValue={""}
                    control={control}
                    name="creator"
                    render={({ field }) => (
                      <input
                        type="text"
                        className="input-default"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                  {<span>&nbsp;{errors.creator && errors.creator.message}</span>}
                </div>
              </div>

              <div className="row-flex ">
                <div className="col-flex-md-4 pt-3 pl-1">
                  <label htmlFor="">Create at</label>
                </div>
                <div className="col-flex-md-8">
                  <Controller
                    defaultValue={""}
                    control={control}
                    name="createAt"
                    render={({ field }) => (
                      <input
                        type="text"
                        className="input-default"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="row-flex ">
                <div className="col-flex-md-4 pt-3 pl-1">
                  <label htmlFor="">Description</label>
                </div>
                <div className="col-flex-md-8">
                  <Controller
                    defaultValue={""}
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <textarea
                        cols="40"
                        rows="5"
                        style={{ width: "100%", margin: "0.25rem" }}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="row-flex ">
                <div className="col-flex-md-4 pt-3 pl-1">
                  <label>Status</label>
                </div>
                <div className="row-flex col-flex-md-8 pt-3">
                  <div className="mr-3">
                    <Controller
                      defaultValue={""}
                      control={control}
                      name="status"
                      render={({ field }) => {
                        return (
                          <input
                            type="radio"
                            checked={field.value === "New"}
                            onChange={(e) => field.onChange(e)}
                            value="New"
                            id="New"
                          />
                        );
                      }}
                    />
                    <label htmlFor="New">New</label>
                  </div>
                  <div className="mr-3">
                    <Controller
                      defaultValue={""}
                      control={control}
                      name="status"
                      render={({ field }) => {
                        return (
                          <input
                            type="radio"
                            checked={field.value === "Doing"}
                            onChange={(e) => field.onChange(e)}
                            value="Doing"
                            id="Doing"
                          />
                        );
                      }}
                    />
                    <label htmlFor="Doing">Doing</label>
                  </div>
                  <div className="mr-3">
                    <Controller
                      defaultValue={""}
                      control={control}
                      name="status"
                      render={({ field }) => {
                        return (
                          <input
                            type="radio"
                            checked={field.value === "Done"}
                            onChange={(e) => field.onChange(e)}
                            value="Done"
                            id="Done"
                          />
                        );
                      }}
                    />
                    <label htmlFor="Done">Done</label>
                  </div>
                </div>
              </div>

              <div className="row-flex j-content-end mt-4">
                <div className="col-flex-md-8">
                  <Button
                    title="Apply and Save"
                    handleClick={handleSubmit(handleUpdate)}
                  />
                  <Button
                    title="Delete this task"
                    handleClick={handleSubmit(handleDelete)}
                  />
                  <Button
                    title="Reset"
                    handleClick={handleSubmit(handleReset)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </TaskLayout>
  );
}

export default TaskDetail;
