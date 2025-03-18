import * as Mongo from '../mango/MongoHandler';
import * as DataGenerator from '../dataGenerator';
import competences from '../db/competences.json';

async function main() {
    try {
        await Mongo.connect();

        DataGenerator.generateAll();
        await Mongo.add.addAllMembers(Mongo.client, DataGenerator.members);
        await Mongo.add.addAllTransactions(Mongo.client, DataGenerator.transactions);
        await Mongo.add.addAllServices(Mongo.client, DataGenerator.services);
        await Mongo.add.addAllCompetences(Mongo.client, competences);
    } finally {
        Mongo.close();
    }
}

main();