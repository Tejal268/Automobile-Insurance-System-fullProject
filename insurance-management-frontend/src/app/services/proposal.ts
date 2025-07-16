import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProposalModel } from '../models/proposal.model';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private readonly baseUrl = 'http://localhost:9999/api/proposals';

  constructor(private http: HttpClient) {}

 
  createProposal(proposal: ProposalModel, userId: number): Observable<ProposalModel> {
    return this.http.post<ProposalModel>(`${this.baseUrl}/submit/${userId}`, proposal);
  }

  
  //Get proposals for logged-in user

  getUserProposals(userId: number): Observable<ProposalModel[]> {
    return this.http.get<ProposalModel[]>(`${this.baseUrl}/user/${userId}`);
  }

  
  //Get all proposals 
  
  getAllProposals(): Observable<ProposalModel[]> {
    return this.http.get<ProposalModel[]>(`${this.baseUrl}/all`);
  }

   deleteProposal(proposalId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${proposalId}`, { responseType: 'text' });
  }
  uploadDocument(proposalId: number, formData: FormData) {
  return this.http.post(`${this.baseUrl}/${proposalId}/uploadDocument`, formData,{ responseType: 'text'});
}

 // If needed in future (but you're using PaymentService for this now)
  getQuoteByProposalId(proposalId: number): Observable<any> {
    return this.http.get(`http://localhost:9999/api/quotes/proposal/${proposalId}`);
  }

}
