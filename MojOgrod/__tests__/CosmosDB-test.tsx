import PlantsDB from '../src/services/PlantsDB.js';

test('Initialize CosmosDB', () => {
  const db = new PlantsDB();
  db.initialize();
});

test('Test getPlants', async () => {
  const db = new PlantsDB();
  await db.initialize();
  const plants = await db.getPlants();
  let id = 0;

  plants.forEach(plant => {
    id++;
    expect(plant.id).toBe(id.toString());
  });
});