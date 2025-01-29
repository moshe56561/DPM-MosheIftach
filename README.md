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
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task_manager?retryWrites=true&w=majority
   JWT_SECRET=<your_jwt_secret>
   ```

4. Run the backend:
   ```bash
   npm run dev
   ```
   This will start the server at `http://localhost:5000`.

2. Frontend Setup

3. Running the Application
1. Open `http://localhost:3000` (or the appropriate port if different) in your browser.
2. Register a new user.
3. Log in and create tasks.
4. Manage tasks (add, edit, delete).

Trade-offs or Decisions Made During Development
1. **Implementing Tests for the Entire Application:**
   - **Decision:** Due to time limitations, we did not implement tests for all components and backend routes.
   - **Trade-off:** A lack of comprehensive tests may impact the ability to catch issues in the future but was a necessary compromise to meet project deadlines.

2. **More Modular Store in the Frontend:**
   - **Decision:** The store in the frontend was not broken down into smaller, more modular pieces due to time constraints.
   - **Trade-off:** This could potentially lead to more complex state management in the future. However, the current setup allows for quicker development and easier management in the short term.

3. **Log Out Feature:**
   - **Decision:** The log-out functionality was not implemented due to time cost.
   - **Trade-off:** While the app currently lacks a full user session management feature, implementing it was postponed to focus on core functionality.

1. **Implementing Tests for the Entire Application:**
   - **Decision:** Due to time limitations, we did not implement tests for all components and backend routes.
   - **Trade-off:** A lack of comprehensive tests may impact the ability to catch issues in the future but was a necessary compromise to meet project deadlines.

2. **More Modular Store in the Frontend:**
   - **Decision:** The store in the frontend was not broken down into smaller, more modular pieces due to time constraints.
   - **Trade-off:** This could potentially lead to more complex state management in the future. However, the current setup allows for quicker development and easier management in the short term.

3. **Log Out Feature:**
   - **Decision:** The log-out functionality was not implemented due to time constraints.
   - **Trade-off:** While the app currently lacks a full user session management feature, implementing it was postponed because there wasn't enough time to complete the task.



