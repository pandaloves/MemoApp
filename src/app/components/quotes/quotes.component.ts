import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuotesService } from '../../services/quotes.service';
import { Quote } from '../../types/quote';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './quotes.component.html',
})
export class QuotesComponent implements OnInit {
  quotes$!: Observable<Quote[]>;
  toaster = inject(ToastrService);

  quoteService = inject(QuotesService);

  ngOnInit(): void {
    this.getQuotes();
  }

  delete(id: number) {
    this.quoteService.deleteQuote(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toaster.success('Quote successfully deleted!');
        this.getQuotes();
      },
    });
  }

  private getQuotes(): void {
    this.quotes$ = this.quoteService.getQuotes();
  }
}
