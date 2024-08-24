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
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  quotes$!: Observable<Quote[]>;
  toaster = inject(ToastrService);

  quoteService = inject(QuotesService);

  ngOnInit(): void {
    this.getQuotes();
  }

  // Delete a quote by ID
  delete(id: number) {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => {
        this.toaster.error('Citatet har raderats!');
        this.getQuotes();
      },
    });
  }

  // Fetch the list of quotes
  private getQuotes(): void {
    this.quotes$ = this.quoteService.getQuotes();
  }
}
