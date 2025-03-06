import { Component, inject, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PostService } from '../../../services/post.service';
import { UpdateFormDialogComponent } from '../update-form-dialog/update-form-dialog/update-form-dialog.component';
import { StorageService } from '../../../services/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'app-post-card',
  imports: [MatCardModule, MatDividerModule, MatIconModule,NgIf,ReactiveFormsModule,MatFormFieldModule,
    MatButtonModule, MatInputModule, NgFor],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() postId: string = '';
  @Input() postText: string = '';
  @Input() user: User = new User(0,"");
  myForm: FormGroup;
  isAuthor = false;
  public comments: Comment[] = []

  constructor(private postService: PostService, private storageService: StorageService, 
    private commentService: CommentService){
    this.myForm = new FormGroup({
      text: new FormControl('')
    });
  }

  ngOnInit(): void {
    const userId = this.storageService.getUser();
    this.isAuthor = this.user._id==userId._id
    this.fetchComments();
  }

  fetchComments(){
    this.commentService.getAllByPost(this.postId).subscribe({
      next:(response)=>{
        this.comments = response;
        console.log(this.comments)
      },
      error:(error)=>{
        console.log("error on request");
      }
    });
  }

  readonly dialog = inject(MatDialog);

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogref = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { 
        title: 'Delete Post',
        text: 'Sure you want to delete this post?'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.postService.deletePost(this.postId).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        })
      } 
    });
  }

  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogref = this.dialog.open(UpdateFormDialogComponent, {
      width: '250px',
      data: { 
        title: 'Update post',
        textButton1: 'Update',
        textButton2: 'Cancel',
        postText: this.postText
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === 'Update') {
        
      } 
    });
  }

  onSubmit() {
    this.commentService.createCommentOnPost(this.postId,this.myForm.get("text")?.value).subscribe(
      {
        next:(response)=>{
          console.log(response);
        },
        error:(error)=>{
          console.log("Error creating comment");
        }
      }
    )
  }
}
