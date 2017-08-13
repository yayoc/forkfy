export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: any;
  total: number;
}

export interface Image {
  height?: any;
  url: string;
  width?: any;
}

export interface Me {
  birthdate: string;
  country: string;
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}
