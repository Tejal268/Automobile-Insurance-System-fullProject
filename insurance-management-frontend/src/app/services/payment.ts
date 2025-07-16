import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private baseUrl = 'http://localhost:9999/api';  
  baseUrl2 = 'http://localhost:9999/api/payments';

  constructor(private http: HttpClient) {}

 getQuote(proposalId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/quotes/proposal/${proposalId}`);
  }

  completePayment(proposalId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/payments/complete/${proposalId}`, null);
  }
  getAllPayments(): Observable<any> {
  return this.http.get(`${this.baseUrl}/all`);
}

makePayment(userId: number, quoteId: number, amount: number, paymentMode: string, paymentDate: string) {
  return this.http.post(`${this.baseUrl2}/make-payment`, null, {
    params: {
      userId: userId.toString(),
      quoteId: quoteId.toString(),
      amount: amount.toString(),
      paymentMode,
      paymentDate
    }
  });
}


}
