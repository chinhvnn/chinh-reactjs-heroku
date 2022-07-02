import axiosClient from "../utils/axiosClient";

export const getAllTasksAPI = async () => {
  const { data } = await axiosClient.get('tasks2', {
    // params: {
    //   _sort: 'id',
    //   _order: 'desc'
    // }
  })
  return data
}

export const getTaskByIdAPI = async id => {
  const { data } = await axiosClient.get(`tasks2/${id}`)
  return data
}

export const createNewTaskAPI = async (body) => {
  await axiosClient.post('tasks2', {
    ...body
  })
}

export const deleteTaskByIdAPI = async id => {
  await axiosClient.delete(`tasks2/${id}`)
}

export const updateTaskByIdAPI = async (id, body) => {
  await axiosClient.put(`tasks2/${id}`, {
    ...body
  })
}