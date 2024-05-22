export class FileUpload {
  constructor(url?: string, file?: File, extension?: string, name?: string) {
    (this.url = url), (this.file = file), (this.extension = extension);
    this.name = name;
  }
  public name?: string;
  public url: string | undefined;
  public extension: string | undefined;
  public file: File | undefined;
}
