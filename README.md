# AskAssignment

## Project Overview
AskAssignment is a web-based platform that provides user authentication and product management features. The platform allows users to sign up, log in securely, manage categories and subcategories, add products, and upload files and images.

## Features
- **User Authentication**: Secure login and signup with password encryption.
- **Category Management**: Create and manage categories and subcategories.
- **Product Management**: Add, update, and delete products.
- **File & Image Upload**: Supports file and image uploads.
- **JWT Authentication**: Secure API endpoints using JSON Web Tokens (JWT).

## Technologies Used
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Multer**: Middleware for handling file uploads.
- **MongoDB**: NoSQL database for storing user and product data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JSON Web Token (JWT)**: Authentication mechanism for securing API requests.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/md-irshad-alam/askassignment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd askassignment
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env.local` file in the root directory and add the necessary environment variables.

5. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
- **User Authentication**
  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Log in with email and password
- **Category Management**
  - `POST /api/category` - Create a new category
  - `GET /api/category` - Retrieve all categories
- **Product Management**
  - `POST /api/product` - Add a new product
  - `GET /api/product` - Retrieve all products
- **File Upload**
  - `POST /api/upload` - Upload images or files

## Contribution
Feel free to fork this repository, make improvements, and submit a pull request.

## License
This project is licensed under the MIT License.
