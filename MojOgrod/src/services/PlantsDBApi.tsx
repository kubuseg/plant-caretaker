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

export const addUserPlant = (userId: string, plantId: string) => {
  axios
    .post(`/plants/${userId}`, {plantId: plantId})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
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

export const getUser = (username: string, password: string) => {
  return axios.get(`/user`, {params: {username: username, password: password}});
};

export const addUser = (username: string, password: string) => {
  axios
    .post(`/user`, {username: username, password: password})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteUser = (userId: string) => {
  axios
    .delete(`/user/${userId}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const getMicrocontroller = (mcId: string) => {
  return axios.get(`/mc/${mcId}`);
};

export const addPlantToMicrocontroller = (
  mcId: string,
  sensorId: string,
  userId: string,
  plantUUID: string,
) => {
  axios
    .post(`/mc/${mcId}`, {
      userId: userId,
      sensorId: sensorId,
      plantUUID: plantUUID,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deletePlantFromMicrocontroller = (
  mcId: string,
  sensorId: string,
) => {
  axios
    .delete(`/mc/${mcId}`, {params: {sensor: sensorId}})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
