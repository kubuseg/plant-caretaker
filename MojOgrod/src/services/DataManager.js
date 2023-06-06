import JsonFileManager from './JsonFileManager';
import PlantsDBApi from './PlantsDBApi';

class DataManager {

    static updatePlantTypes = async () => {
        try {
            const plantTypes = await PlantsDBApi.getPlants();
            await JsonFileManager.save('typesDescriptions', plantTypes);
        } catch (error) {
            console.log("Error with updating plants descriptions", error);
            // toDo - implement alert
        }
    };

    static updateUserPlants = async () => {
        try {
            const userPlants = await PlantsDBApi.getUserPlants();
            await JsonFileManager.save('userPlants', userPlants);
        } catch (error) {
            console.log("Error with updating user plants", error);
            // toDo - implement alert
        }
    };

    static updateController = async (mcId) => {
        try {
            const result = await PlantsDBApi.getMicrocontroller(mcId)
            await JsonFileManager.save('Controller', result);
        } catch (error) {
            console.log("Error with updating user controller", error);
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

    static savePlantInfo = async (newPlantInfo) => {
        try {
            if (!newPlantInfo.uuid) {
                await PlantsDBApi.addUserPlant(newPlantInfo);
            } else {
                await PlantsDBApi.updateUserPlant(newPlantInfo.uuid, newPlantInfo);
            }

            await this.updateUserPlants()
        } catch {
            console.log("Error with saving plant settings", error)
        }
    };
}

export default DataManager;