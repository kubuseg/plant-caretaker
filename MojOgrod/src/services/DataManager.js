import { getPlants, getUserPlants } from './PlantsDBApi';
import JsonFileManager from './JsonFileManager';
import PlantsDBApi from './PlantsDBApi';
import userId from './userId';

class DataManager {
    static updatePlantTypes = async () => {
        try {
            const plantTypes = await PlantsDBApi.getPlants();
            JsonFileManager.save('typesDescriptions', plantTypes);
        } catch (error) {
            console.log("Error with updating plants descriptions", error);
            // toDo - implement alert
        }
    };

    static updateUserPlants = async () => {
        try {
            const userPlants = await PlantsDBApi.getUserPlants();
            JsonFileManager.save('userPlants', userPlants);
        } catch (error) {
            console.log("Error with updating user plants", error);
            // toDo - implement alert
        }
    };

    static deletePlant = async (plantUuid) => {
        try {
            await PlantsDBApi.deleteUserPlant(plantUuid);
            await this.updateUserPlants()
        } catch (error) {
            console.log("Error with handling deletion of user plant", error);
            // toDo - implement alert
        }
    };

    static updatePlant = async (plantUuid, newPlant) => {
        try {
            await PlantsDBApi.updateUserPlant(plantUuid, newPlant);
            await this.updateUserPlants()
        } catch (error) {
            console.log("Error with handling update of user plant", error);
            // toDo - implement alert
        }
    };
}

export default DataManager;