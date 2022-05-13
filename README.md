# Storefront Backend Project

This is a project for Udacity Full Stack JavaScript Developer Nanodegree Program. The goal of this project was to create a SQL database, table for a store and create a RESTful API to be accesible to the frontend developer.

You can find the data shape of the database, table and endpoints from requirements.md file.

## Installation and Startup

1. Clone the repository
2. npm install
3. find config.env content from the below information
4. setup your Postgres database and create tables by db-migrate up command
5. npm run start

## Required Technologies

My application use the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## config.env

My config.env file is not in this repository but I provided the dotenv content below for Udacity project reviewers to review this project.

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_backend_dev
POSTGRES_TEST_DB=store_backend_test
POSTGRES_USER=project_user
POSTGRES_PASSWORD=project456
ENV=dev
PORT=8000

BCRYPT_PASSWORD=my-secret-password-protector-private-key
SALT_ROUNDS=10

JWT_SECRET=my-secret-password-protector-private-key
JWT_EXPIRES_IN=90d
