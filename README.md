##  Task Manager Application

### Introduction:
Develop an application built around MongoDB, Express, Angular, and Node.js (MEAN). For my application, I built a task 
manager application that allows the user to enter a task name, date, priority of the task and a note.

###  Running Application:
After cloning run `npm install @angular/cli` then run ng serve for a dev server. Navigate to `http://localhost:4200/`

Run server in the `backend/` `node or nodemon server.js`

## User features:
### Create Task:

Allows the user to add a task with the following criteria:

      - Take name 
      - Date 
      - Priority of the task
      - Note.

### View Tasks:

Allows the user view tasks stored in the database and:

      - Edit Post: you can edit the task name, date, priority, and note.
      - Delete Post: deletes a selected task.
      - Mark a task complete: sets a task to is complete and it will then display in Completed tasks page.
      - View/edit task note: task note can be viewed from a pop out dialog and can also be edited and updated. 
      - Update priority: task priority can be updated by selecting a radio button.

### Completed Tasks:

Allows the user view completed tasks in the database and:

     - View/edit task note: task note can be viewed from a pop out dialog and can also be edited and updated.
     - Delete task: deletes a selected task.
     - Mark a task as incomplete: sets a task to is not complete and it will then display in view tasks page.

### Today's Tasks:

Allows the user to view tasks for the current date if any are in the database and:

     - Edit Post: you can edit the task name, date, priority, and note.
     - Delete Post: deletes a selected task.
     - Mark a task complete: sets a task to is complete and it will then display in Completed tasks page.
     - View/edit task note: task note can be viewed from a pop out dialog and can also be edited and updated. 
     - Update priority: task priority can be updated by selecting a radio button.
##  Development
    Angular         :  v11.1.2



