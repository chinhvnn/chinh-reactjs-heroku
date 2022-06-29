import React, { useEffect } from "react";
import { TASK_TYPE } from "../../constants/taskType";
import TaskItem from "./TaskItem";
import TaskLayout from "../../layouts/TaskLayout";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { actGetCurrentPage } from "../../redux/actions/tdl2Action";
import Pagination from "../pagination/Pagination";
import TaskItemSkeleton from "../skeleton/TaskItemSkeleton";

const ToDoListPage2 = () => {
  //init var
  const LIMIT_TASK_PER_PAGE = 4;
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const data = useSelector((state) => state.tasksData);
  const currentPage = useSelector((state) => state.currentPage);
  const keySearch = useSelector((state) => state.keySearch);
  const loading = useSelector((state) => state.loading);
  console.log("loading:", loading);
  let filterData = (
    filter === "All" ? data : data.filter((item) => item.status === filter)
  ).reverse();

  //lifecycle
  useEffect(() => {
    dispatch({ type: TASK_TYPE.GET_ALL_TASK });
  }, []);

  //xu ly paginate
  let totalPage, listItemPerPage;
  if (filterData) {
    let startIndex =
      currentPage * LIMIT_TASK_PER_PAGE - (LIMIT_TASK_PER_PAGE - 1);
    let endIndex =
      filterData.length - currentPage * LIMIT_TASK_PER_PAGE !== 0
        ? LIMIT_TASK_PER_PAGE * currentPage
        : filterData.length;
    //mang lap trong 1 trang (voi dieu kien tim kiem)
    let filterData2 =
      keySearch === ""
        ? filterData
        : filterData.filter(
            (e) =>
              e.title === keySearch || e.title.split(" ").includes(keySearch)
          );
    totalPage = Math.ceil(filterData2.length / LIMIT_TASK_PER_PAGE);
    listItemPerPage = filterData2.slice(startIndex - 1, endIndex);
  }
  //ham xu ly va dispatch currentpage
  const handlePagination = (e) => {
    let pagKey = e.target.name;
    let chooseCurrentPage = currentPage;
    switch (pagKey) {
      case "choose":
        chooseCurrentPage = parseInt(e.target.id);
        break;
      case "next":
        if (chooseCurrentPage < totalPage) chooseCurrentPage++;
        break;
      case "previous":
        if (chooseCurrentPage > 1) chooseCurrentPage--;
        break;

      default:
        break;
    }
    dispatch(actGetCurrentPage(chooseCurrentPage));
  };

  return (
    <TaskLayout>
      <div className="row-flex">
        {loading === true ? 
          <TaskItemSkeleton/>
         : (
          listItemPerPage &&
          listItemPerPage.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              creator={task.creator}
              status={task.status}
              description={task.description}
            />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        handlePagination={handlePagination}
        link="/todolist2#"
      />
    </TaskLayout>
  );
};

export default ToDoListPage2;
