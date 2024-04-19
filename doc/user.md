# User API Spec

## Register User

Endpoint : POST /api/users


Request Body    :

```json
{
    "username"    : "admin",
    "email"       : "admin@mail.com",
    "password"    : "password",
    "role"        : "admin",
    "locationId"  : 1,
}
```

Response Body(Success)   :

```json
{
    "data":{
        "username"  : "admin",
        "email"     : "admin@mail.com"
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Username already registered",
}
```
## Login User

Endpoint : POST /api/users/login


Request Body    :

```json
{
    "email"       : "admin@mail.com",
    "password"    : "password",
}
```

Response Body(Success)   :

```json
{
    "data":{
        "username"  : "admin",
        "email"     : "admin@mail.com",
        "token"     : "agldayebi2ui2u321gerb33333gqogbjawu"
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "username or password is wrong",
}
```

## Get User

Endpoint : GET /api/users

Headers  :
- authorization  : token

Response Body(Success)   :

```json
{
    "data":{
        "username"  : "admin",
        "email"     : "admin@mail.com",
        "role"      : "admin",
        "locationId": 1    
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Unauthorized",
}
```

## Update User

Endpoint : PUT /api/users/login

Headers :
- authorization : token

Request Body    :

```json
{
    "email"       : "admin@mail.com",
    "password"    : "password",
    "role"        : "admin",
    "locationId"  : 1
}
```

Response Body(Success)   :

```json
{
    "data":{
        "username"  : "admin",
        "email"     : "admin@mail.com",
    }
}
```

Response Body (Failed)  :

```json
{
    "errors"    :  "Unauthorized",
}
```

## Logout User

Endpoint : DELETE /api/users/logout

Headers :
- authorization : token

Response Body (Success) :

```json
{
    "data": true
}
```