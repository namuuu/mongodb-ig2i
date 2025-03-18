import { faker } from "@faker-js/faker";
import { MongoClient, PushOperator } from "mongodb";



export async function addComment(client: MongoClient, transactionId: number, comment: string, memberId: number) {
    const collection = client.db("SEL").collection("transactions")

    const transaction = await collection.findOne({ code_transaction: transactionId });

    if (!transaction) {
        console.log(`Transaction with id ${transactionId} not found`);
        return;
    }

    transaction.comments.push({
        code_comment: faker.string.uuid(),
        code_membre: memberId,
        message: comment,
        comments: []
    })

    console.log(`Comment added to transaction with id ${transactionId}`);

    await collection.updateOne({ code_transaction: transactionId }, { $set: { comments: transaction.comments } });
}