import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProposalService } from './proposal';
 // ✅ Correct import

describe('ProposalService', () => {
  let service: ProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // ✅ Add HttpClientTestingModule
      providers: [ProposalService]
    });
    service = TestBed.inject(ProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
