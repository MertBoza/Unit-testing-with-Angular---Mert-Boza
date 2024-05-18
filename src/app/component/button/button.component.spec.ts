import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct type', () => {
    const buttonTypes: ('button' | 'submit')[] = ['button', 'submit'];
    buttonTypes.forEach(type => {
      component.type = type;
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.getAttribute('type')).toBe(type);
    });
  });

  it('should render the correct variant', () => {
    const variants = [
      { name: 'primary', expectedClass: 'bg-primary-500' },
      { name: 'secondary', expectedClass: 'bg-secondary-500' },
      { name: 'success', expectedClass: 'bg-success-500' },
      { name: 'danger', expectedClass: 'bg-danger-500' }
    ];

    variants.forEach(variant => {
      component.variant = variant.name as 'primary' | 'secondary' | 'success' | 'danger';
      fixture.detectChanges();
      const buttonElement = fixture.nativeElement.querySelector('button');
      expect(buttonElement.classList.contains(variant.expectedClass)).toBe(true, `Variant ${variant.name} should have class ${variant.expectedClass}`);
    });
  });

  it('should render the correct content', () => {
    const content = 'Click me!';
    fixture.nativeElement.querySelector('button').innerHTML = content;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toBe(content);
  });
});
