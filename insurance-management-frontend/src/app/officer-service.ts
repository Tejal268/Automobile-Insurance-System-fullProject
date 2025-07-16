import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProposalModel } from './models/proposal.model';


@Injectable({ providedIn: 'root' })
export class OfficerService {

  private apiUrl = 'http://localhost:9999/api/proposals';
  private baseUrl = 'http://localhost:9999/api';


  constructor(private http: HttpClient) {}

  getAllProposals(): Observable<ProposalModel[]> {
    return this.http.get<ProposalModel[]>(`${this.apiUrl}/all`);
  }

  approveProposal(proposalId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${proposalId}`, {},{ responseType: 'text' as 'json' });
  }

  rejectProposal(proposalId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject/${proposalId}`, {},{ responseType: 'text' as 'json' });
  }

generateQuote(proposalId: number, quote: any) {
  return this.http.post(`${this.baseUrl}/quotes/generate/${proposalId}`, quote);
}

  deleteProposal(proposalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${proposalId}`);
  }

  getProposalsByStatus(status: string): Observable<ProposalModel[]> {
  return this.http.get<ProposalModel[]>(`http://localhost:9999/api/proposals/status/${status}`);
}
generatePolicy(paymentId: number): Observable<any> {
  return this.http.post(`http://localhost:8080/api/policies/generate/${paymentId}`, {});
}



}
