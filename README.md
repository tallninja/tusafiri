# Tusafiri Project

This is a bus booking and ticketing system that allows people to book buses to various destinations from the comfort of their home.

## Running

Make sure you have Docker and Docker-compose installed on your system

### Development

```bash
docker-compose -f docker-compose.dev.yml up --build
```

OR

```bash
docker-compose -f docker-compose.dev.yml up
```

### Production

Make sure you create a ```.env``` file at the root of the project. Inside the ```.env``` file add the MONGO_URI environment variable like so:

```text
MONGO_URI={mongodb URI string here...}
```

Then you can run the commands below.

```bash
docker-compose up --build
```

OR

```bash
docker-compose up
```
