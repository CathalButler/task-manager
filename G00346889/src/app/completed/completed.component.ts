import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  tasks: any = []; //Array used for locally storing tasks

  constructor(private postservice: PostService) { }

  /**
  * @title Delete Task
  * @desc makes a delete request to the server for a selected task
  */
  onDelete(id: string) {
    console.log("Deleting item")
    this.postservice.deleteTask(id).subscribe(() => {
      this.ngOnInit();//Refresh the page
    });
  }// End onDelete function

  /**
  * @title Mark task uncompleted
  * @desc sets a seleted task to be marked as uncomplete.  
  * @note server handles request task id and true is passed into the .updateTask();
  * isComplete = false
  */
  onUnComplete(id: String) {
    this.postservice.updateTask(id, false).subscribe(() => { //Update selected task to 'isComplete = false'
      this.ngOnInit();
    });
  }//End Function

  ngOnInit() {
    this.postservice.getTasksData(true).subscribe(data => {
      this.tasks = data; //get api json data for list
    })

  }
}
