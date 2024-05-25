# **TrackMyDay**

TrackMyDay is a To-do List app that allows users to manage their tasks. The application supports basic CRUD operations and follows the REST api principles. The motive of this project was to focus on simplicity and functionality with minimal design. 

## **Features**

* Create, read, update, and delete tasks.
    
* Task details include title, description, status, and due date.
    
* All data are stored within a JSON file within the server's in-memory storage.

## **Tech Stack**

* *Frontend* : React, tailwind-CSS
* *Backend* : Nodejs, Express, fs module
* *Package manager* : Bun
    

## **Installation**

1. **Clone the repository**:
    
    ```javascript
    git clone https://github.com/biswarup-naha/Track-My-Day.git
    cd trackmyday
    ```
    
2. **Backend Setup**:
    
    ```javascript
    cd backend
    bun install
    bun run serve
    ```
    
3. **Frontend Setup**:
    
    ```javascript
    cd ../frontend
    bun install
    bun run dev
    ```
    

## **Usage**

1. Open your browser and navigate to [`http://localhost:5173`](http://localhost:5173).
    
2. Create new tasks using the form.
    
3. View the list of tasks, edit or delete them as needed.
    

## **Environment Variables**

Create a `.env` file in the `frontend` directory with the following content:

```javascript
VITE_API_URL=http://localhost:5000
```