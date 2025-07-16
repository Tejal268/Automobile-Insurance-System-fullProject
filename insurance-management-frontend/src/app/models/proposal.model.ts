export class ProposalModel {

    id?: number;
  vehicleNumber: string = '';
  vehicleType: string = '';
  registrationDate: string = '';
  status?: string;
  userId?: number;

  
  documentName?: string;
  documentType?: string;
  documentData?: any;

   paymentId?: number;  // ADD THIS
}
