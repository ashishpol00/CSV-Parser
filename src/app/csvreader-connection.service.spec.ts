import { TestBed } from '@angular/core/testing';

import { CSVReaderConnectionService } from './csvreader-connection.service';

describe('CSVReaderConnectionService', () => {
  let service: CSVReaderConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSVReaderConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
