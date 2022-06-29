import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { actGetKeySearch } from "../../redux/actions/tdl2Action";

function TaskForm() {
  // init var
  const dispatch = useDispatch();
  const keyAPI = useSelector(state => state.keySearch)
  const [keySearch, setKeySearch] = useState("");

  // xu ly onchange input de lay value
  const handleChange = (e) => {
    setKeySearch(e.target.value);
  };

  // dispatch tim kiem len store global
  const handleSearch = (act) => {
    console.log(act);
    if (act === "clear"){
      setKeySearch("");
      dispatch(actGetKeySearch(""));
    } else {
      dispatch(actGetKeySearch(keySearch));
    }
  };

  return (
    <div className="task-form">
      <div className="col-flex-md-4">
        <Link to="/todolist2/create-new-task">
          <Button title="Create New Task" />
        </Link>
      </div>
      <div className="row-flex col-flex-md-8 a-items-center j-content-end">
          <input
            type="text"
            className="input-default"
            style={{width: "50%"}}
            placeholder={"Nhập nội dung tìm kiếm..."}
            value={keySearch}
            onChange={handleChange}
          />
          <Button title="Search" handleClick={handleSearch}></Button>
          {keyAPI!==""&&<Button title="Xóa tìm kiếm" handleClick={() => handleSearch("clear")}></Button>}
      </div>
    </div>
  );
}

export default TaskForm;
