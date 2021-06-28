# A basic CRUD app + db docker setup

## Get started

Docker and docker-compose are required to run this application. To start it, simply run `docker-compose up` at the root of this repository.
By default the server will listen on port 8080.

## API reference

### `GET /players`

Will return all the players saved in base.

#### Example response

```json
{
    "data":
    [
        {
            "id":"405opf1kqgiim3w",
            "name":"Jean Sport",
            "number":69,
            "team":"Sports FC",
            "deletedAt":null
        }
    ]
}
```

### `GET /player/:playerid

Will return data on the player linked to the id, if they exist.

#### Example response:

```json
{
    "data":
        {
            "id":"405opf1kqgiim3w",
            "name":"Jean Sport",
            "number":69,
            "team":"Sports FC",
            "deletedAt":null
        }
}
```

### `POST /player`

Will create a new player. Requires authentication.

#### Example payload

```json
{
    "name":"Jean Sport",
    "number": 69,
    "team": "butts"
}
```

#### Example response

```json
{
    "data":
    [
        {
            "id":"405opf1kqgiim3w",
            "name":"Jean Sport",
            "number":69,
            "team":"Sports FC",
            "deletedAt":null
        }
    ]
}
```

### `PUT /player/:playerid`

Will update an existing player. Requires authentication.

#### Example payload

```json
{
    "name": "Jack Sport"
}
```

#### Example response

#### Example response

```json
{
    "data":
    [
        {
            "id":"405opf1kqgiim3w",
            "name":"Jack Sport",
            "number":69,
            "team":"Sports FC",
            "deletedAt":null
        }
    ]
}
```

### `DELETE /player/:playerid`

Will delete an existing player. Requires authentication.

#### Example response

```json
{
    "data":
        [
            {
                "id":"405opf1kqgiim3w",
                "name":"Jack Sport",
                "number":69,
                "team":"butts",
                "deletedAt":"2021-06-28T13:08:13.441Z"
            }
        ]
}
```

### `POST /user`

Will create a new user for authentication purposes.

#### Example payload

```json
{
    "username": "admin",
    "password": "password",
}
```

#### Example response

```json
{
    "data":
        [
            {
                "id":"405opf1kqghrekw",
                "name":"admin1",
                "passwordHash":"5f4dcc3b5aa765d61d8327deb882cf99"
            }
        ]
}
```

### `POST /user/login`

Will check credentials and return a JWT for authentication purposes.

#### Example payload

```json
{
    "username": "admin",
    "password": "password",
}
```

#### Example response

```json
{
   "token": "notanactualJWT"
}
```