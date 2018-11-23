import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { MatDialog} from '@angular/material';
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
 * 
 * @note this component exports the 'note data' from a selected task to the note.component
 * to be displayed on screen in a pop up dialog box.
 * Used imports:
 *    - import { MatDialog }
 *    - import { NoteComponent }
 * 
 * Tasks are displayed from the server where they are stored.
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
  onDelete(id: string) {
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

  ngOnInit() {
    this.postservice.getTasksData(false).subscribe(data => {
      this.tasks = data; //get api json data for list
      console.log('inside view.ts', this.tasks);
    })
  }// End function
}// End class

