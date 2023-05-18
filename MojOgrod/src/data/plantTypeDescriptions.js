import { getPlantsDescriptions } from "../services/PlantsDBApi";

let plantTypeDescriptions;

async function getDescriptions() {
    if (!plantTypeDescriptions) {
        plantTypeDescriptions = await getPlantsDescriptions();
    }
    return plantTypeDescriptions;
}

export default getDescriptions;