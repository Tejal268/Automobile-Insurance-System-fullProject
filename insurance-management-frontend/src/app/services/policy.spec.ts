import { TestBed } from '@angular/core/testing';
import { Policy } from '../components/policy/policy';


describe('Policy', () => {
  let service: Policy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Policy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
