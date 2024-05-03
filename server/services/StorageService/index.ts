import { fileStorageProvider } from './FileStorageProvider'

export async function fileUploadFile(fileBlob: Blob, relativeFilePath: string) {
  return fileStorageProvider().upload(fileBlob, relativeFilePath)
}
