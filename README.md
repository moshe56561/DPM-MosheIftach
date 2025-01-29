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
Trade-offs or Decisions Made During Development
Implementing Tests for the Entire Application:

Decision: Due to time limitations, we did not implement tests for all components and backend routes.
Trade-off: A lack of comprehensive tests may impact the ability to catch issues in the future but was a necessary compromise to meet project deadlines.
More Modular Store in the Frontend:

Decision: The store in the frontend was not broken down into smaller, more modular pieces due to time constraints.
Trade-off: This could potentially lead to more complex state management in the future. However, the current setup allows for quicker development and easier management in the short term.
Log Out Feature:

Decision: The log-out functionality was not implemented due to time constraints.
Trade-off: While the app currently lacks a full user session management feature, implementing it was postponed because there wasn’t enough time to complete the task.
