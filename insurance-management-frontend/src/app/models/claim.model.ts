export interface ClaimModel {
  id: number;
  claimNumber: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  claimDate: string;
  proofDocumentPath?: string;
  policy: {
    id: number;
    policyNumber: string;
    
  };
}
