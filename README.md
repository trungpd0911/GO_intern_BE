# Backend for Golden Owl Internship Application

This repository contains the backend of a fullstack application built to apply for an internship at Golden Owl. The backend is built using NestJS and Mongoose.

## Table of Contents

- [Installation](#installation)
- [Running the Backend](#running-the-backend)

## Installation

To get started, clone the repository and install the dependencies.

```bash
git clone https://github.com/trungpd0911/GO_intern_BE
cd GO_intern_BE
```

### Running the Backend

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    ```env
    DB_URL=mongodb://localhost:27017/your-database
    ```

4. Start the backend server:

    ```bash
    npm run start:dev
    ```