import * as Mongo from '../mango/MongoHandler';

async function main() {
    try {
        await Mongo.connect();

        // Start a timer to check how long it takes to add a comment
        const startTime = Date.now();

        await Mongo.edit.addComment(Mongo.client, 1, "This is my newish comment", 1);

        const endTime = Date.now();
        console.log(`Comment added successfully in ${endTime - startTime} milliseconds`);
    } finally {
        Mongo.close();
    }
}

main().catch(console.error);