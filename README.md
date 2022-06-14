- [Intro](#intro)
- [Prerequisites](#prerequisites)
- [Running tests](#running-tests)
- [Running the application](#running-the-application)
- [Examples](#examples)
  * [Login (to obtain a JWT authentication token)](#login--to-obtain-a-jwt-authentication-token-)
  * [Create contact](#create-contact)
  * [Query contacts with pagination/sorting](#query-contacts-with-pagination-sorting)
  * [Update contact](#update-contact)
  * [Remove contact](#remove-contact)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Intro

Since I knew you guys used Typescript and Graphql I decided to use the NestJs framework to quickly bootstrap and generate a lot of the stuff. 
Pretty much most of this is based on (and even copied from) its tutorial guide at https://docs.nestjs.com/. NestJs is a rapid development framework for Node.js with a ton of options.

The app is an ApolloServer GraphQL API that connects to a SQLite database for simplicity. 
It uses a file based SQLite instance in dev mode and an in-memory based SQLite instance for unit/integration tests.


For further simplicity I kept the phonebook model itself flat. It is backed by one database table - `contacts`.

In a more sophisticated design I might have broken the the model out into `contacts`, `addresses` (many to one with contacts) and `phones` (many to one with contacts) entities but that would make it much more complex in terms of inserts/updates and queries.


All queries/mutations except the `login` query are secured/guarded by JWT tokens.

App uses NestJs 'Guards' in conjunction with the node `passport` library to secure queries/mutations - basically requiring a Bearer JWT token to be passed in to all secured endpoints in an `Authroization` http request header like this in the GraphQL query headers:

```
{
  "Authorization" : "Bearer <jwt token>"
}

```



A JWT is obtained by calling the `login(username, password)` query with a valid username and password. The app itself has a hardcoded list of valid username/password combos - thus there is no registration functionality. (See user.service.ts)

Valid username/passwords are:

      username: 'john',
      password: 'changeme',

      username: 'maria',
      password: 'guess',
    


There is are no role based access control (RBAC) or access control lists (ACL) implemented at the moment, so all authenticated users are ablr to create/delete and update contacts.


Unauthenticated callers get the following response:

```
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "response": {
          "statusCode": 401,
          "message": "Unauthorized"
        }
      }
    }
  ],
  "data": null
}
```

# Prerequisites

Yarn should be installed:

    npm install --global yarn


Install dependencies:


    yarn install


# Running tests


run the tests with :

    yarn test


# Running the application

Run the following

    yarn start


The app should start up and the ApolloServer playground should be available at

     http://localhost:3000/graphql
     
Documentation can be found along the right hand side of the browser window.


<br>

**Initially the application database will be empty**



<br/><br/><br/><br/>

# Examples

## Login (to obtain a JWT authentication token)

Query - **use the access token returned in the Authoorization request header for all other queries/mutations**

```
query login($username: String!, $password: String!){
  login(username:$username, password: $password){
    access_token
  }
}
```

Query variables
```
{
  "username": "john",
  "password": "changeme"
}
```



## Create contact

Query:
```
mutation createContact($createContactInput: CreateContactInput!){
  createContact(createContactInput: $createContactInput){
    id
    firstName
    lastName
    email
    homePhone
    workPhone
    mailingAddress
  }
}
```

Query variables
```
{
  "createContactInput" : {
    "firstName" : "Joe",
    "lastName" : "Soap",
    "email" : "joesoap@gmail.com",
    "homePhone": "123",
    "mobilePhone": "234",
    "workPhone": "456",
    "mailingAddress": "asdjhgflasdf, jkahgsdfjhgasdf"
    
  }
}
```

Http Headers:
```
{
  "Authorization" : "Bearer <token>"
}
```

## Query contacts with pagination/sorting

Uses simple offset pagination rather than cursors for now


Query:

```
query contacts($pageRequestInput: PageRequestInput){
  contacts(pageRequestInput:$pageRequestInput){
    totalCount
    pageInfo{
      page
      totalPages
    }
    contacts{
      id
      firstName
      lastName
      email
      homePhone
      workPhone
      mailingAddress	
    }
    
  }
}
```

Query variables:
```
{
  "pageRequestInput" : {
    "page": 0,
    "pageSize": 20
  }
}
```

Http Headers:
(same Authorization header as before)

## Update contact

Query:

```

mutation updateContact($updateContactInput: UpdateContactInput!){
  updateContact(updateContactInput: $updateContactInput){
    	id
      firstName
      lastName
      email
      homePhone
      workPhone
      mailingAddress
  }
}
```

Query variables:

```
{
  "updateContactInput" : {
    "id": 1,
    "firstName" : "changeme"
  }
}
```

Http Headers:
(same Authorization header as before)


## Remove contact

Query:

```
mutation removeContact($id: Int!){
  removeContact(id: $id)
}

```

Query variables:

```
{
  "id" : 1
}
```

Http Headers:
(same Authorization header as before)



#TODO
- more unit tests that test securoty
- seed database
- role based access