# Device API Spec

## Register Device

Endpoint : POST /api/devices

Headers :
- authorization : token

Request Body    :

```json
{
    "name"       : "Device 1",
    "locationId" : 1,
    "templateId" : 1,
}
```

Response Body(Success)   :

```json
{
    "data":{
       "name"           : "Device 1",
       "locationId"     : 1,
       "status"         : false,
       "last_online"    : null,
       "last_offline"   : null,
       "template_id"    : 1
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Unauthorized",
}
```
## Update Device

Endpoint : PUT /api/devices/:id

Headers :
- authorization : token

Request Body    :

```json
{
    "name"       : "Device 1",
    "locationId" : 1,
    "templateId" : 1,
}
```

Response Body(Success)   :

```json
{
    "data":{
       "name"           : "Device 1",
       "locationId"     : 1,
       "status"         : false,
       "last_online"    : null,
       "last_offline"   : null,
       "template_id"    : 1
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Unauthorized",
}
```

## Delete Device

Endpoint : POST /api/devices/:id

Headers :
- authorization : token

Response Body(Success)   :

```json
{
    "data": true
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Unauthorized",
}
```