import React, { useState, useRef,  useEffect } from "react";
import TaskPostItem from "./TaskPostItem";
import Divider from "../common/Divider";
import Pagination from "../pagination/Pagination";
import Title from "../common/Title";
import FilterTask from "./FilterTask";
import { LIMIT_TASK_PER_PAGE, DEFAULT_DATA_LIST } from "../common/Constants";
import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../../api/ToDoListAPI";

import FormList from "./FormList";
import { createContext } from "react";

export const EventHandleContext = createContext();

function TaskList() {
  const [contentInput, setContentInput] = useState("");
  const [keyUpdate, setKeyUpdate] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState(DEFAULT_DATA_LIST);
  const [typeDataList, setTypeDataList] = useState("Alltask");
  const inputRef = useRef();

  useEffect(() => {
    setData();
    console.log("vao use useEffect");
  }, []);

  // FETCH API JSON_SERVER ///////////////////////////////////////////////////////////
  // METHOD GET & RENDER DATA
  const setData = async () => {
    try {
      const data = await getAllTasks();
      data && setDataList(data);
      setContentInput("");
      console.log("setData");
    } catch (error) {
      console.log(error);
    }
  };
  // HANDLE FUNCTION ///////////////////////////////////////////////////////////
  // GET VALUE INPUT
  const handleOnChange = (event) => {
    setContentInput(event.target.value);
  };

  // ENTER KHI THÊM HOẶC SỬA TASK
  const handleKeyEnter = (e) => {
    if (e.keyCode === 13 && keyUpdate === -1) {
      handleClickAdd();
    }
    if (e.keyCode === 13 && keyUpdate > 0) {
      handleCompletedUpdate();
    }
  };
  // BLUR KHI SỬA TASK
  const handleBlurUpdate = () => {
    keyUpdate !== -1 && handleCompletedUpdate();
  };

  // CLICK ADD TASK
  const handleClickAdd = async () => {
    if (contentInput.trim() === "") {
      alert("YÊU CẦU KHÔNG ĐƯỢC NHẬP GIÁ TRỊ RỖNG");
      inputRef.current.focus();
    } else {
      let newItem = {
        id: new Date().getTime(),
        content: contentInput,
        isCompleted: false,
      };
      try {
        await createNewTask(newItem);
        await setData();
      } catch (error) {
        console.log(error);
      }
    }
    inputRef.current.focus();
  };

  // CLICK UPDATE TASK
  const handleClickUpdate = (key) => {
    const getContentValue = [...dataList].find((val) => val.id === key).content;
    setKeyUpdate(key);
    setContentInput(getContentValue);
    inputRef.current.focus();
  };
  const handleCompletedUpdate = async () => {
    console.log(contentInput);
    let itemUpdate = {
      id: keyUpdate,
      content: contentInput,
      isCompleted: false,
    };
    try {
      await updateTaskById(keyUpdate, itemUpdate);
      await setData();
      await setKeyUpdate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  // TICK COMPLETED
  const handleCheckCompleted = async (key) => {
    try {
      const taskById = await getTaskById(key);
      await updateTaskById(key, { ...taskById, isCompleted: true });
      await setData();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleClickDelete = async (key) => {
    if (window.confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA DÒNG NÀY?")) {
      try {
        await deleteTaskById(key);
        await setData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // HANDLE SEARCH
  const handleSearch = () => {
    if (typeDataList !== "search") {
      setTypeDataList("search");
      setCurrentPage(1);
    } else {
      setTypeDataList("Alltask");
    }
  };

  // HANDLE RADIO CHECKED
  const handleRadio = (e) => {
    setTypeDataList(e.target.value);
    setCurrentPage(1);
  };

  // PAGNINATION
  const handlePagination = (e) => {
    let totalPage = Math.ceil(dataList.length / LIMIT_TASK_PER_PAGE);
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
    setCurrentPage(chooseCurrentPage);
  };

  // localStorage.setItem("dataToDoList", JSON.stringify(this.state.dataList));
  // const { currentPage, typeDataList } = this.state;
  // Tạo mảng lặp sản phẩm mỗi page và có điều kiện filter là data list type
  let filterListItem = [];
  if (typeDataList === "Completed") {
    filterListItem = dataList.filter((val) => val.isCompleted === true);
  }
  if (typeDataList === "Uncompleted") {
    filterListItem = dataList.filter((val) => val.isCompleted === false);
  }
  if (typeDataList === "Alltask") {
    filterListItem = dataList;
  }
  if (typeDataList === "search") {
    filterListItem = dataList.filter((val) => val.content === contentInput);
  }
  let totalPage = Math.ceil(filterListItem.length / LIMIT_TASK_PER_PAGE);
  let startIndex =
    currentPage * LIMIT_TASK_PER_PAGE - (LIMIT_TASK_PER_PAGE - 1);
  let endIndex =
    filterListItem.length - currentPage * LIMIT_TASK_PER_PAGE !== 0
      ? LIMIT_TASK_PER_PAGE * currentPage
      : filterListItem.length;
  let listItemPerPage = filterListItem.slice(startIndex - 1, endIndex);

  console.log("render To do list 1");
  return (
    <EventHandleContext.Provider
      value={{
        handleOnChange,
        handleKeyEnter,
        handleClickDelete,
        handleClickAdd,
        handleClickUpdate,
        handleCompletedUpdate,
        handleCheckCompleted,
        handleSearch,
        handleBlurUpdate,
      }}
    >
      <div className="tasks">
        <Title title="TO DO LIST APPLICATION" />
        <FormList
          contentInput={contentInput}
          inputRef={inputRef}
          keyUpdate={keyUpdate}
          typeDataList={typeDataList}
        />
        {/* BỘ LỌC TASK ITEM */}
        <FilterTask
          handleRadio = {handleRadio}
          typeDataList = {typeDataList}
          dataList = {dataList}
        />
        {dataList.length > 0 ? <Divider /> : ""}

        {/* --- LIST TO DO POST ITEM --- */}
        <TaskPostItem
          dataList={dataList}
          typeDataList={typeDataList}
          listItemPerPage={listItemPerPage}
          currentPage={currentPage}
        />

        {/* PHÂN TRANG PAGINATION */}
        <Pagination
          totalPage={totalPage}
          handlePagination={handlePagination}
          currentPage={currentPage}
          link="/todolist#"
        />
      </div>
    </EventHandleContext.Provider>
  );
}

export default TaskList;
///////////////////////////////////////////////////////////////////////////////////////
//// VIẾT BẰNG CLASS COMPONENT VÀ  FETCH MOCK API TỪ JSON-SERVER
//
// class TaskList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contentInput: "",
//       keyUpdate: -1,
//       currentPage: 1,
//       dataList:
//         // JSON.parse(localStorage.getItem("dataToDoList")) || DEFAULT_DATA_LIST,
//         DEFAULT_DATA_LIST,
//     };

//     this.handleOnChange = this.handleOnChange.bind(this);
//     this.handleClickAdd = this.handleClickAdd.bind(this);
//     this.handleClickDelete = this.handleClickDelete.bind(this);
//     this.handleClickUpdate = this.handleClickUpdate.bind(this);
//     this.handleCompletedUpdate = this.handleCompletedUpdate.bind(this);
//     this.handlePagination = this.handlePagination.bind(this);
//     this.handleCheckCompleted = this.handleCheckCompleted.bind(this);
//     this.handleKeyEnter = this.handleKeyEnter.bind(this);
//     this.handleRadio = this.handleRadio.bind(this);
//     this.handleFetchPost = this.handleFetchPost.bind(this);
//     this.handleFetchDelete = this.handleFetchDelete.bind(this);
//     this.handleFetchUpdate = this.handleFetchUpdate.bind(this);
//     this.inputRef = React.createRef();
//   }

//   // LIFECYCLE
//   componentDidMount() {
//     this.setData();
//   }
//   componentDidUpdate() {
//     console.log("componentDidUpdate");
//   }
//   componentWillUnmount() {
//     console.log("componentWillUnmount");
//   }
//   // FETCH API JSON_SERVER ///////////////////////////////////////////////////////////
//   // METHOD GET & RENDER DATA
//   setData() {
//     fetch("http://localhost:3001/tasks")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         this.setState({ dataList: [...data] });
//       })
//       .catch((error) =>
//         console.log("Looks like there was a problem: \n", error)
//       );
//   }
//   // METHOD POST
//   handleFetchPost(item) {
//     fetch("http://localhost:3001/tasks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         this.setData();
//       })
//       .catch((error) => console.log(error));
//   }
//   // METHOD DELETE
//   handleFetchDelete(key) {
//     fetch(`http://localhost:3001/tasks/${key}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then(() => {
//         this.setData();
//       })
//       .catch((error) => console.log(error));
//   }
//   // METHOD UPDATTE
//   handleFetchUpdate(key, item) {
//     fetch(`http://localhost:3001/tasks/${key}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(item),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         this.setData();
//       })
//       .catch((error) => console.log(error));
//   }

//   // HANDLE FUNCTION ///////////////////////////////////////////////////////////
//   // GET VALUE INPUT
//   handleOnChange(event) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   // ENTER KHI THÊM HOẶC SỬA TASK
//   handleKeyEnter(e) {
//     const key = this.state.keyUpdate;
//     if (e.keyCode === 13 && key === -1) {
//       this.handleClickAdd();
//     }
//     if (e.keyCode === 13 && key > 0) {
//       this.handleCompletedUpdate();
//     }
//   }

//   // CLICK ADD TASK
//   handleClickAdd() {
//     if (this.state.contentInput.trim() === "") {
//       alert("YÊU CẦU KHÔNG ĐƯỢC NHẬP GIÁ TRỊ RỖNG");
//       this.inputRef.current.focus();
//     } else {
//       let keyValue = new Date().getTime();
//       let contentValue = this.state.contentInput;
//       let item = { id: keyValue, content: contentValue, isCompleted: false };
//       // const arr = [...this.state.dataList];
//       // this.setState({
//       //   contentInput: "",
//       //   dataList: [
//       //     item, ...arr,
//       //   ],
//       // });
//       this.handleFetchPost(item);
//     }
//     this.inputRef.current.focus();
//   }

//   // CLICK UPDATE TASK
//   handleClickUpdate(key) {
//     let contentValue = [...this.state.dataList].find(
//       (val) => val.id === key
//     ).content;
//     this.setState({
//       keyUpdate: key,
//       contentInput: contentValue,
//     });
//     this.inputRef.current.focus();
//   }
//   handleCompletedUpdate() {
//     const keyUpdate = this.state.keyUpdate;
//     let item = {
//       id: keyUpdate,
//       content: this.state.contentInput,
//       isCompleted: false,
//     };
//     // const arr = [...this.state.dataList];
//     // arr[arr.findIndex((val) => val.id === keyUpdate)].content = this.state.contentInput;
//     // this.setState({
//     //   contentInput: "",
//     //   keyUpdate: -1,
//     //   dataList: arr,
//     // });
//     this.handleFetchUpdate(keyUpdate, item);
//   }
//   // TICK COMPLETED
//   handleCheckCompleted(key) {
//     const arr = [...this.state.dataList];
//     const itemIndex = arr.findIndex((val) => val.id === key);
//     if (
//       window.confirm(
//         "BẠN CÓ CHẮC CHẮN MUỐN CHỈNH SỬA HOÀN THÀNH TỪ " +
//         arr[itemIndex].isCompleted +
//         " THÀNH " +
//         !arr[itemIndex].isCompleted
//         )
//         ) {
//       // if (arr[itemIndex].isCompleted === true) {
//       //   arr[itemIndex].isCompleted = false;
//       // } else arr[itemIndex].isCompleted = true;
//       // this.setState({
//       //   dataList: arr,
//       // });
//       let item = {
//         id: key,
//         content: arr[itemIndex].content,
//         isCompleted: !arr[itemIndex].isCompleted,
//       };
//       this.handleFetchUpdate(key, item)
//     }
//   }

//   // DELETE
//   handleClickDelete(key) {
//     if (window.confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA DÒNG NÀY?")) {
//       // const arr = [...this.state.dataList];
//       // arr.splice(
//       //   arr.findIndex((val) => val.id === key),
//       //   1
//       // );
//       // this.setState({
//       //   dataList: arr,
//       // });
//       this.handleFetchDelete(key);
//     }
//   }

//   // HANDLE RADIO CHECKEDs
//   handleRadio(e) {
//     const key = e.target.value;
//     switch (key) {
//       case "alltask":
//         this.setState({ typeDataList: "alltask", currentPage: 1 });
//         break;
//       case "completed":
//         this.setState({ typeDataList: "completed", currentPage: 1 });
//         break;
//       case "uncompleted":
//         this.setState({ typeDataList: "uncompleted", currentPage: 1 });
//         break;

//       default:
//         break;
//     }
//   }

//   // PAGNINATION
//   handlePagination(e) {
//     let currentPage = this.state.currentPage;
//     let totalPage = Math.ceil(this.state.dataList.length / LIMIT_TASK_PER_PAGE);
//     let pagKey = e.target.name;
//     switch (pagKey) {
//       case "choose":
//         currentPage = parseInt(e.target.id);
//         break;
//       case "next":
//         if (currentPage < totalPage) currentPage++;
//         break;
//       case "previous":
//         if (currentPage > 1) currentPage--;
//         break;

//       default:
//         break;
//     }
//     this.setState({
//       currentPage: currentPage,
//     });
//   }

//   render() {
//     // localStorage.setItem("dataToDoList", JSON.stringify(this.state.dataList));
//     const { currentPage, typeDataList } = this.state;
//     // Tạo mảng lặp sản phẩm mỗi page và có điều kiện filter là data list type
//     let filterListItem = [];
//     if (typeDataList === "completed") {
//       filterListItem = this.state.dataList.filter(
//         (val) => val.isCompleted === true
//       );
//     }
//     if (typeDataList === "uncompleted") {
//       filterListItem = this.state.dataList.filter(
//         (val) => val.isCompleted === false
//       );
//     }
//     if (typeDataList === "alltask") {
//       filterListItem = this.state.dataList;
//     }
//     let totalPage = Math.ceil(filterListItem.length / LIMIT_TASK_PER_PAGE);
//     let startIndex =
//       currentPage * LIMIT_TASK_PER_PAGE - (LIMIT_TASK_PER_PAGE - 1);
//     let endIndex =
//       filterListItem.length - currentPage * LIMIT_TASK_PER_PAGE !== 0
//         ? LIMIT_TASK_PER_PAGE * currentPage
//         : filterListItem.length;
//     let listItemPerPage = filterListItem.slice(startIndex - 1, endIndex);

//     return (
//       <div className="tasks">
//         <Title title="TO DO LIST APPLICATION" />
//         {/* --- INPUT NHẬP + NÚT THÊM --- */}
//         <Input
//           type="text"
//           name="contentInput"
//           placeholder="Add task name here"
//           handleOnChange={this.handleOnChange}
//           value={this.state.contentInput}
//           handleRef={this.inputRef}
//           handlePressKey={this.handleKeyEnter}
//         />

//         {this.state.keyUpdate >= 0 ? (
//           <Button title={"Apply"} handleClick={this.handleCompletedUpdate} />
//         ) : (
//           <Button
//             title={<i className="fa-solid fa-plus"></i>}
//             classProps="btn-circle"
//             handleClick={this.handleClickAdd}
//           />
//         )}
//         {/* BỘ LỌC TASK ITEM */}
//         <FilterTask
//           handleRadio={this.handleRadio}
//           allTask={this.state.dataList.length}
//           completedTask={
//             [...this.state.dataList].filter((val) => val.isCompleted === true)
//               .length
//           }
//           unCompletedTask={
//             [...this.state.dataList].filter((val) => val.isCompleted === false)
//               .length
//           }
//           typeDataList={this.state.typeDataList}
//         />
//         {this.state.dataList.length > 0 ? <Divider /> : ""}

//         {/* --- LIST TO DO POST ITEM --- */}
//         <TaskPostItem
//           dataList={this.state.dataList}
//           typeDataList={this.state.typeDataList}
//           clickDelete={this.handleClickDelete}
//           clickUpdate={this.handleClickUpdate}
//           clickCheckCompleted={this.handleCheckCompleted}
//           listItemPerPage={listItemPerPage}
//           currentPage={currentPage}
//         />

//         {/* PHÂN TRANG PAGINATION */}
//         <Pagination
//           totalPage={totalPage}
//           handlePagination={this.handlePagination}
//           currentPage={currentPage}
//         />
//       </div>
//     );
//   }
// }

// export default TaskList;
