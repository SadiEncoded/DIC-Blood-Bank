import { Facebook, Github, LucideIcon, Mail, MapPin } from 'lucide-react';

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface DeveloperInfo {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  socials: SocialLink[];
}

export interface ContactInfo {
  institution: string;
  address: {
    city: string;
    country: string;
    full: string;
    icon: LucideIcon;
  };
  emails: {
    primary: string;
    official: string;
  };
  phones: {
    primary: string;
    emergency: { name: string; phone: string }[];
  };
  socials: SocialLink[];
}

export const DEVELOPER_INFO: DeveloperInfo = {
  name: "Mahmudul Hasan Sadi",
  role: "Full-Stack Web Developer",
  phone: "01681-279979",
  email: "sadi.hasanmain@gmail.com",
  image: "/Creator-img.png",
  socials: [
    { icon: Facebook, href: "https://www.facebook.com/SadiEncoded", label: "Facebook" },
    { icon: Github, href: "https://github.com/SadiEncoded", label: "GitHub" },
    { icon: Mail, href: "mailto:sadi.hasanmain@gmail.com", label: "Email" }
  ]
};

export const CONTACT_INFO: ContactInfo = {
  institution: "Daffodil International College Blood Bank",
  address: {
    city: "Chandpur",
    country: "Bangladesh",
    full: "Chandpur, Bangladesh",
    icon: MapPin
  },
  emails: {
    primary: "dicbloodbank.official@gmail.com",
    official: "dicbloodbank.official@gmail.com"
  },
  phones: {
    primary: "01670-552881", // Using Dipon's as primary for now or keeping a general one
    emergency: [
      { name: "Dipon", phone: "01670-552881" },
      { name: "Hasin", phone: "01896-120055" }
    ]
  },
  socials: [
    { icon: Facebook, href: "https://www.facebook.com/DICBloodBank", label: "Facebook" },
    { icon: Mail, href: "mailto:dicbloodbank.official@gmail.com", label: "Email" }
  ]
};
