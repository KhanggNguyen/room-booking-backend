# API endpoints

These endpoints allow you to test this booking api.

## GET

`all user` [/room/](#room) <br/>
`all user` [/room/search?number=101](#get-room-by-number) <br/>
`all user` [/room/search?minOccupancy=1](#get-room-by-min-occupancy) <br/>
`connected user` [/booking/](#get-bookings) <br/>
`connected user` [/booking/:id](#get-booking-by-id) <br/>
`connected user` [/booking?userid=:id](#get-bookings-by-user) <br/>

## POST
`all user` [/user/register](#user-register) <br/>
`all user` [/user/login](#user-login) <br/>

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
|     `number` | required | integer  | Room number                                                                       |   



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