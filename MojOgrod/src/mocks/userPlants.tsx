type PlantType = {
    id: number;
    name: string;
    icon: any;
};

function userPlants(): PlantType[] {
    const userPlants: PlantType[] = [
        {
            id: 1,
            name: 'Kaktus1',
            icon: require('../../assets/icon.png'),
        },
        {
            id: 2,
            name: 'Kaktus2',
            icon: require('../../assets/icon.png'),
        },
        {
            id: 3,
            name: 'Kaktus3',
            icon: require('../../assets/icon.png'),
        },
        {
            id: 4,
            name: 'Kaktus4',
            icon: require('../../assets/icon.png'),
        },
        {
            id: 5,
            name: 'Kaktus5',
            icon: require('../../assets/icon.png'),
        },
    ];

    return userPlants;
}

export default userPlants;