import { TestBed } from '@angular/core/testing';

import { AirportService } from './airport.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AirportService', () => {
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(AirportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
