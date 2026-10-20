// Đường dẫn tuyệt đối (/images/...) để ảnh vẫn đúng khi URL là /<code>/ có dấu / cuối.
export const asset = (path: string) => (/^(https?:|data:|\/)/.test(path) ? path : import.meta.env.BASE_URL + path)
