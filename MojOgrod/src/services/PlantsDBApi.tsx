import axios from 'axios';
import { AxiosResponse } from 'axios';
import userId from './userId';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
  code: 'aE6B5CXrIMeU85MzXP3HHWHCZcvvhOegFz6K4qvN79vhAzFu388wAg==',
};

class PlantsDBApi {
  static getPlants = async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axios.get(`/plants`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static getUserPlants = async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axios.get(`/plants/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static addUserPlant = (plantId: string) => {
    axios
      .post(`/plants/${userId}`, { plantId: plantId })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  static deleteUserPlant = async (plantUUID: string) => {
    try {
      await axios.delete(`/plants/${userId}`, { params: { uuid: plantUUID } });
    } catch (error) {
      console.log(error);
    }
  };

  static updateUserPlant = async (
    plantUUID: string,
    newPlant: object,
  ) => {
    try {
      await axios.patch(`/plants/${userId}`, { uuid: plantUUID, plant: newPlant });
    } catch (error) {
      console.log(error);
    }
  };

  static updateUserMicrocontroller = async (
    userId: string,
    newMcId: string,
  ) => {
    try {
      await axios.patch(`/mcId/${userId}`, { mcId: newMcId });
    } catch (error) {
      console.log(error);
    }
  };

  static getUser = (username: string, password: string) => {
    return axios.get(`/user`, { params: { username: username, password: password } });
  };

  static addUser = (username: string, password: string) => {
    axios
      .post(`/user`, { username: username, password: password })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  static deleteUser = () => {
    axios
      .delete(`/user/${userId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getMicrocontroller = (mcId: string) => {
    return axios.get(`/mc/${mcId}`);
  };

  static addPlantToMicrocontroller = (
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

  static deletePlantFromMicrocontroller = (
    mcId: string,
    sensorId: string,
  ) => {
    axios
      .delete(`/mc/${mcId}`, { params: { sensor: sensorId } })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default PlantsDBApi;