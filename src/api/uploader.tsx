export async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_PRESET);
  return fetch(import.meta.env.VITE_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}

// 소영 클라우디너리
export async function uploadCloudImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "thdud_preset");

  const cloudName = import.meta.env.VITE_APP_ClOUDINARY_NAME;
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const json = await res.json();
  return json.secure_url;
}
