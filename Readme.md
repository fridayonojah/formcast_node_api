# This is the node get way formcast file processor

## Application Startup
- create a public public dir for storing housing files dir
- inside the public folder create two dir files and static
- files for storing zip files and also for storing client requested zipfile
- static dir is a playground where archive files  manipulations is carried out. When done with file manipulation, a zip file is generated. The generated zip file is store in the files dir. Afterword we clean the disk of the static dir.

## Node Version
- v18.8.0
- npm 8.18.0


### Current supported endpoints
`GET {{url}}/api/v1/post/user_id/design_id`

`POST {{url}}/api/v1/post`
