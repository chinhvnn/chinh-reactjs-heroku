import React, { Component } from "react";
import TaskPostItem from "./TaskPostItem";
import Button from "../common/Button";
import Input from "../common/Input";
import Divider from "../common/Divider";
import Pagination from "../pagination/Pagination";
import TaskHeader from "../common/Title";
import "../../sass/TaskLayout.scss";
import FilterTask from "./FilterTask";
import {LIMIT_TASK_PER_PAGE, DEFAULT_DATA_LIST} from "../common/Constants";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentInput: "",
      keyUpdate: -1,
      currentPage: 1,
      typeDataList: "alltask",
      dataList: JSON.parse(localStorage.getItem("dataToDoList")) || DEFAULT_DATA_LIST,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
    this.handleCompletedUpdate = this.handleCompletedUpdate.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleCheckCompleted = this.handleCheckCompleted.bind(this);
    this.handleKeyEnter = this.handleKeyEnter.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.inputRef = React.createRef();
  }

  // GET VALUE INPUT
  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  //   CLICK ADD TASK
  handleClickAdd() {
    const arr = [...this.state.dataList];

    if (this.state.contentInput.trim() === "") {
      alert("YÊU CẦU KHÔNG ĐƯỢC NHẬP GIÁ TRỊ RỖNG");
      this.inputRef.current.focus();
    } else {
      let keyValue = new Date().getTime();
      let contentValue = this.state.contentInput;
      this.setState({
        contentInput: "",
        dataList: [
          { key: keyValue, content: contentValue, isCompleted: false },
          ...arr,
        ],
      });
    }
    this.inputRef.current.focus();
    console.log(this.state);
  }

  //ENTER KHI THÊM HOẶC SỬA TASK
  handleKeyEnter(e){
    const key = this.state.keyUpdate;
    if(e.keyCode === 13 && key===-1){
      this.handleClickAdd();
    }
    if(e.keyCode === 13 && key>0){
      this.handleCompletedUpdate();
    }
  }
  // UPDATE TASK
  handleClickUpdate(key) {
    let contentValue = [...this.state.dataList].find(
      (val) => val.key === key
    ).content;
    this.setState({
      keyUpdate: key,
      contentInput: contentValue,
    });
    this.inputRef.current.focus();
  }
  handleCompletedUpdate() {
    const arr = [...this.state.dataList];
    arr[arr.findIndex((val) => val.key === this.state.keyUpdate)].content =
      this.state.contentInput;

    this.setState({
      contentInput: "",
      keyUpdate: -1,
      dataList: arr,
    });
  }

  // DELETE
  handleClickDelete(key) {
    if (window.confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA DÒNG NÀY?")) {
      const arr = [...this.state.dataList];
      arr.splice(
        arr.findIndex((val) => val.key === key),
        1
      );
      this.setState({
        dataList: arr,
      });
    }
  }

  // TICK COMPLETED
  handleCheckCompleted(key) {
    const arr = [...this.state.dataList];
    const itemIndex = arr.findIndex((val) => val.key === key);
    if (
      window.confirm(
        "BẠN CÓ CHẮC CHẮN MUỐN CHỈNH SỬA HOÀN THÀNH TỪ " +
          arr[itemIndex].isCompleted +
          " THÀNH " +
          !arr[itemIndex].isCompleted
      )
    ) {
      if (arr[itemIndex].isCompleted === true) {
        arr[itemIndex].isCompleted = false;
      } else arr[itemIndex].isCompleted = true;

      this.setState({
        dataList: arr,
      });
    }
  }

  // HANDLE RADIO CHECKEDs
  handleRadio(e){
    const key = e.target.value;
    switch (key) {
      case "alltask":
          this.setState({typeDataList : "alltask", currentPage: 1});
        break;
      case "completed":
          this.setState({typeDataList : "completed", currentPage: 1});
        break;
      case "uncompleted":
          this.setState({typeDataList : "uncompleted" , currentPage: 1});
        break;
    
      default:
        break;
    }
  }

  // PAGNINATION
  handlePagination(e) {
    let currentPage = this.state.currentPage;
    let totalPage = Math.ceil(this.state.dataList.length / LIMIT_TASK_PER_PAGE);
    let pagKey = e.target.name;
    switch (pagKey) {
      case "choose":
        currentPage = parseInt(e.target.id);
        break;
      case "next":
        if (currentPage < totalPage) currentPage++;
        break;
      case "previous":
        if (currentPage > 1) currentPage--;
        break;

      default:
        break;
    }
    this.setState({
      currentPage: currentPage,
    });
  }

  render() {
    localStorage.setItem("dataToDoList", JSON.stringify(this.state.dataList));
    const {currentPage, typeDataList}  = this.state;
    // Tạo mảng lặp sản phẩm mỗi page và có điều kiện filter là data list type
    let filterListItem = [];
    if (typeDataList === "completed"){
      filterListItem = this.state.dataList.filter(val => val.isCompleted===true);
    }
    if (typeDataList === "uncompleted"){
      filterListItem = this.state.dataList.filter(val => val.isCompleted===false);
    }
    if (typeDataList === "alltask"){
      filterListItem = this.state.dataList;
    }
    let totalPage = Math.ceil(filterListItem.length / LIMIT_TASK_PER_PAGE);
    let startIndex = currentPage * LIMIT_TASK_PER_PAGE - (LIMIT_TASK_PER_PAGE - 1);
    let endIndex =
    filterListItem.length - currentPage * LIMIT_TASK_PER_PAGE !== 0
      ? LIMIT_TASK_PER_PAGE * currentPage
        : filterListItem.length;
    let listItemPerPage = filterListItem.slice(startIndex - 1, endIndex);

    return (
      <div className="task-layout">
        <TaskHeader />
        {/* --- INPUT NHẬP + NÚT THÊM --- */}
        <Input
          type="text"
          name="contentInput"
          placeholder="Add task name here"
          handleOnChange={this.handleOnChange}
          value={this.state.contentInput}
          handleRef={this.inputRef}
          handlePressKey={this.handleKeyEnter}
        />

        {this.state.keyUpdate >= 0 ? (
          <Button title={"Apply"} handleClick={this.handleCompletedUpdate} />
        ) : (
          <Button
            title={<i className="fa-solid fa-plus"></i>}
            classProps="btn-circle"
            handleClick={this.handleClickAdd}
          />
        )}
          {/* BỘ LỌC TASK ITEM */}
          <FilterTask 
            handleRadio={this.handleRadio}
            allTask={this.state.dataList.length}
            completedTask={[...this.state.dataList].filter(val =>val.isCompleted===true).length}
            unCompletedTask={[...this.state.dataList].filter(val =>val.isCompleted===false).length}
            typeDataList={this.state.typeDataList}
            />
          {this.state.dataList.length > 0 ? <Divider /> : ""}

          {/* --- LIST TO DO POST ITEM --- */}
          <TaskPostItem
            dataList={this.state.dataList}
            typeDataList={this.state.typeDataList}
            clickDelete={this.handleClickDelete}
            clickUpdate={this.handleClickUpdate}
            clickCheckCompleted={this.handleCheckCompleted}
            listItemPerPage={listItemPerPage}
            currentPage={currentPage}
          />

        {/* PHÂN TRANG PAGINATION */}
        <Pagination
          totalPage={totalPage}
          handlePagination={this.handlePagination}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default TaskList;
