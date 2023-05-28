import axios from 'axios';
import {AxiosResponse} from 'axios';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
  code: 'aE6B5CXrIMeU85MzXP3HHWHCZcvvhOegFz6K4qvN79vhAzFu388wAg==',
};

class PlantsDBApi {

    static contextType = AuthContext;

    componentDidMount() {
        const userId = this.context.authUser.userId
      }

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

  static addUserPlant = async (plantId: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `/plants/${userId}`,
        {plantId: plantId},
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  static deleteUserPlant = async (plantUUID: string) => {
    try {
      await axios.delete(`/plants/${userId}`, {params: {uuid: plantUUID}});
    } catch (error) {
      console.log(error);
    }
  };

  static updateUserPlant = async (plantUUID: string, newPlant: object) => {
    try {
        await axios.patch(`/plants/${userId}`, {
        uuid: plantUUID,
        plant: newPlant,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getUserMicrocontroller = async (
    userId: string
  ) => {
    try {
        const response: AxiosResponse<any> = await axios.get(''); // TODO
        return response.data;
    } catch (error){
        console.log(error);
        return null;
        }
  };

  static updateUserMicrocontroller = async (
    userId: string,
    newMcId: string,
  ) => {
    try {
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
      await axios.post(`/mc/${mcId}`, {
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
      await axios.delete(`/mc/${mcId}`, {params: {sensor: sensorId}});
    } catch (error) {
      console.log(error);
    }
  };
}

export default PlantsDBApi;
