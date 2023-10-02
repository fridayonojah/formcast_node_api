# An Api Pdf Text Editor Built Upon Pdftron SDK

The aim of this API is to enable the editing of text content in a PDF. This automation was created to handle text editing for architectural house plans without distortion of the original dimensions of these plans.
An item that needs to be changed must be specified in a bracket [nameofwhattochange] inside the pdf document.


## How it works
- Receive an order_code from the client
- check if the DB if there is an order that exists with that order_code
#### Code Example
```js
 GET
{{url}}/api/v1/file/order_code`
```

```js
  API Responses 
{
    "client": "James",
    "project": "James construction company",
    "user_id": 2,
    "ordered_design": "2 BEDROOM DUPLEX"
    "file": "formcast_house_plan.zip"
}
```

- Send the ordered file to the pdf text editing function
- get the order file from our node.js file system
- editing all the PDF plans in the zip file changing the client name to order code client and project to order project name 

```js
  send a response to the client on a successful PDF text edit
{
    "status": true,
    "message" "files are ready for download. Please visit your dashboard"
}
```

```js
  send a response to the client on an error PDF text edit
{
    "status": false,
    "message" "something went wrong. please try again later!"
}
```
  

## Node Version
- v18.8.0
- npm 8.18.0

## Application setup

#### Copy .env-example and create your own .env file
```
cp .env-example .env
```
```
PDFNET_KEY = demo:forscaling@gmail.com:7c43ed9a0200000000d7bf1b2e877e61cd2575882006a6bc3b29f7afd8
```

#### Edit the .env file and add your MySQL username, MySQL password, and DB name

- Create two MySQL databases one for test and the other for development and assign the values of the connection strings to `DB_DATABASE` and `DB_TEST_DATABASE`= respectively.

### Install dependencies
```
js npm install
```

### Run the server locally
```
npm start
```

### Run the server locally in dev mode
```
npm run dev
```
