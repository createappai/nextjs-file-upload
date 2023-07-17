import path from "path";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { ClientForm } from "@/app/profile/client-form";
const item = {
  first: "Homer",
  last: "Simpson",
  email: "homer.simpson@sfnpp.com",
  title: "Nuclear Safety Inspector",
  photo: "donut.jpg",
};
async function uploadFile(formData: FormData) {
  "use server";
  const file = formData.get("file") as File;
  //console.log("File name:", file.name, "size:", file.size);
  if (file.size) {
    const fileName = file?.name;
    const extension = fileName?.split(".").pop();
    let imageName = `${Date.now()}.${extension ?? "jpg"}`; // file.name;
    item.photo = imageName;
    const imagePath = path.join(`./public/uploads/`, imageName);
    const imageStream = fs.createWriteStream(imagePath);
    imageStream.write(Buffer.from(await file.arrayBuffer()));
    imageStream.end();
  }
  revalidatePath("/profile");
  //   return {
  //     success: true,
  //     item,
  //   };
}
async function getData() {
  return item;
}
export default async function ProfilePage() {
  const data = await getData();
  return (
    <>
      <div className="flex flex-row flex-nowrap p-12 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl ">{`${data?.first} ${data.last}`}</h1>
          <h2 className="text-base ">{data?.email}</h2>
          <div className="text-sm ">{data?.title}</div>
        </div>
        <img
          src={`/uploads/${data?.photo}`}
          alt={data?.first}
          className="w-48 "
        />
      </div>
      <form action={uploadFile}>
        <div className="flex flex-col gap-2 m-12 border rounded-md p-4">
          <label htmlFor="file">Change Photo</label>
          <input type="file" name="file" id="file" />
          <button type="submit" id="upload" className="h-8  bg-blue-500 w-28">
            Upload file
          </button>
        </div>
      </form>
      {/* <ClientForm uploadFile={uploadFile} /> */}
    </>
  );
}
