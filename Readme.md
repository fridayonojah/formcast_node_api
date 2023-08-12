# A pdf text editor built with nodejs

The aim of this API is to able to edit text content in a pdf. This automation was created to handle text editing in architectural house plans without distortion of the original dimensions of plans. This API is being built to be consumed by our client app using either fetch API or Ajax request method.
An item that needs to be changed must be specified in a bracket [nameofwhattochange] inside the pdf document.


## How it works
- This API takes either a GET or POST
- whichever request is received this API takes user_id and design_id to get the archive file that was uploaded in the admin using the desingn_id and user_id as constraints for searching file.
- After retrieving the accurate archive, we unzip this archive file into a new custom dir located inside the /public/static path
- The extracted dir is scanned in order to get all hose plan filenames with the .pdf extension to avoid any kind of error.
- Note: Each pdf file house plan has a placeholder that needs to be automatically filled with the name of the client and proposed residential location.
- iterate over the pdf files for each item with fill the client placeholder with the client name and the project placeholder with the client's proposed residential location.
- on successful file editing the unzipped file is zipped back and sent as a file download to the client browser
  

## Node Version
- v18.8.0
- npm 8.18.0

## Application setup

#### Copy .env-example and create your own .env file
```
cp .env-example .env
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


## Code Example Pdf editing
```js
 POST
{{url}}/api/v1/file`
```

#### Code Example

```js
{
    "client": "James",
    "project": "United state",
    "user_id": ,
    "design_id": "23456"
}
```

#### For demo sub user_id = 1 and design_id = 23456
``` js
GET {{url}}/api/v1/file/user_id/design_id
```

#### Response (English)
returns a force browser file download to the client browser

