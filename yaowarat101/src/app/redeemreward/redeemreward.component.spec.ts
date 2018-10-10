import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemrewardComponent } from './redeemreward.component';

describe('RedeemrewardComponent', () => {
  let component: RedeemrewardComponent;
  let fixture: ComponentFixture<RedeemrewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemrewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemrewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
