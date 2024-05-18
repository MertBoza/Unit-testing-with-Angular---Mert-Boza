import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { MockUserList } from '../mock/user';
import { API_URL } from '../util/constant';
import { User } from '../interface/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch the user list', fakeAsync(() => {
    const testData = MockUserList;

    service.getUsers().subscribe(users => {
      expect(users).toEqual(testData);
    });

    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);

    tick();
  }));

  it('should create a user', fakeAsync(() => {
    const testUser: User = {
      id: 3,
      name: 'Patrick Dubois',
      email: 'PatrickDubois@teleworm.us',
      company: { name: 'The Independent Planners', catchPhrase: 'Lorem ipsum', bs: 'Lorem ipsum' },
      address: { street: '3968 Parkway Street', suite: 'Apt 101', city: 'New York City', zipcode: '92398', geo: { lat: '0', lng: '0' } },
      phone: '123-456-7890',
      website: 'website.com'
    };

    service.createUser(testUser).subscribe(user => {
      expect(user).toEqual(testUser);
    });

    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('POST');
    req.flush(testUser);

    tick();
  }));
});
