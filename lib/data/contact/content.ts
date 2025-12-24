import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    MapPin,
    Twitter
} from 'lucide-react';

export const CONTACT_INFO = {
  institution: "Daffodil International College, Baburhat",
  address: {
    full: "Baburhat, Chandpur, Bangladesh",
    city: "Chandpur",
    zip: "3600",
    icon: MapPin
  },
  phones: {
    primary: "+880 1670-552881",
    emergency: [
      {
        name: "Prantik Chakrabarty",
        phone: "+880 1670-552881"
      },
      {
        name: "Hasin Sheikh",
        phone: "+880 1538-025457"
      }
    ],
    whatsapp: "+880 1670-552881"
  },
  emails: {
    official: "bloodbank.official@gmail.com",
    support: "sadi.hasanmain@gmail.com"
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/DICBloodBank', icon: Facebook },
    { label: 'Instagram', href: 'https://www.facebook.com/DICBloodBank', icon: Instagram },
    { label: 'Twitter', href: 'https://www.facebook.com/DICBloodBank', icon: Twitter },
    { label: 'LinkedIn', href: 'https://www.facebook.com/DICBloodBank', icon: Linkedin },
  ]
};

export const DEVELOPER_INFO = {
  name: "Sadi",
  role: "Lead Fullstack Architect",
  image: "/Creator-img.png", 
  socials: [
    { label: 'GitHub', href: 'https://github.com/SadiEncoded', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sadiencoded', icon: Linkedin },
    { label: 'facebook', href: 'https://facebook.com/SadiEncoded', icon: Facebook }
  ]
};

export const CONTACT_PAGE_CONTENT = {
  hero: {
    badge: "যোগাযোগ / Contact",
    title: "আমাদের সাথে",
    splitTitle: "যোগাযোগ করুন",
    description: "আপনার মতামত, প্রশ্ন বা পরামর্শ আমাদের সেবাকে আরও উন্নত করতে সাহায্য করবে। জরুরি রক্তদানের প্রয়োজন বা সাধারণ তথ্যের জন্য আমরা সর্বদা আপনার সাথে আছি।"
  },
  info: {
    title: "যোগাযোগের তথ্য",
    description: "জরুরি রক্তদানের প্রয়োজন, সাধারণ জিজ্ঞাসা অথবা সহযোগিতার জন্য নিচের মাধ্যমগুলো ব্যবহার করুন।"
  }
};
