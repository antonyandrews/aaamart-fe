/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleServiceService } from './google-service.service';

describe('Service: GoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleServiceService]
    });
  });

  it('should ...', inject([GoogleServiceService], (service: GoogleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
