import { getPlants, getUserPlants } from './PlantsDBApi';
import JsonFileManager from './JsonFileManager';

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

    static updateUserPlants = async (userId) => {
        try {
            const userPlants = await getUserPlants(userId);
            JsonFileManager.save('userPlants', userPlants);
        } catch (error) {
            console.log("Error with updating user plants", error);
            // toDo - implement alert
        }
    };
}

export default DataManager;