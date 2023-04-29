const { CosmosClient } = require("@azure/cosmos");

class PlantsDB {
  constructor() {
    const endpoint = 'https://plants-db.documents.azure.com:443/';
    const key = 'x7RlJmLiCD1BMQbCVNpc1Sqhc5LBOlU3q0BQr4DMwwT7GbMPksT0jcrvR4Ywfu55fXT3eZHWh0YxACDbJ01lhw==';
    this.client = new CosmosClient({ endpoint, key });
    this.database = null;
    this.plantsContainer = null;
  }

  async initialize() {
    const { database } = await this.client.databases.createIfNotExists({ id: "plantsDB" });
    const { container } = await database.containers.createIfNotExists({ id: "Plants" });
    this.database = database;
    this.plantsContainer = container;
  }
}

module.exports = PlantsDB;
