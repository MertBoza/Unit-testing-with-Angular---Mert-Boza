import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../component/button/button.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name, email, phone, and comment inputs', () => {
    const nameInput = fixture.debugElement.query(By.css('input#name'));
    const emailInput = fixture.debugElement.query(By.css('input#email'));
    const phoneInput = fixture.debugElement.query(By.css('input#phone'));
    const commentInput = fixture.debugElement.query(By.css('textarea#comment'));

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(commentInput).toBeTruthy();
  });

  it('should disable the button when the form is invalid', () => {
    const buttonElement = fixture.debugElement.query(By.css('app-button button'));

    expect(buttonElement.nativeElement.disabled).toBeTruthy();

    component.contactForm.get('name')!.setValue('');
    component.contactForm.get('email')!.setValue('');
    component.contactForm.get('phone')!.setValue('');
    component.contactForm.get('comment')!.setValue('');

    fixture.detectChanges();

    expect(buttonElement.nativeElement.disabled).toBeTruthy();

    component.contactForm.get('name')!.setValue('John Doe');
    component.contactForm.get('email')!.setValue('john.doe@example.com');
    component.contactForm.get('phone')!.setValue('1234567890');
    component.contactForm.get('comment')!.setValue('This is a comment.');

    fixture.detectChanges();

    expect(buttonElement.nativeElement.disabled).toBeFalsy();
  });
});
