import { Collection, InsertManyResult, MongoClient } from 'mongodb';

export async function addAllMembers(client: MongoClient, members) {
    const memberCollection: Collection<Document> = client.db("SEL").collection("membres");

    // First we delete all the documents in the collection
    await memberCollection.deleteMany({});

    // Then we insert the new documents
    const result: InsertManyResult = await memberCollection.insertMany(members);

    console.log(`${result.insertedCount} members were inserted`);
}

export async function addAllTransactions(client: MongoClient, transactions) {
    const transactionCollection: Collection<Document> = client.db("SEL").collection("transactions");

    await transactionCollection.deleteMany({});

    const result: InsertManyResult = await transactionCollection.insertMany(transactions);

    console.log(`${result.insertedCount} transactions were inserted.`);
}

export async function addAllServices(client: MongoClient, services) {
    const serviceCollection: Collection<Document> = client.db("SEL").collection("services");

    await serviceCollection.deleteMany({});

    const result: InsertManyResult = await serviceCollection.insertMany(services);

    console.log(`${result.insertedCount} services were inserted.`);
}

export async function addAllCompetences(client: MongoClient, competences) {
    const competenceCollection: Collection<Document> = client.db("SEL").collection("competences");

    await competenceCollection.deleteMany({});

    const result: InsertManyResult = await competenceCollection.insertMany(competences);

    console.log(`${result.insertedCount} competences were inserted.`);
}

