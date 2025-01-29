# DPM-MosheIftach

README

Instructions
1. Backend Setup
Clone the repository:

bash
Copy
Edit
git clone <repo_url>
cd moshe-iftach-dpm-server
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file with the following variables:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task_manager?retryWrites=true&w=majority
JWT_SECRET=<your_jwt_secret>
Run the backend:

bash
Copy
Edit
npm run dev
This will start the server at http://localhost:5000.

2. Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd moshe-iftach-dpm
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend:

bash
Copy
Edit
npm start
The frontend will run on a port of your choice (typically http://localhost:3000).

3. Running the Application
Open http://localhost:3000 (or the appropriate port if different) in your browser.
Register a new user.
Log in and create tasks.
Manage tasks (add, edit, delete).
