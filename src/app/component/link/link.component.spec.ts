import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LinkComponent } from './link.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `<app-link [link]="link" [type]="type">{{content}}</app-link>`
})
class TestHostComponent {
  link: string = '/home';
  type: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  content = 'Click here!';
}

describe('LinkComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [RouterTestingModule, LinkComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get(): number {
                  return 6;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    const linkComponent = hostFixture.debugElement.query(By.directive(LinkComponent));
    expect(linkComponent).toBeTruthy();
  });

  it('should render the correct link', () => {
    const link = '/home';
    hostComponent.link = link;
    hostFixture.detectChanges();
    const linkElement = hostFixture.nativeElement.querySelector('a');
    expect(linkElement.getAttribute('href')).toBe(link);
  });

  it('should render the correct type', () => {
    const types = [
      { name: 'primary', expectedClasses: ['bg-primary-500', 'hover:bg-primary-800'] },
      { name: 'secondary', expectedClasses: ['bg-secondary-500', 'hover:bg-secondary-800'] },
      { name: 'success', expectedClasses: ['bg-success-500', 'hover:bg-success-800'] },
      { name: 'danger', expectedClasses: ['bg-danger-500', 'hover:bg-danger-800'] }
    ];

    types.forEach(type => {
      hostComponent.type = type.name as 'primary' | 'secondary' | 'success' | 'danger';
      hostFixture.detectChanges();
      const linkElement = hostFixture.nativeElement.querySelector('a');
      type.expectedClasses.forEach(expectedClass => {
        expect(linkElement.classList.contains(expectedClass)).toBe(true, `Type ${type.name} should have class ${expectedClass}`);
      });
    });
  });

  it('should render the correct content', () => {
    const content = 'Click here!';
    hostComponent.content = content;
    hostFixture.detectChanges();
    const linkElement = hostFixture.nativeElement.querySelector('a');
    expect(linkElement.textContent.trim()).toBe(content);
  });
});
