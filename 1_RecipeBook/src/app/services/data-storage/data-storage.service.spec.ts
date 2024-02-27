import { TestBed } from '@angular/core/testing';

import { DataStorageService } from './data-storage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataStorageService', () => {
  let service: DataStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
