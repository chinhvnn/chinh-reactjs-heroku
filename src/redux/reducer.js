//init state
const initState = {
  filter: "All",
  keySearch: "",
  currentPage: 1,
  tasksData: [],
};

//action
export const actGetAllTask = (data) => {
  console.log("vao action get all", data);
  return {
    type: "todolist2/getAllTask",
    payload: data,
  };
};
export const actChangeFilter = (str) => {
  return {
    type: "todolist2/changeFilter",
    payload: str,
  };
};
export const actChangePage = (num) => {
  return {
    type: "todolist2/changePage",
    payload: num,
  };
};
export const actGetKeySearch = (str) => {
  return {
    type: "todolist2/getKeySearch",
    payload: str,
  };
};

// export const actAddTask = (data) => {
//   console.log("vao action add task", data);
//   return {
//     type: "todolist2/addTask",
//     payload: data
//   }
// };

//reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "todolist2/getAllTask":
      return {
        ...state,
        tasksData: action.payload,
      };
    case "todolist2/changeFilter":
      return {
        ...state,
        filter: action.payload,
      };
    case "todolist2/changePage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "todolist2/getKeySearch":
      return {
        ...state,
        keySearch: action.payload,
      };
    // case "todolist2/addTask":
    //   return {
    //     ...state,
    //     tasksData: [...state.tasksData, action.payload],
    //   };

    default:
      break;
  }
  return state;
};

export default rootReducer;
