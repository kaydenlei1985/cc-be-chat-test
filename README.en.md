# chat_server

## lunch server
    npm install

    npm run start

## unit test
    npm run test

## System design decisions

### Component

#### Filter 
    The Filter component is used to Filter the dirty word. The Filter component reads the dirty word file into memory and processes the filtering process before the player message is forwarded.

#### History
    The History component is used to save the most recent History information. After the player logs in, the History component can issue the History information through the History component. The History component will save the History when the player sends the message.

#### Popular
    The Popular component records the current hot word information and uses the ttl-mem-cache package to store the hot word data and filter the timeout message.

#### User
    The User component is the component used to maintain the player status information data, which will be created after the player goes online, and destroyed after the player goes offline.

#### ChatServer
    The ChatServer component is used for the main process management module of the ChatServer to schedule the business process of the chat service.

## Scaling Concerns
    The business data of the server is kept in memory. If the server goes down, the data will be lost. Redis or mongodb should be used to persist the data.

    Single point of server deployment, there is a risk of single point of failure, production environment needs to set up a proxy server in the front, using service registry discovery mode cluster deployment.

## NPM packages
    mocha for testing framework.
    chai  for testing framework.
    ttl-mem-cache for popular storage.