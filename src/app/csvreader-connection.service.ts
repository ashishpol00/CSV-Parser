import { Injectable } from '@angular/core';
import { CSVParser } from './HelperClass/CSVParser';
import { FileInput } from './HelperClass/FileInput';
import { DocumentTextResult } from './HelperClass/DocumentTextResult';

@Injectable({
    providedIn: 'root'
})
export class CSVReaderConnectionService {
    objParser: CSVParser;
    constructor() {
        this.objParser = new CSVParser();
    }
    async connectingFunction(objFileInput: FileInput): Promise<DocumentTextResult> {
        return this.objParser.ReadFile(objFileInput) as Promise<DocumentTextResult>;
    }
}
