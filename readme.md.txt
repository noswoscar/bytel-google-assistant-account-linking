# App for linking a Bouygues Télécom personal account to your google assistant mobile app

## You will use:
### .actions-on-google
### .an actions-on-google action consisting in a dialogflow conversation
### .The dialogflow fulfillment environment.

# Steps to reproduce the account linking google assistant app:
## Account linking in Actions on google
![](account_creation_section.PNG?raw=true)
![](linking_type_section.PNG?raw=true)
![](client_information_section.PNG?raw=true)
![](client_configuration_section.PNG?raw=true)
image2

image3

image4
## Copy dialogflow conversation to your own action
Copy the conversation zip file from this repo to Dialogflow from the following window:
image of zip upload
Optianally recreate your own intents and entities in Dialogflow if you want customised behaviour
## Access the Bytel API with some https requests
Access the Bouygues Télécom API in Fullfillment Javascript environment by using the code provided in the fullfillment.js and package.js files provided in this repo.
Optionally use your prefered code and functionalities provided by Dialogflow-fullfillment. [link to Fullfillment doc!] (https://dialogflow.com/docs/fulfillment)

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```