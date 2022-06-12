//Input
export class FileInput {
    FileName: string;
    FileSize: string; // CREATED BY US
    FileLastModifiedDate: string; // CREATED BY US
    FileContent: Uint8Array; // File content after performing readAsArrayBuffer
    FileType: string; //mimetype of file
    File: File; // CREATED BY US // Actual file.
}