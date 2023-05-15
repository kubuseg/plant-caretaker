import axios from 'axios';

axios.defaults.baseURL = 'https://plants-function-app.azurewebsites.net/api';
axios.defaults.params = {
    code: 'FQJeOsdGEgd9AQJdkVNiV6osFHxV0oBgV5XqiWL_stT_AzFuUwy7eQ=='
}

export const addPlant = (userId: string, plantId: string) => {
    axios.post(`/plants/${userId}`, {params: {"plantId": plantId}})
    .then( (response) => {
        console.log(response);
    })
    .catch( (error) => {
        console.log(error);
    });
}

export const deletePlant = (userId: string, plantUUID: string) => {
    axios.delete(`/plants/${userId}`, {params: {"uuid": plantUUID}})
    .then( (response) => {
        console.log(response);
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
