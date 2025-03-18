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

export async function addCommentToComment(client: MongoClient, commentId: number, comment: string, memberId: number) {
    const commentCollection = client.db("SEL").collection("comments");

    const originalComment = await commentCollection.findOne({ code_comment: commentId });

    if (!originalComment) {
        console.log(`Comment with id ${commentId} not found`);
        return;
    }

    const newCommentId = faker.string.uuid();

    originalComment.comments.push(newCommentId);

    await commentCollection.updateOne({ code_comment: commentId }, { $set: { comments: originalComment.comments } });

    console.log(`Comment id ${newCommentId} added to comment with id ${commentId}`);

    await commentCollection.insertOne({
        code_comment: newCommentId,
        code_membre: memberId,
        message: comment,
        comments: []
    });

    console.log(`Comment added with id ${newCommentId} with text "${comment}"`);
}

