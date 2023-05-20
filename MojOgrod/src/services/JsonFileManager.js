import RNFS from 'react-native-fs';

class JsonFileManager {
    static async save(fileName, data) {
        const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;

        try {
            const dataString = JSON.stringify(data);
            await RNFS.writeFile(filePath, dataString, 'utf8');
        } catch (error) {
            console.log('Error with saving file: ', error);
        }
    }

    static async read(fileName) {
        const filePath = RNFS.DocumentDirectoryPath + '/' + fileName;
        let descriptions;

        try {
            const dataString = await RNFS.readFile(filePath, 'utf8');
            descriptions = JSON.parse(dataString);
            return descriptions;
        } catch (error) {
            console.log('Error with reading file: ', error);
        }
        return descriptions;
    }
}

export default JsonFileManager;