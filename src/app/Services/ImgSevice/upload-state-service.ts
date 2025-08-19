// shared/upload-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadStateService {
  private images: File[] = [];

  setImages(files: File[]) {
    this.images = files;
  }

  getImages(): File[] {
    return this.images;
  }
}
