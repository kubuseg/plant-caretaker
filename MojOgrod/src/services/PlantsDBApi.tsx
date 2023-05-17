import axios from 'axios';
import { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
    code: 'FQJeOsdGEgd9AQJdkVNiV6osFHxV0oBgV5XqiWL_stT_AzFuUwy7eQ=='
}

export const getPlantsDescriptions = async (): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`/plantsDescriptions`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUserPlants = (userId: string) => {
    return axios.get(`/plants/${userId}`);
}

export const addUserPlants = (userId: string, plantId: string) => {
    axios.post(`/plants/${userId}`, { "plantId": plantId })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deleteUserPlants = (userId: string, plantUUID: string) => {
    axios.delete(`/plants/${userId}`, { params: { "uuid": plantUUID } })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getUser = (userId: string) => {
    return axios.get(`/user/${userId}`);
}

export const addUser = (username: string, password: string) => {
    axios.post(`/user`, { username: username, password: password})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deleteUser = (userId: string) => {
    axios.delete(`/user/${userId}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const getMicrocontroller = (mcId: string) => {
    return axios.get(`/mc/${mcId}`);
}

export const addPlantToMicrocontroller = (mcId: string, sensorId: string, plantId: string) => {
    axios.post(`/mc/${mcId}`, {plantId: plantId, sensor: sensorId})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const deletePlantFromMicrocontroller = (mcId: string, sensorId: string) => {
    axios.delete(`/mc/${mcId}`, { params: { sensor: sensorId } })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}
