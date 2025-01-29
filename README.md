# DPM-MosheIftach

README

Instructions
1. Backend Setup
1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd moshe-iftach-dpm-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://moshe11:qazQAZ123@task-manager.s59hc.mongodb.net/task_manager
   JWT_SECRET=Jh^3kpR$Zz9gM@p5f!9L // you can choose some thiong else
   ```

4. Run the backend:
   ```bash
   npm run dev
   ```
   This will start the server at `http://localhost:5000`.

2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd moshe-iftach-dpm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```
   The frontend will run on a port of your choice (typically `http://localhost:3000`).

3. Running the Application
1. Open `http://localhost:3000` (or the appropriate port if different) in your browser.
2. Register a new user.
3. Log in and create tasks.
4. Manage tasks (add, edit, delete).


