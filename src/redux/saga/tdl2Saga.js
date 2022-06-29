import { TASK_TYPE } from "../../constants/taskType";
import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { getAllTasks } from "../../api/ToDoList2API ";
import { actGetAllTask, actGetLoading } from "../actions/tdl2Action";

function* getAllTask() {
yield put (actGetLoading(true));
//   const data = yield axiosClient.get("tasks2");
const data = yield getAllTasks();
  console.log("vao func getAllTask saga");
  //cái này nên dispatch thẳng cho reducer hay qua actions được define trước
  yield put(
    // {
    // type: TASK_TYPE.SUCCESS_GET_ALL_TASK,
    // payload: data.data,
    // }
    actGetAllTask(data)
  );
  yield put (actGetLoading(false));
}

function* watchGetAllTask() {
  console.log("vao func watchGetAllTask saga");
  yield takeEvery(TASK_TYPE.GET_ALL_TASK, getAllTask);
}

export default [watchGetAllTask()];

