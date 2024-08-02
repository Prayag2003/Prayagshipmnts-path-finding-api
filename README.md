# Shipmnts Path Finding API

## Overview

This backend system is designed for monitoring real-time traffic conditions and providing optimal pathfinding solutions.

## Postman Live Link: ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/lively-comet-211587/workspace/shipmnts/request/26668533-c183da57-5a03-46a3-9638-b11d7f2d7359?action=share&creator=26668533&ctx=documentation)

## Tech Stack

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logoColor=white)
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
- ![CSV parser](https://img.shields.io/badge/CSV-FFCC00?style=for-the-badge&logoColor=white)

## Features

- Add and manage locations and roads.
- Update traffic conditions in real-time.
- Calculate the shortest path between two locations considering current traffic conditions.
- Generate traffic condition reports.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Prayag2003/Shipmnts-path-finding-api.git
   cd Shipmnts-path-finding-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   MONGODB_URI=
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

## API Endpoints

### Add Location

- **Endpoint:** `POST /api/v1/location`
- **Request Body:**
  ```json
  {
    "name": "Location A",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```
- **Response:** `201 Created` with the created location.

### Add Road

- **Endpoint:** `POST /api/v1/road`
- **Request Body:**
  ```json
  {
    "start_location_id": "1",
    "end_location_id": "2",
    "distance": 5,
    "traffic_condition": "clear"
  }
  ```
- **Response:** `201 Created` with the created road.

### Update Traffic Condition

- **Endpoint:** `POST /api/v1/traffic-updates`
- **Request Body:**
  ```json
  {
    "road_id": "1",
    "timestamp": "2024-06-25T14:00:00Z",
    "traffic_condition": "heavy"
  }
  ```
- **Response:** `201 Created` with the created traffic update.

### Get Shortest Path

- **Endpoint:** `GET /api/v1/shortest-path`
- **Request Parameters:** `start_location_id`, `end_location_id`
- **Response:** `200 OK` with the calculated path
  ```json
  {
    "path": ["a_location_id", "b_location_id", "c_location_id"],
    "total_distance": 10,
    "estimated_time": 15
  }
  ```

### Get Traffic Condition

- **Endpoint:** `GET /api/v1/road/:id/traffic-condition`
- **Response:** `200 OK` with the traffic condition

### Generate Traffic Report

- **Endpoint:** `GET /api/v1/report/traffic`
- **Response:** CSV file with traffic conditions for all roads.
