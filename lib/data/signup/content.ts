import { ShieldCheck, Users2, Zap } from "lucide-react";

export const SIGNUP_PAGE_CONTENT = {
  hero: {
    badge: "নিবন্ধন করুন / Sign Up",
    title: "জীবন বাঁচাতে",
    splitTitle: "আজই যুক্ত হন!",
    description: "আপনার অপ্রত্যাশিত সাহায্য হতে পারে কোনো মানুষের জীবনে নতুন আলো। তাই কারও স্মৃতিতে অমর হয়ে থাকতে যুক্ত হন আমাদের কমিউনিটিতে। মানবতার ডাকে সাড়া দিন।",
    chips: [
      { icon: Zap, label: "Quick Sign Up" },
      { icon: Users2, label: "Active Donors" },
      { icon: ShieldCheck, label: "Verified & Trusted" },
    ]
  },
  footer: {
    text: "Already have an account?",
    cta: "Log In"
  }
};
