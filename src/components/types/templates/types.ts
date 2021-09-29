export interface Template {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  code: Code;
}

export interface Code {
  gallery: string;
  item: string;
  css: string;
}
