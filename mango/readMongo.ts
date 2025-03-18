import { Collection, MongoClient } from "mongodb";


export function readAllMembers(Client: MongoClient) {
    const memberCollection: Collection<Document> = Client.db("SEL").collection("membres");
    return memberCollection.find({}).toArray();
}

export function readMember(Client: MongoClient, id: number) {
    const memberCollection: Collection<Document> = Client.db("SEL").collection("membres");
    return memberCollection.findOne({ code_membre: id });
}

export function readAllTransactions(Client: MongoClient) {
    const transactionCollection: Collection<Document> = Client.db("SEL").collection("transactions");
    return transactionCollection.find({}).toArray();
}

export function readTransaction(Client: MongoClient, id: number) {
    const transactionCollection: Collection<Document> = Client.db("SEL").collection("transactions");
    return transactionCollection.findOne({ code_transaction: id });
}

export function readAllServices(Client: MongoClient) {
    const serviceCollection: Collection<Document> = Client.db("SEL").collection("services");
    return serviceCollection.find({}).toArray();
}

export function readService(Client: MongoClient, id: number) {
    const serviceCollection: Collection<Document> = Client.db("SEL").collection("services");
    return serviceCollection.findOne({ code_service: id });

}

export function readAllCompetences(Client: MongoClient) {
    const competenceCollection: Collection<Document> = Client.db("SEL").collection("competences");
    return competenceCollection.find({}).toArray();

}

export function readCompetence(Client: MongoClient, id: number) {
    const competenceCollection: Collection<Document> = Client.db("SEL").collection("competences");
    return competenceCollection.findOne({ code_competence: id });
}

export async function readCommentOfTransaction(Client: MongoClient, id: number) {
    const transactionCollection: Collection<Transaction> = Client.db("SEL").collection("transactions");
    const transaction: Transaction | null = await transactionCollection.findOne({ code_transaction: id });

    if (!transaction) {
        console.log(`Transaction with id ${id} not found`);
        return;
    }

    const commentCollection: Collection<Document> = Client.db("SEL").collection("comments");

    return commentCollection.find({ code_comment: { $in: transaction.comments } }).toArray();
}