import React from "react";

function FilterTask({
  handleRadio,
  typeDataList,
}) {
  const checkList = ["Alltask", "Completed", "Uncompleted"];
  return (
    <div className="tasks__filter" onChange={handleRadio}>
      <span>FILTER: </span>
      {checkList.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            checked={typeDataList ===  item }
            value={item}
            id={item}
            onChange={(item) => handleRadio(item)}//Truyen item ma no ra DOM
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  );
}

export default FilterTask;
