import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeteComponent } from './rejete.component';

describe('RejeteComponent', () => {
  let component: RejeteComponent;
  let fixture: ComponentFixture<RejeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
