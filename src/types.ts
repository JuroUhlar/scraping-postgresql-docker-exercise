export type Flat = {
  name: string;
  price: string;
  location: string;
  imgUrls: string[];
};

export type FlatDb = Flat & { id: string };
