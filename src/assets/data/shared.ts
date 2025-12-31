import { Activity, BookOpen, Calendar, ClipboardPlus, Heart, Home, Info, Mail, Search, ShieldCheck, Users } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search Donor', href: '/donors', icon: Search },
  { label: 'Donate', href: '/donate', icon: Heart },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Contact', href: '/contact', icon: Mail }
];

export const LOGO_SRC = "/blood-bank-logo.png";

export const HEADER_CONTENT = {
  cta: "Become a Donor",
  mobileCta: "Sign Up Now"
};

export const events = [
  {
    title: 'Grand Blood Drive 2024',
    bangla: 'বিশাল রক্তদান কর্মসূচি ২০২৪',
    date: 'Dec 25, 2024',
    location: 'DIC Campus Grounds',
    description: 'Join us for our biggest annual donation event. Free health checkups included!',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80',
    category: 'Main Event'
  },
  {
    title: 'Donor Awareness Seminar',
    bangla: 'রক্তদাতা সচেতনতা সেমিনার',
    date: 'Jan 10, 2025',
    location: 'College Auditorium',
    description: 'Learn about the science of blood donation and debunk common myths.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    category: 'Educational'
  },
];

export const DONATE_PAGE_CONTENT = {
  badge: "রক্তদান করুন / Donate Blood",
  title: "জরুরি জীবনের",
  splitTitle: "ডাক শুনুন",
  description: "আপনার সামান্য রক্ত কারো অমূল্য জীবন বাঁচাতে পারে। নিচের জরুরি অনুরোধগুলো দেখুন এবং আপনার সাধ্যমতো জীবন বাঁচাতে এগিয়ে আসুন।",
  chips: [
    { icon: ClipboardPlus, label: "Active Requests" },
    { icon: ShieldCheck, label: "Verified Needs" },
    { icon: Activity, label: "Save Lives" },
  ]
};
