import { NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { PostService } from '../../../../services/post.service';
import { Post } from '../../../../models/post.model';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-update-form-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, 
    MatDialogContent,ReactiveFormsModule,NgIf],
  templateUrl: './update-form-dialog.component.html',
  styleUrl: './update-form-dialog.component.scss'
})
export class UpdateFormDialogComponent {
   readonly dialogRef = inject(MatDialogRef<UpdateFormDialogComponent>);
   private storageService = inject(StorageService);
    myForm: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; textButton1: string, 
      textButton2:string, postText:string},
     private fb: FormBuilder, private service: PostService) {
      this.myForm = this.fb.group({
        postText: [data.postText, Validators.required]
      });
    }
  onSubmit() {
    if (this.myForm.valid) {
        var post = new Post();
        post.text=this.myForm.get("postText")?.value
        const userId = this.storageService.getUser();
        post.author = userId
        this.service.updatePost(post).subscribe({
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
