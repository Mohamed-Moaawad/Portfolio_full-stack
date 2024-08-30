import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpYearsComponent } from './exp-years.component';

describe('ExpYearsComponent', () => {
  let component: ExpYearsComponent;
  let fixture: ComponentFixture<ExpYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpYearsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
