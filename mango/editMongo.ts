import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";



export async function addCommentToTransaction(client: MongoClient, transactionId: number, comment: string, memberId: number) {
    const transactionCollection = client.db("SEL").collection("transactions")
    const commentCollection = client.db("SEL").collection("comments")
    const newCommentId = faker.string.uuid();

    const transaction = await transactionCollection.findOne({ code_transaction: transactionId });

    if (!transaction) {
        console.log(`Transaction with id ${transactionId} not found`);
        return;
    }

    transaction.comments.push(newCommentId);

    await transactionCollection.updateOne({ code_transaction: transactionId }, { $set: { comments: transaction.comments } });

    console.log(`Comment id ${newCommentId} added to transaction with id ${transactionId}`);

    await commentCollection.insertOne({
        code_comment: newCommentId,
        code_membre: memberId,
        message: comment,
        comments: []
    });

    console.log(`Comment added with id ${newCommentId} with text "${comment}"`);
}

// export async function addCommentToComment(client: MongoClient, commentId: number, comment: string, memberId: number) {
//     const collection = client.db("SEL").collection("transactions");

//     const transaction = await collection.findOne({ code_transaction: transactionId });

//     if (!transaction) {
//         console.log(`Transaction with id ${transactionId} not found`);
//         return;
//     }

//     const comment = transaction.comments.find(comment => comment.code_comment === transactionId);

//     if (!comment) {
//         console.log(`Comment with id ${transactionId} not found`);
//         return;
//     }

//     comment.comments.push({
//         code_comment: faker.string.uuid(),
//         code_membre: memberId,
//         message: comment,
//         comments: []
//     })

//     console.log(`Comment added to comment with id ${commentId}`);

//     await collection.updateOne({ code_transaction: transactionId }, { $set: { comments: transaction.comments } });
// }