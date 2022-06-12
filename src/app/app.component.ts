import { Component } from '@angular/core';
import { CSVReaderConnectionService } from './csvreader-connection.service';
import { DocumentTextResult } from './HelperClass/DocumentTextResult';
import { FileInput } from './HelperClass/FileInput';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    parsedCSVObject: Promise<DocumentTextResult>;
    constructor(private connector: CSVReaderConnectionService) { }
    async sendCSVFile(event: any) {
        let file = event.target.files[0];
        let reader: FileReader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
            // FileInput object creation:
            let objFileInput: FileInput = {
                FileName: file['name'],
                FileSize: file['size'], // in bytes
                FileLastModifiedDate: file['lastModifiedDate'], // TimeStamp
                FileContent: new Uint8Array(reader.result as ArrayBuffer),
                FileType: file['type'],
                File: file,
            }
            this.parsedCSVObject = this.connector.connectingFunction(objFileInput);
            if ((await this.parsedCSVObject).ActualText == null) {
                console.log('\nActualText:', null, '\n\n');
            }
            else {
                console.log('\nActualText:\n\n' + (await this.parsedCSVObject).ActualText, '\n\n');
            }
            console.log(
                '\n' +
                'ContentType: ' + (await this.parsedCSVObject).ContentType
                + '\n' +
                'Metadata: ' + (await this.parsedCSVObject).Metadata
                + '\n' +
                'Error_Code: ' + (await this.parsedCSVObject).Error_Code
                + '\n' +
                'Error_Message: ' + (await this.parsedCSVObject).Error_Message
                + '\n' +
                '\n'
            );
        }
    }
}

// last in onload:
// console.log('\n');
// console.log('\n');
// // console.log(parsedCSVObject); // temp
// console.log('  ContentType:', (await parsedCSVObject).ContentType);
// console.log('   ActualText:', (await parsedCSVObject).ActualText);
// console.log('     Metadata:', (await parsedCSVObject).Metadata);
// console.log('   Error_Code:', (await parsedCSVObject).Error_Code);
// console.log('Error_Message:', (await parsedCSVObject).Error_Message);
// console.log('\n');
// console.log('\n');