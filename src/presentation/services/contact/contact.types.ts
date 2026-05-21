export type ContactBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type ContactLocation = {
  title: string;
  subtitle: string;
  mapSrc: string;
  locationName: string;
  phone: string;
  email: string;
  facebookUrl: string;
};

export type ContactPageData = {
  banner: ContactBanner;
  location: ContactLocation;
};
