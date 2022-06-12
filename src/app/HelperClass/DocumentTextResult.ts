import { Result } from "./Result";
import * as Collections from 'typescript-collections';

export class DocumentTextResult extends Result {
    ContentType: string; //fileMimeType
    ActualText: string | null;  //Extracted text from the file after parsing
    Metadata: Collections.Dictionary<string, string>; // eg. name: "samplefile1", extension: ".json" | //For Collections you can use "typescript-collections" library;
}