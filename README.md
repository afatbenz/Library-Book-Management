## Do you need a tutorial to run the service?
This is a simple application to create book management using Nodejs Express and MongoDB.

## API List
1. `/api/user/login` [POST]  - Login Journey
2. `/api/book/list` [GET]  - List of Books
4. `/api/book/submit` [POST] - Create Book (Auth Required)
5. `/api/book/detail` [POST] - Detail of Book
6. `/api/book/update` [POST] - Update the Book (Auth Required)
7. `/api/book/delete` [POST] - Delete the book (Auth Required)
7. `/api/book/submit-pickup` [POST] - Set pickup time (Auth Required)


## Do you need a tutorial to run the service?
OK, follow these steps
1. Clone this repository
2. Run command `npm install` to install node module package
3. Run command `nodemon start www` to start your service
4. The service will running default on port 3100


## Want an example of using the API?
Yes, you just need to import our postman collection. You can get it [here](https://github.com/afatbenz/Library-Book-Management/blob/main/Books.postman_collection).
You only need to change the payload, query and parameters that have been provided
