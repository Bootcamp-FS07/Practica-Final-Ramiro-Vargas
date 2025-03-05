import { NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-form-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, 
    MatDialogContent,ReactiveFormsModule,NgIf],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class CreateFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateFormDialogComponent>);
  myForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; textButton1: string, textButton2:string},
   private fb: FormBuilder, private service: PostService) {
    this.myForm = this.fb.group({
      postText: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.myForm.get("postText")?.value)
    console.log(this.myForm.valid)
    if (this.myForm.valid) {
        var post = new Post();
        post.text=this.myForm.get("postText")?.value
        const userId = JSON.parse(sessionStorage.getItem("user")?? "{}")
        post.author = userId
        this.service.createPost(post).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        })
    } else {
      console.log('Formulario no válido');
    }
  }
}
