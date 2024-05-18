import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MockUserList } from '../../mock/user';
import { UserService } from '../../service/user.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        UserService, 
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
        },
      ]
    })
    .compileComponents();

    userService = TestBed.inject(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of(MockUserList));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the user list', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.userList.length).toBe(MockUserList.length);
    expect(component.userList).toEqual(MockUserList);
  }));

  it('should render the user list', () => {
    fixture.detectChanges(); 
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(MockUserList.length);

    MockUserList.forEach((user, index) => {
        const row = rows[index].nativeElement;
        const cellValues = [
            user.id,
            user.name,
            user.email,
            user.company.name,
            `${user.address.street}, ${user.address.city} ${user.address.zipcode}`
        ];

        cellValues.forEach(value => {
            expect(row.textContent).toContain(value);
        });
    });
  });

  it('should render the search input field', () => {
    const searchInputElement = fixture.debugElement.query(By.css('input[type="search"]'));
    expect(searchInputElement).toBeTruthy();
  });

  it('should filter the user list when searching for a term', fakeAsync(() => {
    const searchTerm = 'Ervin';
    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    tick();

    const filteredUsers = component.userList.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    expect(filteredUsers.length).toBeGreaterThan(0);
  }));
});
