const { CosmosClient } = require("@azure/cosmos");

class PlantsDB {
  constructor() {
    const endpoint = 'https://plants-db.documents.azure.com:443/';
    const key = 'x7RlJmLiCD1BMQbCVNpc1Sqhc5LBOlU3q0BQr4DMwwT7GbMPksT0jcrvR4Ywfu55fXT3eZHWh0YxACDbJ01lhw==';
    this.client = new CosmosClient({ endpoint, key });
    this.database = this.client.database("plantsDB");;
  }

  async getPlantsDescription() {
    const { resources: plants } = await this.database.container("Plants")
      .items.query('SELECT * FROM c')
      .fetchAll();
    return plants;
  }

  async getMeasurements() {
    const { resources: measurements } = await this.database.container("Measurements")
      .items.query('SELECT * FROM c')
      .fetchAll();
    return measurements;
  }
}

module.exports = PlantsDB;
