import PlantsDB from '../src/services/PlantsDB.js';

test('Initialize CosmosDB', () => {
  const db = new PlantsDB();
  db.initialize();
});

test('Test getPlantsDescription', async () => {
  const db = new PlantsDB();
  await db.initialize();
  const plants = await db.getPlantsDescription();
  let id = 0;

  plants.forEach(plant => {
    id++;
    expect(plant.id).toBe(id.toString());
  });
});

test('Test getMeasurements', async () => {
  const db = new PlantsDB();
  await db.initialize();
  const measurements = await db.getMeasurements();
  let id = 0;
  const dateRegex = /^([0-2]\d|3[01])\.(0\d|1[012])\.\d{4},\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  measurements.forEach(measurement => {
    id++;
    const date = measurement.dateTime
    console.log(date)
    const isDateValid = dateRegex.test(date)
    expect(isDateValid).toBe(true);
  });
});