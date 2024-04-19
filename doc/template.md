# Template API Spec

## Add Template

Endpoint : POST /api/templates

Headers :

- authorization : token

Request Body :

```json
{
  "name": "template 1",
  "html_template": "<html>.....</html>"
}
```

Response Body(Success) :

```json
{
  "data": {
    "name": "template 1",
    "html_template": "<html>.....</html>"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update Template

Endpoint : PUT /api/templates/:id

Headers :

- authorization : token

Request Body :

```json
{
  "name": "template 1",
  "html_template": "<html>.....</html>"
}
```

Response Body(Success) :

```json
{
  "data": {
    "name": "template 1",
    "html_template": "<html>.....</html>"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Delete Template

Endpoint : DELETE /api/templates/:id

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