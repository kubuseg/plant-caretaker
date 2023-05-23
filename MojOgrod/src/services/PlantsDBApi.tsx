import axios from 'axios';
import {AxiosResponse} from 'axios';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
  code: 'aE6B5CXrIMeU85MzXP3HHWHCZcvvhOegFz6K4qvN79vhAzFu388wAg==',
};

export const getPlants = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`/plants`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserPlants = async (userId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`/plants/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addUserPlant = async (userId: string, plantId: string) => {
  try {
    await axios.post(`/plants/${userId}`, {plantId: plantId});
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPlant = async (userId: string, plantUUID: string) => {
  try {
    await axios.delete(`/plants/${userId}`, {params: {uuid: plantUUID}});
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPlant = async (
  userId: string,
  plantUUID: string,
  newPlant: object,
) => {
  try {
    await axios.patch(`/plants/${userId}`, {uuid: plantUUID, plant: newPlant});
  } catch (error) {
    console.log(error);
  }
};

export const updateUserMicrocontroller = async (
  userId: string,
  newMcId: string,
) => {
  try {
    await axios.patch(`/mcId/${userId}`, {mcId: newMcId});
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`/user`, {
      params: {username: username, password: password},
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addUser = async (username: string, password: string) => {
  try {
    await axios.post(`/user`, {username: username, password: password});
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await axios.delete(`/user/${userId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getMicrocontroller = async (mcId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`/mc/${mcId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addPlantToMicrocontroller = async (
  mcId: string,
  sensorId: string,
  userId: string,
  plantUUID: string,
) => {
  try {
    await axios.post(`/mc/${mcId}`, {
      userId: userId,
      sensorId: sensorId,
      plantUUID: plantUUID,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePlantFromMicrocontroller = async (
  mcId: string,
  sensorId: string,
) => {
  try {
    await axios.delete(`/mc/${mcId}`, {params: {sensor: sensorId}});
  } catch (error) {
    console.log(error);
  }
};
