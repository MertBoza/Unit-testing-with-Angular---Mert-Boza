import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component'; // Import ButtonComponent

@Component({
  template: `<app-button [type]="type" [variant]="variant" [disabled]="disabled">{{content}}</app-button>`
})
class TestHostComponent {
  type: 'button' | 'submit' = 'button';
  variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  disabled = false;
  content = 'Click me!';
}

describe('ButtonComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent], // Declare TestHostComponent only
      imports: [ButtonComponent] // Import ButtonComponent
    })
    .compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    const buttonComponent = hostFixture.debugElement.query(By.directive(ButtonComponent));
    expect(buttonComponent).toBeTruthy();
  });

  it('should render the correct type', () => {
    const buttonTypes: ('button' | 'submit')[] = ['button', 'submit'];
    buttonTypes.forEach(type => {
      hostComponent.type = type;
      hostFixture.detectChanges();
      const buttonElement = hostFixture.nativeElement.querySelector('button');
      expect(buttonElement.getAttribute('type')).toBe(type);
    });
  });

  it('should render the correct variant', () => {
    const variants = [
      { name: 'primary', expectedClasses: ['bg-primary-500', 'hover:bg-primary-800'] },
      { name: 'secondary', expectedClasses: ['bg-secondary-500', 'hover:bg-secondary-800'] },
      { name: 'success', expectedClasses: ['bg-success-500', 'hover:bg-success-800'] },
      { name: 'danger', expectedClasses: ['bg-danger-500', 'hover:bg-danger-800'] }
    ];

    variants.forEach(variant => {
      hostComponent.variant = variant.name as 'primary' | 'secondary' | 'success' | 'danger';
      hostFixture.detectChanges();
      const buttonElement = hostFixture.nativeElement.querySelector('button');
      variant.expectedClasses.forEach(expectedClass => {
        expect(buttonElement.classList.contains(expectedClass)).toBe(true, `Variant ${variant.name} should have class ${expectedClass}`);
      });
    });
  });

  it('should render the correct content', () => {
    const content = 'Click me!';
    hostComponent.content = content;
    hostFixture.detectChanges();
    const buttonElement = hostFixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toBe(content);
  });
});
