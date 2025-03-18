const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Fonction pour générer des données aléatoires
function generateRandomData() {
    const villes = [];
    const membres = [];
    const services = [];
    const tags = [];
    const tarifs = [];
    const commentaires = [];

    const villeNames = ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nantes", "Lille", "Strasbourg", "Nice", "Rennes"];
    const streetNames = ["rue de la paix", "rue de la liberté", "rue de la fraternité", "rue de l'égalité", "rue de la justice", "rue de la solidarité"];

    // Génération des villes
    villeNames.forEach((name) => {
        villes.push({
            rue: faker.helpers.arrayElement(streetNames),
            nom: name,
            code_postal: faker.location.zipCode('#####')
        });
    });

    // Génération des tags
    tags.push(
        { code_tag: 1, libelle: "Tag 1" },
        { code_tag: 2, libelle: "Tag 2" }
    );

    // Génération des tarifs
    tarifs.push({
        code_tarif: 1,
        montant: faker.number.int({ min: 50, max: 200 }),
        annee: 2021
    });

    // Génération des services
    services.push({
        code_service: 1,
        description: faker.lorem.sentence(),
        valorisation: faker.number.int({ min: 50, max: 500 }),
        type_valorisation: faker.helpers.arrayElement(["Type 1", "Type 2"]),
        date_debut: faker.date.past(1).toISOString().split('T')[0],
        date_fin: faker.date.future(1).toISOString().split('T')[0],
        code_talent: faker.number.int({ min: 1, max: 10 }),
        tags: tags
    });

    // Génération des membres
    for (let i = 1; i <= 100; i++) {
        const adherents = [{
            code_tarif: faker.number.int({ min: 1, max: 5 }),
            date_adhesion: faker.date.past(2).toISOString().split('T')[0]
        }];

        const talents = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
            code_talent: faker.number.int({ min: 1, max: 50 }),
            code_competence: faker.number.int({ min: 1, max: 20 }),
            niveau_experience: faker.number.int({ min: 1, max: 10 })
        }));

        const transactions = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
            code_transaction: faker.string.uuid(),
            valorisation_theorique: faker.number.int({ min: 50, max: 300 }),
            valorisation_effective: faker.number.int({ min: 40, max: 300 }),
            date_previsionnelle: faker.date.future(1).toISOString().split('T')[0],
            date_effective: faker.date.future(1).toISOString().split('T')[0],
            etat: faker.helpers.arrayElement(["completed", "pending", "cancelled"]),
            code_service: faker.number.int({ min: 1, max: 20 })
        }));

        const commentairesMembre = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
            id: faker.string.uuid(),
            nom: faker.person.lastName(),
            prenom: faker.person.firstName(),
            commentaire: faker.lorem.sentence(),
            commentaireConcerne: null,
            code_transaction: faker.string.uuid()
        }));

        membres.push({
            code_membre: i,
            nom: faker.person.lastName(),
            prenom: faker.person.firstName(),
            date_de_naissance: faker.date.past(30).toISOString().split('T')[0],
            mail: faker.internet.email(),
            compte_temps: faker.number.int({ min: 0, max: 1000 }),
            attentes: faker.lorem.sentence(),
            gouts: faker.lorem.sentence(),
            ville_id: faker.number.int({ min: 1, max: villes.length }),
            status: faker.datatype.boolean(),
            adherents,
            talents,
            transactions,
            commentaires: commentairesMembre
        });
    }

    return { villes, membres, services, tarifs, tags, commentaires };
}

// Classe simulant une base NoSQL
class NoSQLDatabase {
    constructor() {
        this.data = {};
    }

    // Méthode pour ajouter plusieurs documents dans une collection
    addMany(collectionName, documents) {
        if (!this.data[collectionName]) {
            this.data[collectionName] = [];
        }
        this.data[collectionName].push(...documents);
        console.log(`${documents.length} documents ajoutés à la collection "${collectionName}"`);
    }

    // Sauvegarde des données dans un fichier
    saveToFile(filePath) {
        fs.writeFileSync(filePath, JSON.stringify(this.data, null, 2), 'utf-8');
        console.log(`Base de données sauvegardée dans le fichier : ${filePath}`);
    }
}

// Création d'une nouvelle instance de la base de données simulée
const db = new NoSQLDatabase();

// Génération des données
const data = generateRandomData();

// Ajout des données dans la base de données simulée
db.addMany('villes', data.villes);
db.addMany('membres', data.membres);
db.addMany('services', data.services);
db.addMany('tarifs', data.tarifs);
db.addMany('tags', data.tags);
db.addMany('commentaires', data.commentaires);

// Sauvegarde dans un fichier JSON
db.saveToFile('./base_noSQL.json');
