import axios from 'axios';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
    code: 'hshWx3wyNS3KAVX2CG-m9HQHAYR8QupoBMcvhUTj86zbAzFuT1bcdQ=='
}

export const addPlant = (userId: string, plantId: string) => {
    axios.post(`/plants/${userId}`, {params: {"plantId": plantId}})
    .then( (response) => {
        console.log(response);
        console.log(response.data);
    })
    .catch( (error) => {
        console.log(error);
    });
}

export const deletePlant = (userId: string, plantId: string) => {
    axios.delete(`/plants/${userId}`, {params: {"plantId": plantId}})
    .then( (response) => {
        console.log(response);
        console.log(response.data);
    })
    .catch( (error) => {
        console.log(error);
    });
}

export const getPlantsBySensors = (userId: string): object => {
    let result = {};
    axios.get(`/plantsBySensors/${userId}`)
    .then( (response) => {
        result = response.data;
    })
    .catch( (error) => {
        console.log(error);
    })
    return result;
}

export const addPlantsBySensors = (userId: string, plantBySensor: object) => {
    axios.post(`/plantsBySensors/${userId}`, {params: {"plantBySensor": plantBySensor}})
    .then( (response) => {
        console.log(response);
        console.log(response.data);
    })
    .catch( (error) => {
        console.log(error);
    });
}

export const deletePlantsBySensors = (userId: string, sensorId: string) => {
    axios.delete(`/plantsBySensors/${userId}`, {params: {"sensorId": sensorId}})
    .then( (response) => {
        console.log(response);
        console.log(response.data);
    })
    .catch( (error) => {
        console.log(error);
    });
}
