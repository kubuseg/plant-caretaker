import axios from 'axios';
import {AxiosResponse} from 'axios';
import JsonFileManager from '../services/JsonFileManager';
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
      const userId = await JsonFileManager.read('userId');
      if (userId) {
        const response: AxiosResponse<any> = await axios.get(
          `/plants/${userId}`,
        );
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static addUserPlant = async (plant: object) => {
    try {
      const userId = await JsonFileManager.read('userId');
      const response: AxiosResponse<any> = await axios.post(
        `/plants/${userId}`,
        {plant: plant},
      );
    } catch (error) {
      console.log(error);
    }
  };

  static deleteUserPlant = async (plantUUID: string) => {
    try {
      const userId = await JsonFileManager.read('userId');
      await axios.delete(`/plants/${userId}`, {params: {uuid: plantUUID}});
    } catch (error) {
      console.log(error);
    }
  };

  static updateUserPlant = async (plantUUID: string, newPlant: object) => {
    try {
      const userId = await JsonFileManager.read('userId');
      await axios.patch(`/plants/${userId}`, {
        uuid: plantUUID,
        plant: newPlant,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateUserMicrocontroller = async (
    userId: string,
    newMcId: string,
  ) => {
    try {
      const userId = await JsonFileManager.read('userId');
      await axios.patch(`/mcId/${userId}`, {mcId: newMcId});
    } catch (error) {
      console.log(error);
    }
  };

  static getUser = async (username: string, password: string): Promise<any> => {
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

  static addUser = (username: string, password: string) => {
    axios
      .post(`/user`, {username: username, password: password})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  static deleteUser = async () => {
    try {
      await axios.delete(`/user/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  static getMicrocontroller = async (mcId: string) => {
    try {
      const response: AxiosResponse<any> = await axios.get(`/mc/${mcId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static addPlantToMicrocontroller = async (
    mcId: string,
    sensorId: string,
    userId: string,
    plantUUID: string,
  ) => {
    try {
      await axios.post(`/mcPlant/${mcId}`, {
        userId: userId,
        sensorId: sensorId,
        plantUUID: plantUUID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static deletePlantFromMicrocontroller = async (
    mcId: string,
    sensorId: string,
  ) => {
    try {
      await axios.delete(`/mcPlant/${mcId}`, {params: {sensor: sensorId}});
    } catch (error) {
      console.log(error);
    }
  };

  static updatePlantOnMicrocontroller = async (
    mcId: string,
    sensorId: string,
    userId: string,
    plantUUID: string,
  ) => {
    try {
      await axios.patch(`/mcPlant/${mcId}`, {
        userId: userId,
        sensorId: sensorId,
        plantUUID: plantUUID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateMicrocontroller = async (mc: any) => {
    try {
      await axios.patch(`/mc/${mc.id}`, {
        mc: mc,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default PlantsDBApi;
