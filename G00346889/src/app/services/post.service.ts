import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  //Array of posts 
  private tasks: Task[] = [];

  /**
  * @title Get tasks data.
  * @desc gets all tasks data from the database.
  * @note passes a Boolean, server takes care of the request
  */
  getTasksData(isComplete: Boolean): Observable<any> {
    //Connect to server URL here and GET JSON DATA
    return this.http.get("http://127.0.0.1:8081/api/tasks/" + isComplete);
  }

  /**
  * @title Get a task for editing tasks.
  * @desc gets a tasks data from the database, this will be used when pulling task into edit component.
  * @note passes a String, Server takes care of the request.
  */
  getTask(id: String): Observable<any> {
    return this.http.get("http://localhost:8081/api/tasks/edit/" + id);
  }

  /**
  * @title Adds a tasks.
  * @desc adds a task from the applcation create page.
  * @note passes Strings and a Boolean, Server takes care of the request and data.
  */
  addTask(task_name: String, note: String, priority: Number, date: String, isComplete: Boolean): Observable<any> {
    const task: Task = { task_name: task_name, note: note, priority: priority, date: date, isComplete: isComplete };
    console.log("Task Added inside post.service!");
    return this.http.post("http://127.0.0.1:8081/api/tasks", task)
  }

  /**
  * @title Updates a task
  * @desc updates a selected tasks data.
  * @note passes String and a boolean, Server takes care of the request.
  */
  editTask(id: String, task_name: String, note: String, priority: Number, date: String, isComplete: Boolean): Observable<any> {
    const task: Task = { task_name: task_name, note: note, priority: priority, date: date, isComplete: isComplete };
    console.log('inside updateTask() in post service', task);
    return this.http.put("http://localhost:8081/api/tasks/edit/" + id, task);
  }

  /**
  * @title Deletes a task
  * @desc deletes a selected tasks from the database.
  * @note passes String, Server takes care of the request.
  */
  deleteTask(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/tasks/" + id);
  }

  /**
  * @title Updates a task
  * @desc updates a selected tasks in the database.
  * @note passes String and a boolean, Server takes care of the request.
  */
  updateTask(id: String, isComplete: Boolean): Observable<any> {
    const isComp = { isComplete }; //Need to pass as a object for the req.body
    return this.http.put("http://localhost:8081/api/tasks/update/" + id, isComp);
  }

  /**
   * @title Updates a note in a task
   * @desc updates a selected tasks note in the database.
   * @note passes 2 Strings, Server takes care of the request.
   */
  updateNote(id: String, note: String): Observable<any> {
    const updateNote = { note };
    return this.http.put("http://localhost:8081/api/tasks/update/note/" + id, updateNote);
  }

}// End class
