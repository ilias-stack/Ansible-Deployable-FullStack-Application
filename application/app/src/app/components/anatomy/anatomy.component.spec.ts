import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomyComponent } from './anatomy.component';

describe('AnatomyComponent', () => {
  let component: AnatomyComponent;
  let fixture: ComponentFixture<AnatomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnatomyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnatomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
