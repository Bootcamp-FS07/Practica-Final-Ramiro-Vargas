import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { NgFor } from '@angular/common';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormDialogComponent } from '../../shared/components/create-form-dialog/form-dialog.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [NgFor, PostCardComponent, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isMenuOpen = false;
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.postService.getAll().subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  readonly dialog = inject(MatDialog);

  openCreateDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogref = this.dialog.open(CreateFormDialogComponent, {
      width: '250px',
      data: {
        title: 'Create new post',
        textButton1: 'Create',
        textButton2: 'Cancel',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogref.afterClosed().subscribe((result) => {
      if (result === 'Create') {
      }
    });
  }
}
