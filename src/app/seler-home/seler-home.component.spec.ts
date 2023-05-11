import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelerHomeComponent } from './seler-home.component';

describe('SelerHomeComponent', () => {
  let component: SelerHomeComponent;
  let fixture: ComponentFixture<SelerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
