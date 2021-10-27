export type FileUploadProps = {
    onUpload(files: File): void
    onRemove(): void
    value: File | undefined
}
