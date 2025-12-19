import { Clock, Droplet, Shield, Users } from 'lucide-react';
import { ColorThemeKey } from '../constants';

export interface InfoItem {
  icon: any;
  text: string;
}

export interface InfoSection {
  title: string;
  items: InfoItem[];
  colorTheme: ColorThemeKey;
}

export const WHY_DONATE: InfoSection = {
  title: 'কেন রক্তদান করবেন?',
  colorTheme: 'rose',
  items: [
    {
      icon: Droplet,
      text: 'প্রথম এবর প্রধান কারণ, আপনার দানকৃত রক্ত একজন মানুষের জীবন বাঁচবে। রক্তদানের জন্য এর থেকে বড় কারণ আর কি হতে পারে!'
    },
    {
      icon: Shield,
      text: 'হৃদরোগ একলিপ্স আপনার নিজের প্রয়োজনে/ বিপদে জন্য কেউ এগিয়ে আসবে।'
    },
    {
      icon: Users,
      text: 'নিয়মিতভাবেদানে হার্টরোগ ও চাই অ্যাটাকের ঝুঁকি অনেক কম।'
    }
  ]
};

export const WHO_CAN_DONATE: InfoSection = {
  title: 'কারা রক্তদান করতে পারবেন?',
  colorTheme: 'blue',
  items: [
    {
      icon: Clock,
      text: '১৮ বছর থেকে ৬০ বছরের যেকোনো সুস্থদেহের মানুষ রক্ত দান করতে পারবেন।'
    },
    {
      icon: Shield,
      text: 'শারীরিক এবং মানসিক ভাবে সুস্থ নিরোগ ব্যক্তি রক্ত দিতে পারবেন।'
    },
    {
      icon: Users,
      text: 'আপনার ওজন অন্তত ৫০ কিলোগ্রাম কিংবা তার বেশি হতে হবে।'
    },
    {
      icon: Droplet,
      text: 'চার (৪) মাস অন্তর অন্তর রক্তদান করা যায়।'
    }
  ]
};

export const MISCONCEPTIONS: InfoSection = {
  title: 'কিছু ভুল ধারনা',
  colorTheme: 'purple',
  items: [
    {
      icon: Shield,
      text: 'রক্ত দান করার সময় মোটেও ব্যথা লাগে না। শুধুমাত্র সূচ ফোটানোর সময় অল্প একটু অস্বস্তি লাগে।'
    },
    {
      icon: Droplet,
      text: 'রক্তদানের পর স্বাস্থ্য খারাপ হয়ে যাবে – এটি ভুল ধারণা। আসলে রক্তদান করলে হৃদরোগের ঝুঁকি কমে এবং দেহে মাত্রাতিরিক্ত আয়রন বা লৌহ সঞ্চয় প্রতিরোধ করে।'
    },
    {
      icon: Users,
      text: 'ডায়াবেটিসে আক্রান্ত ব্যক্তি রক্ত দিতে পারবে না – এটিও ভুল ধারণা। স্বাস্থ্য পরীক্ষায় যোগ্য বিবেচিত হলে…'
    }
  ]
};
