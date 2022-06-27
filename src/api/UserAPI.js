import axiosClient from "../untils/axiosClient";

export const getUserById = async id => {
  const { data } = await axiosClient.get(`users/${id}`)
  return data
}
