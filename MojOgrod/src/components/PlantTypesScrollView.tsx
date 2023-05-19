import React, { useEffect, useState } from 'react';
import getDescriptions from '../data/plantTypeDescriptions';
import PlantsSVTemplate from './PlantsSVTemplate';

const PlantTypesScrollView = () => {
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
        onTouchScreen: 'PlantTypeDetails',
    });
}

export default PlantTypesScrollView;
