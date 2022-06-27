import React from "react";
import Header from "../component/fragment/Header";
import Footer from "../component/fragment/Footer";
import LeftSideBar from "../component/to_do_list2/LeftSideBar";
import TaskForm from "../component/to_do_list2/TaskForm";

export default function TaskLayout(props) {
  return (
    <div>
      <Header />
      <div className="task-layout row-flex box-shadow">
        <LeftSideBar />
        <div className="col-flex-md-10">
          <TaskForm>
            {props.children}  
          </TaskForm>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
