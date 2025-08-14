export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IUpdateCategory {
  name?: string;
  description?: string;
}
