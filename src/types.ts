export type Flat = {
  name: string;
  price: string;
  location: string;
  imgUrls: string[];
};

export type FlatDb = Omit<Flat, 'imgUrls'> & { id: string; images: string };
