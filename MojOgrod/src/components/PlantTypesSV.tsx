import React, { useEffect, useState } from 'react';
import getDescriptions from '../data/plantTypeDescriptions';
import PlantsSVTemplate from './PlantsSVTemplate';

type PlantTypesSVParams = {
    onTouchScreen: string;
}

function PlantTypesSV({ onTouchScreen }: PlantTypesSVParams): JSX.Element {
    const [plantTypes, setPlantTypes] = useState<any[]>([]);

    const readPlants = async () => {
        const result = await getDescriptions();
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
