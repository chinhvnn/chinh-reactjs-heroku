import React, { useState, useEffect } from "react";
import TaskLayout from "../../layouts/TaskLayout";
import Button from "../common/Button";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { TASK_TYPE } from "../../constants/taskType";
import TaskDetailSkeleton from "../skeleton/TaskDetailSkeleton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";

//------ YUP VALIDATION
function formatDate(date) {
  return moment(date).format('DD MMMM YYYY, h:mm:ss a')
}
const SignupSchema = yup.object().shape({
title: yup.string().required("required"),
creator: yup.string().required("required"),
createAt: yup.date(),
});



function CreateNewTask() {
  //---- init var
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const isAddTaskSuccess = useSelector((state) => state.isAddTaskSuccess);
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  //---- lifecycle
  useEffect(() => {
    dispatch({ type: TASK_TYPE.GET_ALL_TASK });
  }, []);
  useEffect(() => {
    if (isAddTaskSuccess) {
      navigate("/todolist2", { replace: true });
    }
  }, [isAddTaskSuccess]);

  //---- xu ly them task
  const handleAddTask = (data) => {
    const inputForm = {
      id: uuidv4(),
      status: "New",
      ...data,
    };
    // dispath redux saga
    dispatch({ type: TASK_TYPE.ADD_NEW_TASK, payload: inputForm });
  };

  //----- clear form
  const handleClear = () => {
    reset();
  };

  // //---- Xu ly form input
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputValue({
  //     ...inputValue,
  //     [name]: value,
  //   });
  // };

  console.log("render create new task");

  return (
    <TaskLayout>
      {isLoading ? (
        <TaskDetailSkeleton />
      ) : (
        <div className="row-flex j-content-center">
          <div className="create-new-task">
            <h3>CREATE NEW TASK</h3>
            <form>
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
                    defaultValue={moment().format('DD MMMM YYYY, h:mm:ss a')}
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
                  {<span>&nbsp;{errors.createAt && errors.createAt.message}</span>}
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

              <div className="row-flex j-content-end">
                <div className="col-flex-md-8">
                  <Button
                    title="Apply and create"
                    handleClick={handleSubmit(handleAddTask)}
                  />
                  <Button
                    title="Clear"
                    handleClick={handleSubmit(handleClear)}
                  />
                  <Button
                    title="Cancel"
                    handleClick={() => {
                      navigate("/todolist2", { replace: "true" });
                    }}
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

export default CreateNewTask;
