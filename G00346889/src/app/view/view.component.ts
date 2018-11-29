import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material';
import { NoteComponent } from '../note/note.component';

export interface DialogData {
  note;
  taskId;
}// End export interface

/**
 * @title View page tasks.
 * @desc this component displays tasks data to on screen it adds functions
 * for the user like:
 *     - onDelete() - allows the user delete a post
 *     - openDialog() -  allows the user view the note on a post.
 *     - onComplete() - allows the user mark a task as complete.
 *     - onUpdate() - allows the user update the priority of a task.
 * 
 * @note this component exports the 'note data' from a selected task to the note.component
 * to be displayed on screen in a pop up dialog box.
 * Used imports:
 *    - import { MatDialog }
 *    - import { NoteComponent }
 * 
 * Tasks are got from the server where they are stored.
 */
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tasks: any = []; //Array used for locally storing tasks

  constructor(public dialog: MatDialog, private postservice: PostService) { }

  /**
   * @title Delete Task
   * @desc makes a delete request to the server for a selected task
   */
  onDelete(id: String) {
    console.log("Deleting item")
    this.postservice.deleteTask(id).subscribe(() => {
      this.ngOnInit();//Refresh the page
    });
  }// End onDelete function

  /** 
   * @title Note Dialog
   * @desc Function used to open up a popout dialog box to display the note from 'note.component' of the 
   * task selected in the view.html.
   * Share data with your dialog, you can use the data option to pass information to the dialog component.
   */
  openDialog(id: String, currNote: String): void {
    const dialogRef = this.dialog.open(NoteComponent, {
      data: { //passing tasks note data and id into the dialog box.
        taskId: id,
        note: currNote
      }//End data
    });//end function

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  };

  /**
  * @title Mark task completed
  * @desc sets a seleted task to be marked as complete. 
  * @note server handles request task id and true is passed into the .updateTask();
  */
  onComplete(id: String) {
    this.postservice.updateTask(id, true).subscribe(() => { //Update selected task to 'isComplete = true'
      this.ngOnInit();
    });
  }//End Function

  /**
  * @title Updates Priority
  * @desc updates a selected tasks prioity. 
  * @note server handles request task id and updated value is passed into the .updatePriority() in post service.
  */
  onUpdate(id: String, priority: Number) {
    this.postservice.updatePriority(id, priority).subscribe(() => {
      this.ngOnInit();
    });
  }// End Function

  ctrl($scope){

    $scope.styleSelection = function(date) {
    //Variables
    var tempDate = date; // Date read in from function peramters

    var day = tempDate.substr(8, 2);

    console.log(day);

    var todayDate = new Date(); //Get current date

    if (date <= todayDate) { //TO-DO COMPLETE THIS FUNCTION TO ALLOW DIFFERENT TEXT COLOURS FROM DATES
      return "red"
    } else {
      return ""
    }// End if else
  }// End function

}

  ngOnInit() {
    this.postservice.getTasksData(false).subscribe(data => {
      this.tasks = data; // API JSON data recived from the server passed into tasks array.
    })
  }// End function
}// End class

