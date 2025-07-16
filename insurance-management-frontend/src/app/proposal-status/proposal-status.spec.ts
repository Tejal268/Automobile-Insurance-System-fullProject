import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalStatus } from './proposal-status';

describe('ProposalStatus', () => {
  let component: ProposalStatus;
  let fixture: ComponentFixture<ProposalStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProposalStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
