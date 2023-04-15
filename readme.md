# PageTurner:

## This page should be filled with more needed info as the project progresses. 

## How to run the project
```console
foo@bar:~/PageTurner
npm install
```


- This has to be done the first time you pull the repository. 
- How to follow the Git conventions of this project can be found [here](/documentation/gitConventions.md)




<br />

## 2.  Primitive Backend documentation:

Host: localhost:4000/api/author
End-points: 
1. localhost:4000/api/author : You will GET all authors
2. localhost:4000/api/author/fullname/"name" : You will GET an author by fullname
3. localhost:4000/api/author/"id" : You will get an author by id
4. POST: localhost:4000/api/"author" : adds an author to mongoDB. Needs a json body to be sent. 
5. localhost:4000/api/author/"id" : You DELETE an author by id
6. localhost:4000/api/author/fullname/"name" : You DELETE an author by fullname. 
Note you have to remove the: "" and insert your value of choice. 

# How to access the server? 
First of all one has to make sure that they have the correct MongoDb link at [.env](backend/.env) and you have access to the mongoDB. Please contact younesb for invite. 

Next, cd into the backend folder. In this folder we have 3 ways of running the server. 

1. 
```console
foo@bar:~/PageTurner/backend
node server.js
```
2. 
```console
foo@bar:~/PageTurner/backend
nodemon server.js
```
3. 
```console
foo@bar:~/PageTurner/backend
npm run dev
```
We recommend using method 2 or 3. 

For testing the end-points listed above at "Primitive Backend documentation" we recommend using Postman.

endring

