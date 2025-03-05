import { Component, inject, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-card',
  imports: [MatCardModule, MatDividerModule, MatIconModule,NgIf],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() postId: string = '';
  @Input() postText: string = '';
  @Input() user: User = new User(0,"");
  isAuthor = false;
  constructor(private postService: PostService){

  }

  ngOnInit(): void {
    const userId = JSON.parse(sessionStorage.getItem("user")?? "{}")
    this.isAuthor = this.user._id==userId._id
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
}
