import React, { useEffect, useState } from 'react';
import userPlants from '../mocks/userPlants';
import PlantsSVTemplate from './PlantsSVTemplate';

const plants = userPlants();

const PlantTypesScrollView = () => {

    return PlantsSVTemplate({
        plantsList: plants,
        onTouchScreen: '',
    });
}

export default PlantTypesScrollView;
