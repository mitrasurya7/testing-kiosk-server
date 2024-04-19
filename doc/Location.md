# Location API Spec

## Add Location

Endpoint : POST /api/location

Headers :

- authorization : token

Request Body :

```json
{
  "name": "Surabaya",
  "parentId": 1
}
```

Response Body(Success) :

```json
{
  "data": {
    "name": "Surabaya",
    "parentId": 1
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Get Location

    Endpoint : GET /api/location

Headers :

- authorization : token

Response Body(Success) :

```json
{
  "data": {
    "location": [
      {
        "name": "Indonesia",
        "parentId": null
      },
      {
        "name": "Surabaya",
        "parentId": 1
      }
      ...
    ]
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update Location

Endpoint : PUT /api/location/:id

Headers :

- authorization : token

Request Body :

```json
{
  "name": "Surabaya",
  "parentId": 1
}
```

Response Body(Success) :

```json
{
  "data": {
    "name": "Surabaya",
    "parentId": 1
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Delete Location

Endpoint : DELETE /api/location/:id

Headers :

- authorization : token

Response Body(Success) :

```json
{
  "data": true
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
