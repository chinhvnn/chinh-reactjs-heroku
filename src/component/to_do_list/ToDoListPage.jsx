import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import TaskList from "./TaskList";
import TextBox from "./TextBox";

const ToDoList = () => {
  return (
    <HomeLayout>
      <div>
        <TaskList />
        <TextBox />
      </div>
    </HomeLayout>
  );
};

export default ToDoList;
