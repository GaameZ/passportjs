# Connexion / Inscription avec PassportJS

## /backend

### Installation packages npm

npm i --save express body-parser cors mysql bcrypt passport jsonwebtoken passport-jwt passport-local

### Fichiers

#### conf.js

> Créer un fichier conf.js à la racine du dossier /backend.
> Contenu conf.js:

    ```
    const  portNumber  =  5050;

    const  mysql  =  require("mysql");

    const  db  =  mysql.createConnection({

        host:  "hostname",

        user:  "username",

        password:  "password",

        database:  "database_schema"

    });

    const  jwtSecret  =  "my_jwt_secret";

    const  saltRounds  =  10;



    module.exports  = {

        portNumber,

        db,

        saltRounds,

        jwtSecret

    };
    ```

Mettre les bonnes valeurs pour host, user, password, database et jwtSecret.

#### passport-strategie.js

Ligne 15:

> Modifier la requête sql pour coïncider avec la bdd. Ce sont les données à recupérer pour construire le token

#### /routes/auth.js

Ligne 21:

> Modifier la requête sql pour coïncider avec la bdd. Ce sont les données à insérer dans la bdd pour s'inscrire.

## /frontend
