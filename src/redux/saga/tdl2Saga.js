import { TASK_TYPE } from "../../constants/taskType";
import { put, takeEvery, takeLeading } from "redux-saga/effects";
import { getAllTasksAPI, getTaskByIdAPI, createNewTaskAPI, updateTaskByIdAPI, deleteTaskByIdAPI } from "../../api/ToDoList2API ";
import { actAddTaskSuccess, actGetAllTaskSuccess, actUpdateTaskSuccess, actGetLoading, actGetTaskByIdSuccess } from "../actions/tdl2Action";

//-------- GET ALL TASK
function* getAllTask() {
  yield put(actGetLoading(true));
  const data = yield getAllTasksAPI();
  console.log("getdata", data);
  yield put(actGetAllTaskSuccess(data));
  yield put(actGetLoading(false));
}

function* watchGetAllTask() {
  yield takeLeading(TASK_TYPE.GET_ALL_TASK, getAllTask);
}

//-------- GET 1 TASK BY ID
function* getTaskById(data) {
  yield put(actGetLoading(true));
  const dataTask = yield getTaskByIdAPI(data.payload);
  yield put(actGetTaskByIdSuccess(dataTask));
  yield put(actGetLoading(false));
}

function* watchGetTaskById() {
  yield takeLeading(TASK_TYPE.GET_TASK_BY_ID, getTaskById);
}

//-------- ADD NEW TASK
function* createNewTask(data) {
  yield put(actAddTaskSuccess(false));
  yield put(actGetLoading(true));
  yield createNewTaskAPI(data.payload);
  yield put(actGetLoading(false));
  yield put(actAddTaskSuccess(true));

}
function* watchAddNewTask() {
  yield takeLeading(TASK_TYPE.ADD_NEW_TASK, createNewTask);
}

//-------- UPDATE TASK
function* updateTask(data) {
  yield put(actUpdateTaskSuccess(false));
  yield put(actGetLoading(true));
  yield updateTaskByIdAPI(data.payload.taskId, data.payload.itemUpdate);
  yield put(actGetLoading(false));
  yield put(actUpdateTaskSuccess(true));

}
function* watchUpdateTask() {
  yield takeLeading(TASK_TYPE.UPDATE_TASK, updateTask);
}

//-------- DELETE TASK
function* deleteTask(data) {
  yield put(actUpdateTaskSuccess(false));
  yield put(actGetLoading(true));
  yield deleteTaskByIdAPI(data.payload);
  yield put(actGetLoading(false));
  yield put(actUpdateTaskSuccess(true));

}
function* watchDeleteTask() {
  yield takeLeading(TASK_TYPE.DELETE_TASK, deleteTask);
}

//--------export
const tdl2SagaArr = [watchGetAllTask(), watchAddNewTask(), watchUpdateTask(), watchDeleteTask(),watchGetTaskById()];
export default tdl2SagaArr;
