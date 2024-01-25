import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import {BooksService} from '../../../services/books.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit, OnDestroy {
form!:FormGroup;
bookformSubscription!: Subscription;
paramsSubscription!: Subscription;
bookService = inject(BooksService);

isEdit=false;
id=0;

constructor(private fb:FormBuilder, 
  private activatedRouter: ActivatedRoute, 
  private router: Router,
  private toasterService: ToastrService,
  ) {
}

onSubmit(){
  if(!this.isEdit) {
  this.bookformSubscription = this.bookService.addBook(this.form.value).subscribe({
    next:(response)=>{
      console.log(response);
      this.toasterService.success("Book successfully added!");
      this.router.navigateByUrl('/books');
    },
    error:err=>{
      console.log(err);
    }
  })
}else {
   this.bookService.editBook(this.id, this.form.value).subscribe({
    next:value =>{
      this.toasterService.success("Book successfully edited!");
      this.router.navigateByUrl("/books");
      console.log(value);
    },error:err=>{
      console.log(err)
    }
   });
}
}


ngOnDestroy(): void {
  if(this.bookformSubscription) {
    this.bookformSubscription.unsubscribe();
  }
  if(this.paramsSubscription) {
    this.paramsSubscription.unsubscribe();
  }
}

ngOnInit(): void {
  this.form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publishYear: ['', Validators.required],
  });
  
  this.paramsSubscription = this.activatedRouter.params.subscribe({
    next:(response) => {
      console.log(response['id']);
      let id = response['id'];
      this.id=id;
      if(!id) return;
      this.bookService.getBook(id).subscribe({
        next:response=> {
          console.log(response);
         this.form.patchValue(response);
         this.isEdit=true;
        },
        error:err=> {
          console.log(err);
        }
      });
    },
    error:err=> {
      console.log(err);
    }
  });
}
}


