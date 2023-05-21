import { getPlantsDescriptions, getUserPlants } from './PlantsDBApi';
import JsonFileManager from './JsonFileManager';

class DataManager {
    static updateDescriptions = async () => {
        try {
            const descriptions = await getPlantsDescriptions();
            JsonFileManager.save('typesDescriptions', descriptions);
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