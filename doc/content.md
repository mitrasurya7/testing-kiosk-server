# Content API Spec

## Add Content

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


## Get Content

## Update Content

## Delete Content