# Requirements 
- NODE VERSION 16.14.0

# API endpoints

These endpoints allow you to test this booking api.

## GET

`all user` [/room/](#get-room) <br/>
`all user` [/room/search?number=101](#get-roomsearchnumber101) <br/>
`all user` [/room/search?minOccupancy=1](#get-roomsearchminoccupancy1) <br/>
`connected user` [/booking/](#get-bookings) <br/>
`connected user` [/booking/:id](#get-bookingid) <br/>
`connected user` [/booking?userid=:id](#get-bookinguserid631491bc36e289e758576e1d) <br/>

## POST
`all user` [/user/register](#post-userregister) <br/>
`all user` [/user/login](#post-userlogin) <br/>

`admin` [/room/](#create-room) <br/>

`customer` [/booking/](#create-booking) <br/>


## PUT 
`admin` [/room/:id](#update-room) <br/>
`admin or manager` [/room/availability/:id](#update-availability) <br/>
## DELETE
`admin` [/booking/:id](#delete-room) <br/>

### GET /room

**Parameters**
|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      |  |   |  |   

**Response**
```
// all room
{
    "success": true,
    "elements": [
        {
            "_id": "6349806f41de27ab742d16db",
            "name": "Double Room with south view for a person",
            "number": 101,
            "description": "A room with 2 beds for a person",
            "maxOccupancy": 2,
            "price": 105,
            "options": [],
            "extras": [],
            "created": "2022-10-14T15:29:51.143Z",
            "createdAt": "2022-10-14T15:29:51.147Z",
            "updatedAt": "2022-10-14T17:18:52.796Z",
            "slug": "double-room-with-south-view-for-a-person",
            "__v": 0,
            "isAvailable": true
        },
        {
            ...
        }
    ]
}
```

### GET /room/search?number=101

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `number` | required | integer  | Room number                                                                   |   



**Response**
```
{
    "status": "success",
    "elements": {
        "_id": "6349806f41de27ab742d16db",
        "name": "Double Room with south view for a person",
        "number": 101,
        "description": "A room with 2 beds for a person",
        "maxOccupancy": 2,
        "price": 105,
        "options": [],
        "extras": [],
        "created": "2022-10-14T15:29:51.143Z",
        "createdAt": "2022-10-14T15:29:51.147Z",
        "updatedAt": "2022-10-14T17:18:52.796Z",
        "slug": "double-room-with-south-view-for-a-person",
        "__v": 0,
        "isAvailable": true
    }
}
```
or error if parameter was not given
```
{
    "status": 400,
    "message": "Bad Request"
}
```

### GET /room/search?minOccupancy=1

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `minOccupancy` | required | integer  | The minimum guests that a room can hold. |   

**Response**
```
{
    "status": "success",
    "elements": [
        {
            "_id": "6349806f41de27ab742d16db",
            "name": "Double Room with south view for a person",
            "number": 101,
            "description": "A room with 2 beds for a person",
            "maxOccupancy": 2,
            "price": 105,
            "options": [],
            "extras": [],
            "created": "2022-10-14T15:29:51.143Z",
            "createdAt": "2022-10-14T15:29:51.147Z",
            "updatedAt": "2022-10-14T17:18:52.796Z",
            "slug": "double-room-with-south-view-for-a-person",
            "__v": 0,
            "isAvailable": true
        }
    ]
}
```
or error if parameter was not given
```
{
    "status": 400,
    "message": "Bad Request"
}
```

### GET /booking/
**Parameters**
|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      |  |   |  |   

**Response**
```
{
    "status": "success",
    "elements": [
        {
            "_id": "63503e2d078f86b7d52ee179",
            "room": "6349806f41de27ab742d16db",
            "user": "631491bc36e289e758576e1d",
            "checkin": "2022-10-20T00:00:00.000Z",
            "checkout": "2022-10-22T00:00:00.000Z",
            "nights": 2,
            "amount": 250,
            "totalGuests": 3,
            "adult": 2,
            "children": 1,
            "isPaid": false,
            "created": "2022-10-19T18:13:01.100Z",
            "__v": 0
        },
        {
            "_id": "635042eda8b2c052a58b9071",
            "room": "6349806f41de27ab742d16db",
            "user": "631491bc36e289e758576e1d",
            "checkin": "2022-10-10T00:00:00.000Z",
            "checkout": "2022-10-15T00:00:00.000Z",
            "nights": 5,
            "amount": 565,
            "totalGuests": 3,
            "adult": 2,
            "children": 1,
            "isPaid": false,
            "created": "2022-10-19T18:33:17.292Z",
            "__v": 0
        }
    ]
}
```

### GET /booking/:id
**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | required | string  | booking id                                                                    |   



**Response**
```
{
    "status": "success",
    "elements": {
        "_id": "63503e2d078f86b7d52ee179",
        "room": "6349806f41de27ab742d16db",
        "user": "631491bc36e289e758576e1d",
        "checkin": "2022-10-20T00:00:00.000Z",
        "checkout": "2022-10-22T00:00:00.000Z",
        "nights": 2,
        "amount": 250,
        "totalGuests": 3,
        "adult": 2,
        "children": 1,
        "isPaid": false,
        "created": "2022-10-19T18:13:01.100Z",
        "__v": 0
    }
}
```
or error if parameter was not given
```
{
    "status": 400,
    "message": "Bad Request"
}
```

### GET /booking?userid=631491bc36e289e758576e1d
**Parameters as query**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `userid` | required | string  | user id                                                                    |   



**Response**
```
{
    "status": "success",
    "elements": [
        {
            "_id": "63503e2d078f86b7d52ee179",
            "room": "6349806f41de27ab742d16db",
            "user": "631491bc36e289e758576e1d",
            "checkin": "2022-10-20T00:00:00.000Z",
            "checkout": "2022-10-22T00:00:00.000Z",
            "nights": 2,
            "amount": 250,
            "totalGuests": 3,
            "adult": 2,
            "children": 1,
            "isPaid": false,
            "created": "2022-10-19T18:13:01.100Z",
            "__v": 0
        },
        {
            "_id": "635042eda8b2c052a58b9071",
            "room": "6349806f41de27ab742d16db",
            "user": "631491bc36e289e758576e1d",
            "checkin": "2022-10-10T00:00:00.000Z",
            "checkout": "2022-10-15T00:00:00.000Z",
            "nights": 5,
            "amount": 565,
            "totalGuests": 3,
            "adult": 2,
            "children": 1,
            "isPaid": false,
            "created": "2022-10-19T18:33:17.292Z",
            "__v": 0
        }
    ]
}
```
or error if parameter was not given
```
{
    "status": 400,
    "message": "Bad Request"
}
```

### POST /user/register
**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `firstName` | required | string  | user's first name                                                                    | 
|     `lastName` | required | string  | user's last name                                                                    | 
|     `userName` | required | string  | user's username                                                                    | 
|     `email` | required | string  | user's email                                                                    |   
|     `password` | required | string  | user's password                                                                    |   



**Response**
```
{
    "status": "success",
    "elements": {
        "userName": "username",
        "firstName": "userfirstname",
        "lastName": "userlastname",
        "password": "$2b$10$uYbLkA2ojazeqsdAZz&15xTYxn3t.TA1aQ1HDaNy06QxKWcRm",
        "email": "user2@gmail.com",
        "dateOfBirth": null,
        "gender": "OTHER",
        "provider": "email",
        "googleId": null,
        "role": "ROLE_MEMBER",
        "_id": "636128d5f8ed1756478b778a",
        "addresses": [],
        "created": "2022-11-01T14:10:29.460Z",
        "__v": 0
    }
}
```
or error if parameter was not given
```
{
    "status": 409,
    "message": "user2@gmail.com has been registered !"
}
```
```
{
    "status": 500,
    "message": "E11000 duplicate key error collection: test.users index: userName_1 dup key: { userName: \"seppeotran1\" }"
}
```

### POST /user/login
**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `email` | required | string  | user email                                                                    |   
|     `password` | required | string  | user password                                                                    |   



**Response**
```
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE0OTFiYzM2ZTI4OWU3NTg1NzZlMWQiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTY2NzMxMTA4MiwiZXhwIjoxNjY3MzE0NjgyfQ.gFX57w9C-m64cWlv6ZX2q7izu0gztIdm4ZLUzIp4zds",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE0OTFiYzM2ZTI4OWU3NTg1NzZlMWQiLCJpYXQiOjE2NjczMTEwODIsImV4cCI6MTY2NzM5NzQ4Mn0.G_ZPA8pSERmRxeID1xlRIv6x-v_mlzX3FZhPzCsnHnk"
}
```
or error if parameter was not given
```
{
    "status": 500,
    "message": "\"password\" is required"
}
```