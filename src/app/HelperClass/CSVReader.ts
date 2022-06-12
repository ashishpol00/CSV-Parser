import { FileInput } from "./FileInput";
import { DocumentTextResult } from "./DocumentTextResult";

//Interface to implement
export interface CSVReader {
    ReadFile(fileToParse: FileInput): Promise<DocumentTextResult>;
}