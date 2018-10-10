import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryproductComponent } from './tryproduct.component';

describe('TryproductComponent', () => {
  let component: TryproductComponent;
  let fixture: ComponentFixture<TryproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
