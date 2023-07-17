"use client";

export function ClientForm({
  uploadFile,
}: {
  uploadFile: (formData: FormData) => Promise<any>;
}) {
  async function handleFileUpload(formData: FormData) {
    try {
      const data = await uploadFile(formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form action={handleFileUpload}>
      <div className="flex flex-col gap-2 m-12 border rounded-md p-4">
        <p>Client Form</p>
        <label htmlFor="file">Change Photo</label>
        <input type="file" name="file" id="file" />
        <button type="submit" id="upload" className="h-8  bg-blue-500 w-28">
          Upload file
        </button>
      </div>
    </form>
  );
}
