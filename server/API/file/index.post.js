import fs from 'fs'
import path from 'path'
import { fileUploadFile } from '../../services/StorageService'
export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event)
    const uploadedFilePaths = []

    await files?.forEach(async (file) => {
      const filePath = path.join(process.cwd(), 'public', file.filename)
      fs.writeFileSync(filePath, file.data)
      await fileUploadFile(file.data, file.filename)
      uploadedFilePaths.push(`/${file.filename}`)
    })

    return uploadedFilePaths
  } catch (error) {
    console.log({
      error,
    })
  }
})
