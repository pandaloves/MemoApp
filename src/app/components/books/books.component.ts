import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../../services/books.service';
import { Book } from '../../types/book';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books$!: Observable<Book[]>;
  toaster = inject(ToastrService);
  bookService = inject(BooksService);

  ngOnInit(): void {
    this.getBooks();
  }

  delete(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: (response) => {
        this.toaster.success('Boken har raderats!');
        this.getBooks();
      },
    });
  }

  private getBooks(): void {
    this.books$ = this.bookService.getBooks();
  }
}
