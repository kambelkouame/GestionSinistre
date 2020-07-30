import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarerComponent } from './declarer.component';

describe('DeclarerComponent', () => {
  let component: DeclarerComponent;
  let fixture: ComponentFixture<DeclarerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
