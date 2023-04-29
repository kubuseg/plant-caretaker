const { CosmosClient } = require("@azure/cosmos");

const endpoint = 'https://plants-db.documents.azure.com:443/';
const key = 'x7RlJmLiCD1BMQbCVNpc1Sqhc5LBOlU3q0BQr4DMwwT7GbMPksT0jcrvR4Ywfu55fXT3eZHWh0YxACDbJ01lhw==';

class CosmosDB {
  constructor() {
    this.client = new CosmosClient({ endpoint, key });
    this.database = this.client.database('plants-db');
    this.plantsContainer = this.database.container('Plants');
  }
 }

 export default CosmosDB;