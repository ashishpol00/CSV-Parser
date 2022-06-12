import { DocumentTextResult } from "./DocumentTextResult"
import { FileInput } from "./FileInput";
import { CSVReader } from "./CSVReader";
import * as Collections from 'typescript-collections';
import { NgxCsvParser, NgxCSVParserError } from "ngx-csv-parser";

export class CSVParser implements CSVReader {
    csvRecords: any;
    csvRecordsInString: string;
    header: boolean;
    parsedDocumentTextResult: DocumentTextResult;
    private ngxCsvParser: NgxCsvParser;
    constructor() {
        this.ngxCsvParser = new NgxCsvParser();
    }
    async ReadFile(fileToParse: FileInput): Promise<DocumentTextResult> {
        return new Promise(
            async resolve => {
                // MetaData creation:
                let metadataDictionary: Collections.Dictionary<string, string> = new Collections.Dictionary<string, string>();
                metadataDictionary.setValue('name', fileToParse.FileName);
                metadataDictionary.setValue('extension', fileToParse.FileName.split('.').pop() as string);
                metadataDictionary.setValue('size', fileToParse.FileSize);
                metadataDictionary.setValue('lastModifiedDate', fileToParse.FileLastModifiedDate);
                metadataDictionary.setValue('type', fileToParse.FileType);

                // Parsing CSV:
                let temp = this.ngxCsvParser.parse(
                    fileToParse.File, { header: false, delimiter: ',' }
                ).pipe().subscribe({
                    next: (result): void => {
                        this.csvRecords = result;
                        console.log(result);
                        this.csvRecordsInString = this.csvRecords.map((e: any) => e.join(' ')).join(' ');
                        this.parsedDocumentTextResult = {
                            ContentType: fileToParse.FileType,
                            ActualText: this.csvRecordsInString,
                            Metadata: metadataDictionary,
                            Error_Code: 0,
                            Error_Message: 'File is parsed successfully.'
                        }
                        // Returning DocumentTextResult object:
                        resolve(this.parsedDocumentTextResult);
                    },
                    error: (error: NgxCSVParserError): void => {
                        this.parsedDocumentTextResult = {
                            ContentType: fileToParse.FileType,
                            ActualText: null,
                            Metadata: metadataDictionary,
                            Error_Code: error.code,
                            Error_Message: error.message
                        }
                        // Returning DocumentTextResult object:
                        resolve(this.parsedDocumentTextResult);
                    }
                });
                // console.log(temp);
            }
        )
    }
}