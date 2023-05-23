import { getPlants, getUserPlants } from './PlantsDBApi';
import JsonFileManager from './JsonFileManager';
import { deleteUserPlant } from './PlantsDBApi';
import userId from './userId';

class DataManager {
    static updatePlantTypes = async () => {
        try {
            const plantTypes = await getPlants();
            JsonFileManager.save('typesDescriptions', plantTypes);
        } catch (error) {
            console.log("Error with updating plants descriptions", error);
            // toDo - implement alert
        }
    };

    static updateUserPlants = async () => {
        try {
            const userPlants = await getUserPlants(userId);
            JsonFileManager.save('userPlants', userPlants);
        } catch (error) {
            console.log("Error with updating user plants", error);
            // toDo - implement alert
        }
    };

    static deletePlant = async (plantUuid) => {
        try {
            await deleteUserPlant(userId, plantUuid);
            await this.updateUserPlants("1")
        } catch (error) {
            console.log("Error with handling deletion of user plant", error);
            // toDo - implement alert
        }
    };
}

export default DataManager;