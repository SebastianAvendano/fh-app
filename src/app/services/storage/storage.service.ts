import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(
    path: string,
    file: File | undefined
  ): Promise<string | null> {
    const filePath = `${path}/${file?.name}`;
    const task: AngularFireUploadTask = this.storage.upload(filePath, file);
    try {
      return task.then(async (data) => data.ref.getDownloadURL());
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  deleteImageStorage(path: string, nameFile: string) {
    const storage = getStorage();
    const desertRef = ref(storage, `${path}/${nameFile}`);
    deleteObject(desertRef);
  }
}
