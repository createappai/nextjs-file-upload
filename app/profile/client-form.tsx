"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
export function ClientForm({
  uploadFile,
}: {
  uploadFile: (formData: FormData) => Promise<any>;
}) {
  const { pending } = useFormStatus();
  async function handleFileUpload(formData: FormData) {
    try {
      //todo: client side data validation, file size, type etc
      const data = await uploadFile(formData);
      //todo: inform user of success, etc...
      console.log(data);
    } catch (error) {
      //todo: error display
      console.log(error);
    }
  }
  return (
    <form action={handleFileUpload}>
      <fieldset
        disabled={pending}
        className="flex flex-col gap-2 m-12 border rounded-md p-4"
      >
        <p>Client Form</p>
        <label htmlFor="file">Change Photo</label>
        <input type="file" name="file" id="file" />
        <button type="submit" id="upload" className="h-8  bg-blue-500 w-28">
          Upload file
        </button>
      </fieldset>
    </form>
  );
}
