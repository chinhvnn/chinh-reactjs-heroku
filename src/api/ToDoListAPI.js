import axiosClient from "../untils/axiosClient";

export const getAllTasks = async () => {
  const { data } = await axiosClient.get('tasks', {
    params: {
      _sort: 'id',
      _order: 'desc'
    }
  })
  return data
}

export const getTaskById = async id => {
  const { data } = await axiosClient.get(`tasks/${id}`)
  return data
}

export const createNewTask = async (body) => {
  await axiosClient.post('tasks', {
    ...body
  })
}

export const deleteTaskById = async id => {
  await axiosClient.delete(`tasks/${id}`)
}

export const updateTaskById = async (id, body) => {
  await axiosClient.put(`tasks/${id}`, {
    ...body
  })
}