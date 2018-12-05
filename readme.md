# App for linking of a Bouygues Télécom personal account to your google assistant mobile app

## This tutorial uses :
### . Actions-on-google
### . An actions-on-google action consisting in a dialogflow conversation
### . The dialogflow fulfillment environment.

# Steps for reproducing the account linking:
## Fill the Account linking section in Actions on google
![](account_creation_section.PNG?raw=true)
![](linking_type_section.PNG?raw=true)
![](client_information_section.PNG?raw=true)
![](client_configuration_section.PNG?raw=true)

## Copy dialogflow conversation to your own action
Copy the conversation zip file from this repo to Dialogflow from the following window:
![](import or export a zip file.PNG?raw=true)

_Optionally, you can recreate your own intents and entities in Dialogflow if you want customised behaviour_
## Access the Bytel API with some https requests
Access the Bouygues Télécom Restfull API in Fullfillment Javascript environment by using the code provided in the fullfillment.js and package.json files provided in this repository.


_Optionally, you can use your preferred code and all the extra functionalities provided by Dialogflow-fullfillment. [link to Fullfillment doc!] (https://dialogflow.com/docs/fulfillment)_
