import * as Mongo from '../mango/MongoHandler';


function readMembers()
{
    return Mongo.read.readAllMembers(Mongo.client);
}

function readMember(id: number)
{
    return Mongo.read.readMember(Mongo.client, id);
}


async function main()
{

    try {
        await Mongo.connect();
        console.log(await readMember(100));
    } finally {
        Mongo.close();
    }
}

main();