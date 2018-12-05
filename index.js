'use strict';

const {dialogflow, SignIn, Suggestions} = require('actions-on-google');

const functions = require('firebase-functions');
const request = require('request-promise-native');
const app = dialogflow({debug: true});

app.intent('Default Welcome Intent', (conv, app) => {
  conv.ask(new SignIn('Bonjour, je suis l\'assistant virtuel My Bouygues. Vous authentifier vous donne accès à votre espace personel Bouygues, en continuant, vous acceptez de partager certaines informations de votre espace client bouygues à Google'));
});

app.intent('Default Fallback Intent', (conv) => {
  conv.ask('Bonjour, je peux vous connecter aux comptes suivants, veuillez me préciser à quoi vous souhaitez vous connecter :')
  conv.ask(new Suggestions(['compte bouygues']));
})

app.intent('Connect to Bouygues Api', (conv, params) => {
    conv.ask("okay!");
        var auth = 'Bearer ' + conv.user.access.token;
        var my_headers = {
            contenttype: 'application/x-www-form-urlencoded',
            "Authorization" : auth
        }
        var connectobj = {
            url: "https://api.bouyguestelecom.fr/personnes/" + conv.user.storage.id_personne,
            headers: my_headers,
            json: true,
            method: 'GET',
            resolveWithFullResponse: false};
            
        return request(connectobj)
        .then((apiData) => {
          conv.ask("Bonjour madame, monsieur " + apiData.prenom + ' ' + apiData.nom);
          conv.ask("données personelles à suivre");
          return;
      }).catch(function(err) {
          console.error(err);
          conv.ask('Connection à l\'api de bouygues télécom impossible, Erreur: ' + err);
          return;
      })
})

app.intent('Sign In', (conv, params, signin) => {
    var auth = 'Bearer ' + conv.user.access.token;
            var my_headers = {
                    "Authorization" : auth
                }
            var connectobj = {
                url: 'https://oauth2.bouyguestelecom.fr/userinfo',
                headers: my_headers,
                json: true,
                method: 'GET',
                resolveWithFullResponse: false
            };
    console.log('signIn');
    if (signin.status === 'OK') {
            return request(connectobj)
                .then((apiData) => {
                  conv.user.storage.id_personne = apiData.sub;
                  conv.ask("Merci, j'ai bien recu votre ID personne :" + apiData.sub)
                  conv.ask('Bonjour, je peux vous connecter aux comptes suivants, veuillez me préciser à quoi vous souhaitez vous connecter :')
                  conv.ask(new Suggestions(['compte bouygues']));
                  return;
              }).catch(function(err) {
                  conv.ask("Erreur lors de la recherche d\'id personne. Erreur :" + err);
                  return;
              })
    } else {
        conv.ask('Je n\'ai pas réusi à récuperer vos données');
    }
});

/*exemples complémentaires

app.intent('Get Conso Perso Mobile', (conv, params) => {
    //recuperer conso perso
    // appeler https://api.bouygues.fr...
    retourner une promess..
})

app.intent('Get Conso Perso Box Miami', (conv, params) => {
    //recuperer id contrat 
    // appeler https://api.bouygues.fr...
    retourner une promess..
})

*/

app.catch((conv, error) => {
  console.error(error);
  conv.ask('J\'ai rencontré une erreur, pouvez vous répéter votre phrase s\'il vous plait?');
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
