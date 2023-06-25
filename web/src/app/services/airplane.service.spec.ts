import { TestBed } from '@angular/core/testing';

import { AirplaneService } from './airplane.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AirplaneService', () => {
  let service: AirplaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(AirplaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
