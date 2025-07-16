import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClaimModel } from './models/claim.model';


@Injectable({ providedIn: 'root' })
export class ClaimService {
  private baseUrl = '/api/claims';

  constructor(private http: HttpClient) {}

fileClaim(userId: number, policyId: number, reason: string, proofDocument: File): Observable<any> {
  const formData = new FormData();
  formData.append('userId', userId.toString());
  formData.append('policyId', policyId.toString());
  formData.append('reason', reason);
  formData.append('proofDocument', proofDocument);  // Attach file

  return this.http.post<any>(
    `http://localhost:9999/api/claims/file`,
    formData
  );
}



getUserClaims(userId: number): Observable<ClaimModel[]> {
  return this.http.get<ClaimModel[]>(`http://localhost:9999/api/claims/user/${userId}`);
}

 private baseUrl2 = 'http://localhost:9999/api/claims';

  getPendingClaims(): Observable<ClaimModel[]> {
  const params = new HttpParams().set('status', 'PENDING');
  return this.http.get<ClaimModel[]>(`${this.baseUrl2}/status`, { params });
}


  updateClaimStatus(claimId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl2}/${claimId}/status`, { status });
  }

}
