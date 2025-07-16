import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerPolicyList } from './officer-policy-list';

describe('OfficerPolicyList', () => {
  let component: OfficerPolicyList;
  let fixture: ComponentFixture<OfficerPolicyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficerPolicyList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerPolicyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
