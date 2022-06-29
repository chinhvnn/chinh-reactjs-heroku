import React from "react";

function FilterTask({ handleRadio, typeDataList, dataList }) {
  const checkList = ["Alltask", "Completed", "Uncompleted"];
  const completedCount = dataList.filter(
    (val) => val.isCompleted === true
  ).length;
  const unCompletedCount = dataList.filter(
    (val) => val.isCompleted === false
  ).length;
  const allTaskCount = dataList.length;
  return (
    <div className="tasks__filter" onChange={handleRadio}>
      <span>FILTER: </span>
      {checkList.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            checked={typeDataList === item}
            value={item}
            id={item}
            onChange={(item) => handleRadio(item)} //Truyen item ma no ra DOM
          />
          <label htmlFor={item}>
            {item}(
            {(item === "Completed" && completedCount) ||
              (item === "Uncompleted" && unCompletedCount) ||
              (item === "Alltask" && allTaskCount)
              
              }
            )
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterTask;
