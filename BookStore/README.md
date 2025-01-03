

<div align="center">
  <h1>Welcome </h1>
  <img src="https://res.cloudinary.com/dxjwuevta/image/upload/v1685109353/pngwing.com_xcae9g.png" />  
</div>



# 📚 BookXpress - Your One-Stop Shop for Books & Resale Adventures! 📚

Welcome to **BookXpress**, the coolest eCommerce platform where you can not only buy books but also **resell them like a pro**! Whether you're into ultra-premium leather-bound masterpieces or just looking for a regular book to pass the time, we've got you covered. Here's how it works:

---

### 🚀 Main Features
- **Registration & Login**: Create an account, log in, and join the BookXpress family!
- **Search & Filters**: Find your next favorite read in seconds with our powerful search and filter system.
- **Wishlist**: Can't decide yet? Add your dream books to your wishlist and get notified when they're on sale!
- **Cart**: Add books to your cart and check out when you're ready to treat yourself.
- **Checkout & Buy**: Choose your payment method and click the magic button to own your new book.
  
---

### 💡 How It Works (Mind Map Below!)

1. **Buy a Book (Brand New!)**  
   You are the **first owner**. Congratulations! 🎉

2. **Resell Your Book (The Cool Part)**  
   After you've enjoyed your book, **resell it**! Here’s the catch:
   - You get **1/4th** of the original price (because...we all need to pay the bills)
   - **1/4th** goes as **service charges** (We work hard, OK? 😅)
   - **1/4th** is for **depreciation** (Books lose value, it’s the circle of life 📉)

