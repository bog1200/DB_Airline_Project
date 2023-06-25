import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(CountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
