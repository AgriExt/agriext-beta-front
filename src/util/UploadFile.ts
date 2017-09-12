export class UploadFile {
    
    private file;

    constructor() {
        this.file = new FileReader();
    }
    
    read(file, events):void {
        events.forEach((event) => {
            this.file.addEventListener(event.event, event.callback.bind(this.file));
        });
        this.file.readAsText(file);
    }
}