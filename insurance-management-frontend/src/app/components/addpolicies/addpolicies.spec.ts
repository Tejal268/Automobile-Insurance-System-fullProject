import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addpolicies } from './addpolicies';

describe('Addpolicies', () => {
  let component: Addpolicies;
  let fixture: ComponentFixture<Addpolicies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addpolicies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addpolicies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
