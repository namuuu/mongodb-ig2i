import { faker } from '@faker-js/faker';
import fs from 'fs';
import competences from './db/competences.json';

export const members: Array<Member> = [];
export let services: Array<Service>;
export let transactions: Array<Transaction>;

// Pre-written values
const tagsValues = ['#cooking', '#cool', '#yay']

function generateMember(id: number) {
    const nom = faker.person.lastName();
    const prenom = faker.person.firstName();

    const member: Member = {
        code_membre: id,
        nom: nom,
        prenom: prenom,
        mail: `${prenom.toLowerCase}.${nom.toLocaleLowerCase}@gmail.com`,
        compteTemps: faker.number.int({ min: 0, max: 1000 }),
        talents: generateTalent(1),
        cotisations: generateCotisation(faker.number.int({ min: 1, max: 3}))
    }

    return member;  
}

function generateTalent(quantity: number) {
    const talents: Array<Talent> = [];

    for (let i = 0; i < quantity; i++) {
        const talent: Talent = {
            code_talent: i+1,
            code_competence: faker.number.int({ min: 1, max: competences.length }),
            niveau_experience: faker.number.int({ min: 1, max: 10 })
        }

        talents.push(talent);
    }

    return talents; 
}

function generateServices(quantity: number) {
    const services: Array<Service> = [];
    const randomMemberId = faker.number.int({ min: 1, max: members.length });

    for (let i = 0; i < quantity; i++) {
        services.push({
            code_service: i+1,
            code_membre: randomMemberId,
            description: faker.lorem.sentence(),
            valorisation: faker.number.int({ min: 50, max: 500 }),
            // type_valorisation: faker.helpers.arrayElement(["Type 1", "Type 2"]),
            date_debut: faker.date.past().toISOString().split('T')[0],
            date_fin: faker.date.future().toISOString().split('T')[0],
            code_talent: faker.number.int({ min: 1, max: members[randomMemberId].talents.length }),
            tags: generateTags(1)
        });
    }

    return services;
}

function generateTags(quantity: number) {
    const tags: Array<string> = [];

    for (let i = 0; i < quantity; i++) {
        tags.push(faker.helpers.arrayElement(tagsValues));
    }

    return tags;
}

function generateTransactions(quantity: number) {
    const transactions: Array<Transaction> = [];

    for (let i = 0; i < quantity; i++) {
        transactions.push({
            code_transaction: i+1,
            valorisation_theorique: faker.number.int({ min: 50, max: 300 }),
            valorisation_effective: faker.number.int({ min: 40, max: 300 }),
            date_previsionnelle: faker.date.future().toISOString().split('T')[0],
            date_effective: faker.date.future().toISOString().split('T')[0],
            etat: faker.helpers.arrayElement(["completed", "pending", "cancelled"]),
            services: [services[faker.number.int({ min: 1, max: services.length })]], // NOTE: This only pushes one service, we may need to fix this
            comments: generateComments(faker.number.int({ min: 0, max: 3 }))
        })
    }

    return transactions;
}

function generateComments(quantity: number, depth: number = 0) {
    const comments: Array<Comments> = [];
    depth++;

    for (let i = 0; i < quantity; i++) {
        const randomMemberId = faker.number.int({ min: 1, max: members.length });

        comments.push({
            code_comment: faker.string.uuid(),
            code_membre: randomMemberId,
            message: faker.lorem.sentence(),
            comments: depth > 10 ? [] : generateComments(faker.number.int({ min: 0, max: 2 }), depth),
        });
    }

    return comments;
}

function generateCotisation(quantity: number): Cotisation[] {
    const cotisations: Cotisation[] = [];

    const currentYear = new Date().getFullYear();

    for(let i = 0; i < quantity; i++) {
        cotisations.push({
            date_encaissement: faker.date.between({ from: `01-01-${currentYear}`, to: `12-25-${currentYear}` }).toISOString().split('T')[0],
            annee: currentYear-i
        });
    }

    return cotisations;
}

export function generateAll()
{
    for (let i = 1; i <= 100; i++) {
        members.push(generateMember(i));
    }

    fs.writeFileSync('db/members.json', JSON.stringify(members));
    // console.debug(JSON.stringify(members[1], null, 2));

    services = generateServices(20);
    fs.writeFileSync('db/services.json', JSON.stringify(services));
    // console.debug(JSON.stringify(services[1], null, 2));

    transactions = generateTransactions(5);
    fs.writeFileSync('db/transactions.json', JSON.stringify(transactions));
    // console.debug(JSON.stringify(transactions[1], null, 2));

    return members;
}