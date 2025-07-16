import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicyModel } from '../models/policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private baseUrl = 'http://localhost:9999/api/policies';

  constructor(private http: HttpClient) {}

  generatePolicyByPaymentId(paymentId: number): Observable<any> {
    const url = `${this.baseUrl}/generate/${paymentId}`;
    return this.http.post(url, {});  
  }

  uploadDocumentToPolicy(policyId: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/upload-doc/${policyId}`, formData);
}
 
  getPolicies(): Observable<PolicyModel[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<PolicyModel[]>(`${this.baseUrl}`, { headers });
  }
 getPolicies2(userId:number): Observable<PolicyModel[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<PolicyModel[]>(`${this.baseUrl}`, { headers });
  }


  downloadPolicyPdf(policyId: number): Observable<Blob> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.baseUrl}/download-pdf/${policyId}`, {
      headers,
      responseType: 'blob'
    });
  }

  generatePolicyWithDocument(formData: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/generate-with-doc`, formData);
}

  //Utility to create auth headers.
   
  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
