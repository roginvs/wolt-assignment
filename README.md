# Wolt assignment

## What it is?

It is a Wolt test [assignment](https://c.smartrecruiters.com/sr-company-attachments-prod-dc5/5f05b5736bbcbc0ff2f7e7f3/d299cdb5-c0de-4c9d-8573-94a5ffdee6cb?r=s3-eu-central-1)

## How to run locally

You have to have nodejs. I used version 12

```sh
npm install
npm test
npm start
```

Open `http://localhost:5002`


Or, if you prefer to use docker for additional security:

```sh
docker run --rm -ti -p 5002:5002 -v $(pwd):/app node:12 bash
cd /app
npm install
npm test
npm start
```
