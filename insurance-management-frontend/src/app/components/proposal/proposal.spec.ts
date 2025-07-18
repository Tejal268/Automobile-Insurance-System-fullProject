import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalComponent } from './proposal';

describe('Proposal', () => {
  let component: ProposalComponent;
  let fixture: ComponentFixture<ProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
