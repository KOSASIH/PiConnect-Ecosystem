# PiConnect Ecosystem - API Reference

This document provides a comprehensive reference for the API endpoints available in the PiConnect Ecosystem. Each endpoint includes details about the request method, URL, parameters, and response format.

## Base URL

All API endpoints are relative to the base URL:

```
http://localhost:5000/api
```

## Authentication

### Login

- **Endpoint**: `/users/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response**:
    - **200 OK**: 
        ```json
        {
            "token": "string",
            "user": {
                "id": "string",
                "username": "string",
                "email": "string"
            }
        }
        ```
    - **401 Unauthorized**: 
        ```json
        {
            "message": "Invalid credentials"
        }
        ```

## Users

### Register User

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "username": "string",
        "password": "string",
        "email": "string"
    }
    ```
- **Response**:
    - **201 Created**: 
        ```json
        {
            "user": {
                "id": "string",
                "username": "string",
                "email": "string"
            }
        }
        ```
    - **400 Bad Request**: 
        ```json
        {
            "message": "User  already exists"
        }
        ```

### Get User Details

- **Endpoint**: `/users/:userId`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        {
            "id": "string",
            "username": "string",
            "email": "string"
        }
        ```
    - **404 Not Found**: 
        ```json
        {
            "message": "User  not found"
        }
        ```

## Charities

### Get All Charities

- **Endpoint**: `/charities`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        [
            {
                "id": "string",
                "name": "string",
                "description": "string"
            }
        ]
        ```

### Create Charity

- **Endpoint**: `/charities`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "name": "string",
        "description": "string"
    }
    ```
- **Response**:
    - **201 Created**: 
        ```json
        {
            "charity": {
                "id": "string",
                "name": "string",
                "description": "string"
            }
        }
        ```

### Get Charity Details

- **Endpoint**: `/charities/:charityId`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        {
            "id": "string",
            "name": "string",
            "description": "string"
        }
        ```
    - **404 Not Found**: 
        ```json
        {
            "message": "Charity not found"
        }
        ```

## Donations

### Make a Donation

- **Endpoint**: `/charities/:charityId/donate`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "amount": "number"
    }
    ```
- **Response**:
    - **200 OK**: 
        ```json
        {
            "message": "Thank you for your donation!",
            "donation": {
                "id": "string",
                "charityId": "string",
                "amount": "number",
                "date": "string"
            }
        }
        ```
    - **400 Bad Request**: 
        ```json
        {
            "message": "Invalid donation amount"
        }
        ```

## Notifications

### Get User Notifications

- **Endpoint**: `/notifications/:userId`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        [
            {
                "id": "string",
                "message": "string",
                "read": "boolean",
                "date": "string"
            }
        ]
        ```

### Send Notification

- **Endpoint**: `/notifications`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "userId": "string",
        "message": "string"
    }
    ```
- **Response**:
    - **201 Created**: 
        ```json
        {
            "notification": {
                "id": "string",
                "message": "string",
                "read": false,
                "date": "string"
            }
        }
        ```

## Analytics

### Get Overall Analytics

- **Endpoint**:`/analytics/overview`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        {
            "totalUsers": "number",
            "totalDonations": "number",
            "totalCharities": "number"
        }
        ```

### Get Donation Analytics

- **Endpoint**: `/analytics/donations`
- **Method**: `GET`
- **Response**:
    - **200 OK**: 
        ```json
        {
            "donations": [
                {
                    "charityId": "string",
                    "totalAmount": "number",
                    "donationCount": "number"
                }
            ]
        }
        ```

## Error Handling

All API responses will include appropriate HTTP status codes to indicate success or failure. In case of an error, the response will contain a message detailing the issue.

## Conclusion

This API reference serves as a guide for developers to understand how to interact with the PiConnect Ecosystem's backend services. By following the provided endpoints and formats, developers can effectively integrate and utilize the API in their applications. If you have any questions or need further clarification, please reach out to the project maintainers.
