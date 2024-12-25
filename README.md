# Project Name

## Overview
This project is a backend service that provides CRUD operations for managing reviews. It includes endpoints for creating, reading, updating, and deleting reviews, with additional features for validation, error handling, and filtering.

## Getting Started

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your database and Prisma by running `npx prisma migrate` to apply migrations .
4. Seed the database with initial data using `npm run seed`.
5. Run the server using `npm run dev` at port 8080.

## Dependencies

- Express
- Prisma
- express-validator

## Backend Requirements

### CRUD Endpoints
- **Create a Review**
  - `POST /reviews`
  - Description: Endpoint to create a new review.

- **List Reviews**
  - `GET /reviews`
  - Description: Retrieve a list of reviews with pagination support.
  - Query Parameters: 
    - `page`: Page number.
    - `page_size`: Number of reviews per page.
    - `search`: Search term to filter reviews by title.
    - `author`: Filter reviews by author.
    - `rating`: Filter reviews by rating.

- **Get a Single Review**
  - `GET /reviews/:id`
  - Description: Retrieve a single review by its ID.

- **Update a Review**
  - `PUT /reviews/:id`
  - Description: Update an existing review by its ID.

- **Delete a Review**
  - `DELETE /reviews/:id`
  - Description: Delete a review by its ID.

- **Get list of authors**
  - `GET /authors`
  - Description: Retrieve a list of authors.


## Error Handling

All endpoints return a JSON object with an `error` field in case of failure.

