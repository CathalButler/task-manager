import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { NgForm } from "@angular/forms";

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
   // form.resetForm();
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
