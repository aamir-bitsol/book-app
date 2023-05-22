import { Injectable } from '@nestjs/common';
import { FileFilterCallback } from 'multer';
import { Request } from 'express';

@Injectable()
export class FileUploadValidator {
  private readonly allowedFileTypes = ['image/jpeg', 'image/png'];
  private readonly maxFileSizeInBytes = 3 * 1024 * 1024; // 3MB

  validateFileType(file: Express.Multer.File, callback: FileFilterCallback): void {
    const isValidType = this.allowedFileTypes.includes(file.mimetype);
    if (isValidType) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'));
    }
  }

  validateFileSize(req: Request, file: Express.Multer.File, callback: FileFilterCallback): void {
    if (file.size <= this.maxFileSizeInBytes) {
      callback(null, true);
    } else {
      callback(new Error('File size exceeds the maximum limit'));
    }
  }
}