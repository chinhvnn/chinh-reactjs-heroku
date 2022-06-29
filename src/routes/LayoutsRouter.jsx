import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Products from "../component/products/Products";
import HomePage from "../component/home/HomePage";
import ToDoList from "../component/to_do_list/ToDoListPage";
import ToDoListPage2 from "../component/to_do_list2/ToDoListPage2";
import CreateNewTask from "../component/to_do_list2/CreateNewTask";
import '../sass/scssIndex.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import TaskDetail from "../component/to_do_list2/TaskDetail";

const LayoutsRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="products" element={<Products />}/>
          <Route path="todolist" element={<ToDoList />}/>
          <Route path="todolist2">
            <Route index="true" element={<ToDoListPage2 />}/>
            <Route path="create-new-task" element={ <CreateNewTask/>}/>
            <Route path="taskid=:taskId" element={ <TaskDetail/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default LayoutsRouter;
