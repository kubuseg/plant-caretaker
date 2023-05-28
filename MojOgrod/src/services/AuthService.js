import JsonFileManager from './JsonFileManager';
import PlantsDBApi from './PlantsDBApi';

class AuthService {

    static logIn = async (username, password) => {
        try {
            const result = await PlantsDBApi.getUser(username, password);
            JsonFileManager.save('userId.json', result.id);
            return result
        } catch (error) {
            console.log("Error logging in", error);
            return null
        }
    };

    static logOut = async () => {
        try {
            await JsonFileManager.save('userId.json', "");
        } catch (error) {
            console.log("Error logging out", error);
        }
    };

}

export default AuthService;