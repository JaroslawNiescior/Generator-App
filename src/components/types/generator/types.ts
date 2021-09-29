export interface Item {
  id: number;
  name: string;
  adress: string;
}

export interface MultipleItems {
  name: string;
  adress: string;
  start: number;
  end: number;
  ext: string;
}

export interface CodeObject{
  html: string;
  css: string;
};
