import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
