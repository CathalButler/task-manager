import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { NgForm } from "@angular/forms";

/**
 * @title Edit tasks.
 * @desc this component allows the user update a selected task.
 * Functions:
 *     - onDelete() - allows the user delete a post
 *     - openDialog() -  allows the user view the note on a post.
 *     - onComplete() - allows the user mark a task as complete.
 *     - onUpdate() - allows the user update the priority of a task.
 * 
 * Tasks are pulled from the server where it is stored.
 */

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  task: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private ps: PostService) { }

  /** 
  * @title Edit post
  * @desc Function used edit a selected post.
  * Used imports:
  *      - import { NgForm }
  */ 
  onEditPost(form: NgForm) {
    this.ps.editTask(this.task[0]._id, form.value.task_name, form.value.note, form.value.priority, form.value.date, false).subscribe();
    console.log('DONE INSIDE onEditPost', form.value);
    this.router.navigate(['/view']);
  }// End edit post
  
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.ps.getTask(this.route.snapshot.params['id']).subscribe(data => {
      this.task = data; //SOMETHING WORNG HERE?
      console.log(this.task);
    })
  }//End ngOnInit 
}// End class
