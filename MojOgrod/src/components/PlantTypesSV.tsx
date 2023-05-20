import React, { useEffect, useState } from 'react';
import PlantsSVTemplate from './PlantsSVTemplate';
import JsonFileManager from '../data/JsonFileManager';

type PlantTypesSVParams = {
    onTouchScreen: string;
}

function PlantTypesSV({ onTouchScreen }: PlantTypesSVParams): JSX.Element {
    const [plantTypes, setPlantTypes] = useState<any[]>([]);

    const readPlants = async () => {
        const result = await JsonFileManager.read('typesDescriptions');
        setPlantTypes(result);
    }

    useEffect(() => {
        readPlants();
    }, []);

    return PlantsSVTemplate({
        plantsList: plantTypes,
        onTouchScreen: onTouchScreen,
    });
}

export default PlantTypesSV;
