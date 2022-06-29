import axiosClient from "../utils/axiosClient";

export const getAllTasks = async () => {
  const { data } = await axiosClient.get('tasks2', {
    params: {
      _sort: 'id',
      _order: 'desc'
    }
  })
  return data
}

export const getTaskById = async id => {
  const { data } = await axiosClient.get(`tasks2/${id}`)
  return data
}

export const createNewTask = async (body) => {
  await axiosClient.post('tasks2', {
    ...body
  })
}

export const deleteTaskById = async id => {
  await axiosClient.delete(`tasks2/${id}`)
}

export const updateTaskById = async (id, body) => {
  await axiosClient.put(`tasks2/${id}`, {
    ...body
  })
}