3. **Categories of Books**
   - **Ultra Premium Books**: These are your **most expensive** books. Fancy, huh? 💎
   - **Premium Books**: Not as pricey as Ultra Premium, but still... expensive enough to make you feel special! 🌟
   - **General Books**: The regular-priced, yet beloved books! (Can't resell these though, they’re like the library books of the eCommerce world 📚)

---

### 💼 Categories Explained

#### 🔥 **Ultra Premium Books**
- The **fancy-schmancy** books with prices that make your wallet cry. Only the elite can afford these! 💸  
- **Resellable**: Yes, please! We’ll help you flip those books for some cash. 💰

#### 🌟 **Premium Books**
- A **close second** in the book world. They won’t cost you an arm and a leg, but they’ll definitely make you feel like a book aficionado.  
- **Resellable**: You bet! You’ll make a decent chunk of change selling these.

#### 📚 **General Books**
- Perfect for everyday readers who are **just looking for a good book** without breaking the bank.  
- **Resellable?** Nope. Once you’ve bought these, they’re yours for life. Sorry, not sorry! 😬

---

### 🧑‍💻 Tech Stack

- **Frontend**: Angular 16 (Yes, we upgraded!) 💻
- **Backend**: Node.js, Express.js 🌐
- **Database**: MongoDB (It’s NoSQL, baby!) 💾
- **Payment Gateway**: Stripe 💳
- **Authentication**: JWT (Security first!) 🔐

---

### 🧠 Mind Map of the Application Flow

```plaintext
          +----------------------+
          |     Home Page        |
          +----------------------+
                   |
         +--------------------+----------------+
         |                    |                |
    +----------+        +------------+    +------------+
    | Register |        | Login      |    | Browse Books|
    +----------+        +------------+    +------------+
                                              |
                                      +-------------------+
                                      |   Book Categories |
                                      +-------------------+
                                            |
                               +----------------------------+
                               |  Ultra Premium | Premium  | General |
                               +----------------------------+
                                            |
                               +----------------------------+
                               |  Buy / Add to Cart        |
                               +----------------------------+
                                            |
                                  +------------------------+
                                  | Checkout & Payment     |
                                  +------------------------+
                                            |
                                  +------------------------+
                                  | Order Confirmation     |
                                  +------------------------+
                                            |
                              +-----------------------------+
                              | Option to Resell Available  |
                              +-----------------------------+


```


1. **Clone the Repo**: 
   git clone https://github.com/username/BookNook.git

2. **Install Dependencies**: 
   npm install for both frontend and backend.

3. **Set Up Environment Variables**: 
   - Create a `.env` file in the root.
   - Add `DB_URI`, `JWT_SECRET`, and other configs.

4. **Run the App**: 
   - Start the backend server: 
     npm run server
   - Start the frontend: 
     npm start

5. **Access Book Nook** at `http://localhost:3000`


# 🎉 Features in Action

1. **Register & Login** - Just a few clicks and you're all set to explore!
2. **Search & Filter** - No more wasting time in the wrong genre (unless you're into that).
3. **Wishlist & Cart** - Bookmark books for later, or put them right in your cart and checkout. Easy peasy.
4. **Checkout** - Just a tap away from your next adventure!



1. **Inventory Management** - Keep your book database fresh and stocked.
2. **User Control** - Moderation tools to manage customers and keep things cozy.


| Endpoint            | Method | Description                 |
| ------------------- | ------ | --------------------------- |
| /api/register       | POST   | Register a new user         |
| /api/login          | POST   | Login a user                |
| /api/books          | GET    | Get list of books           |
| /api/books/search   | GET    | Search for a specific book  |
| /api/cart           | POST   | Add book to cart            |
| /api/wishlist       | POST   | Add book to wishlist        |
| /api/admin/books    | POST   | Admin add new book          |
| /api/admin/users    | GET    | Admin get list of users     |


# 1. With AWS EC2 
## To deploy a MEAN stack (MongoDB, Express.js, Angular, Node.js) application on AWS, you can follow these general steps:

1. Set up an AWS account if you don't have one already.
2. Provision an EC2 (Elastic Compute Cloud) instance to host your application. Choose an instance type and configure the necessary security groups and key pairs.
3. Connect to your EC2 instance using SSH. You can use tools like PuTTY (Windows) or the terminal (Mac/Linux) to establish a secure connection.
4. Install Node.js and MongoDB on your EC2 instance. This can be done using package managers like apt (for Ubuntu) or yum (for Amazon Linux).
5. Clone or upload your MEAN stack application code to the EC2 instance.
6. Install the necessary dependencies by navigating to your application's directory and running npm install to install the Node.js packages specified in your package.json file.
7. Build your Angular frontend by running ng build in your Angular project directory. This will generate the production-ready static files in the "dist" folder.
8. Start your Node.js server by running node server.js or npm start (depending on your setup) from your Node.js application's directory.
9. Ensure that your MongoDB service is running and accessible to your application. Update your database connection settings accordingly.
10. Configure any necessary environment variables or application-specific settings.
11. Set up a reverse proxy using a web server like Nginx or Apache to redirect requests to your Node.js application.
12. Open the necessary ports in your EC2 instance's security group to allow incoming traffic to your application. Typically, you'll need to open ports for HTTP (80) and HTTPS (443) traffic.
13. Test your application by accessing the public IP or domain name of your EC2 instance in a web browser.
14. Optionally, you can configure a domain name for your application using Route 53 or a third-party DNS provider.

# 2. WIth AWS ECR, ECS, S2. 

1. Containerize your MEAN stack application: Dockerize your application by creating Docker images for each component (Angular frontend, Express.js backend, and MongoDB). Write Dockerfiles to define the build steps and dependencies for each image.
2. Push Docker images to ECR: Create a private ECR repository to store your Docker images. Build the Docker images locally and push them to your ECR repository using the AWS CLI or Docker CLI.
3. Configure ECS cluster: Set up an ECS cluster to manage the deployment and scaling of your containers. Create a task definition that defines how your containers are configured and linked together.
4. Create ECS service: Create an ECS service that runs tasks based on your task definition. Configure the service to use your ECR images and specify the desired number of tasks to run.
5. Set up an application load balancer: Create an application load balancer to distribute incoming traffic across your ECS tasks. Configure the load balancer to route traffic to the appropriate containers.
6. Set up a domain name: If desired, configure a domain name for your application using Route 53 or a third-party DNS provider. Create a DNS record that points to the load balancer's endpoint.
7. Set up an S3 bucket: If your application requires file storage, create an S3 bucket to store and serve files. Configure the appropriate permissions and access controls for the bucket.
8. Update your application configuration: Modify your application's configuration to use the appropriate environment variables, such as database connection settings and S3 bucket details.
9. Deploy your application: Deploy your MEAN stack application to ECS by creating a new task or updating the existing task definition. ECS will handle the deployment of your containers and ensure they are running and accessible.
10. Test your application: Access your application using the load balancer's endpoint or domain name. Verify that the application is functioning as expected.
