import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Droplet,
    Heart,
    Shield,
    Users
} from 'lucide-react';

// Maps string names back to Lucide components for usage in the UI
export const ICON_MAP: Record<string, any> = {
  Heart,
  CheckCircle2,
  AlertCircle,
  Droplet,
  Shield,
  Clock,
  };

export const LEARN_HERO_CONTENT = {
  badge: "স্বাস্থ্য ও সচেতনতা / Health & Awareness",
  title: "জ্ঞান ও",
  splitTitle: "সচেতনতা",
  description: "রক্তদান সম্পর্কে সঠিক তথ্য এবং স্বাস্থ্য বিষয়ক প্রবন্ধসমূহ পড়ে আপনার সংশয় দূর করুন। বিজ্ঞানসম্মত তথ্য জানুন এবং জীবন বাঁচানোর মহান কাজে এগিয়ে আসুন।",
  chips: [
    { icon: Droplet, label: "জীবন রক্ষা" },
    { icon: Shield, label: "স্বাস্থ্য সুরক্ষা" },
    { icon: Users, label: "সমাজসেবা" }
  ]
};

export interface BlogParagraph {
  type: 'text' | 'list' | 'highlight';
  heading?: string;
  body: string | string[];
}

export interface LearnArticle {
  id?: string;
  title: string;
  headline: string;
  description: string;
  image_url: string;
  category: string;
  color_theme: 'rose' | 'blue' | 'purple';
  icon: string;
  read_time: string;
  display_date: string;
  key_points: {
    icon: string;
    text: string;
  }[];
  creator?: {
    name: string;
    role: string;
    avatar?: string;
  };
  is_active?: boolean;
  
  // Full Article Content
  full_content?: {
    introduction: string;
    sections: {
      sectionTitle: string;
      content: BlogParagraph[];
    }[];
    conclusion: string;
  }
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: 'benefits-of-donation',
    title: 'কেন রক্তদান করবেন?',
    headline: 'স্বাস্থ্য ও জীবন',
    display_date: '২৪ ডিসেম্বর, ২০২৫',
    read_time: '৫ মিনিট পড়ুন',
    description: 'রক্তদান শুধু অন্যের উপকার নয়, নিজের স্বাস্থ্যের জন্যও অত্যন্ত উপকারী। বিশ্ব স্বাস্থ্য সংস্থা (WHO) এবং চিকিৎসাবিজ্ঞানীদের মতে, নিয়মিত রক্তদান হৃদরোগ ও ক্যানসারের ঝুঁকি কমায়।',
    category: 'Benefits',
    color_theme: 'rose',
    icon: 'Heart',
    image_url: "https://images.unsplash.com/photo-1699883430258-785510b807db?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    creator: {
        name: 'DIC Admin',
        role: 'Editor',
        avatar: ''
    },
    key_points: [
      { icon: 'Droplet', text: 'আপনার এক ব্যাগ রক্ত ৩ জনের জীবন বাঁচাতে পারে।' },
      { icon: 'Shield', text: 'হৃদরোগ এবং স্ট্রোকের ঝুঁকি ৮৮% পর্যন্ত কমে।' }
    ],
    full_content: {
      introduction: "রক্তদান একটি মহৎ কাজ যা দাতা এবং গ্রহীতা উভয়ের জন্যই উপকারী। আধুনিক চিকিৎসাবিজ্ঞান বলছে, রক্তদান শুধুমাত্র মুমূর্ষু রোগীর জীবনই বাঁচায় না, বরং রক্তদাতার শারীরিক ও মানসিক সুস্থতাও নিশ্চিত করে। বিশ্ব স্বাস্থ্য সংস্থার মতে, নিরাপদ রক্ত সঞ্চালন ব্যবস্থার মূল ভিত্তি হলো স্বেচ্ছায় রক্তদান।",
      sections: [
        {
          sectionTitle: "হৃদরোগ ও স্ট্রোকের ঝুঁকি হ্রাস",
          content: [
            {
              type: 'text',
              body: "নিয়মিত রক্তদান করলে শরীরের রক্তে লৌহের (Iron) ভারসাম্য বজায় থাকে। অতিরিক্ত আয়রন হৃদপিণ্ডের ধমনীতে জমা হয়ে হার্ট অ্যাটাক ও স্ট্রোকের ঝুঁকি বাড়াতে পারে। গবেষণায় দেখা গেছে, যারা নিয়মিত রক্ত দেন, তাদের হৃদরোগের ঝুঁকি অন্যদের তুলনায় প্রায় ৮৮% কম।"
            }
          ]
        },
        {
          sectionTitle: "ক্যানসার প্রতিরোধে সহায়তা",
          content: [
            {
              type: 'highlight',
              heading: 'গবেষণালব্ধ তথ্য',
              body: "শরীরে অতিরিক্ত আয়রন ফ্রি-র‍্যাডিকেল ড্যামেজের মাধ্যমে ক্যানসারের ঝুঁকি বাড়ায়। নিয়মিত রক্তদানের ফলে ফুসফুস, লিভার, কোলন এবং গলার ক্যানসারের ঝুঁকি কমে। একটি গবেষণায় দেখা গেছে, বছরে দুইবার রক্তদানকারীদের ক্যানসার আক্রান্ত হওয়ার প্রবণতা ৩৭% কম।"
            }
          ]
        },
        {
          sectionTitle: "নতুন রক্তকণিকা উৎপাদন ও জীবনীশক্তি",
          content: [
            {
              type: 'text',
              body: "রক্তদানের ৪৮ ঘণ্টার মধ্যেই শরীর নতুন রক্তকণিকা তৈরির প্রক্রিয়া শুরু করে। এটি অস্থিমজ্জাকে (Bone Marrow) উদ্দীপ্ত করে, যা শরীরকে সতেজ ও কর্মক্ষম রাখে। এছাড়া প্রতিবার রক্তদানে শরীর থেকে প্রায় ৬৫০ ক্যালোরি শক্তি খরচ হয়, যা ওজন নিয়ন্ত্রণে সহায়ক।"
            }
          ]
        },
        {
          sectionTitle: "বিনামূল্যে স্বাস্থ্য পরীক্ষা",
          content: [
            {
              type: 'list',
              body: [
                "হেপাটাইটিস বি ও সি",
                "এইচআইভি (HIV/AIDS)",
                "সিফিলিস ও ম্যালেরিয়া",
                "হিমোগ্লোবিন, রক্তচাপ ও পালস রেট"
              ]
            },
            {
                type: 'text',
                body: "রক্তদানের আগে এই পরীক্ষাগুলো করার ফলে দাতা তার শারীরিক সুস্থতা সম্পর্কে নিশ্চিত হতে পারেন এবং কোনো সুপ্ত রোগ থাকলে তা দ্রুত ধরা পড়ে।"
            }
          ]
        }
      ],
      conclusion: "রক্তদান কেবল একটি শারীরিক প্রক্রিয়া নয়, এটি একটি মানবিক দায়িত্ব। আপনার সামান্য ত্যাগে যদি একটি পরিবার তাদের প্রিয়জনকে ফিরে পায়, তবে তার চেয়ে বড় সার্থকতা আর কী হতে পারে? আজই রক্তদানে এগিয়ে আসুন।"
    }
  },
  {
    id: 'eligibility-criteria',
    title: 'কারা রক্তদান করতে পারবেন?',
    headline: 'যোগ্যতা ও নিয়ম',
    display_date: '২২ ডিসেম্বর, ২০২৫',
    read_time: '৪ মিনিট পড়ুন',
    description: 'নিরাপদ রক্তদান নিশ্চিত করতে কিছু শারীরিক মানদণ্ড থাকা প্রয়োজন। দাতার বয়স, ওজন, এবং হিমোগ্লোবিনের মাত্রা সঠিক থাকা জরুরি।',
    category: 'Eligibility',
    color_theme: 'blue',
    icon: 'CheckCircle2',
    image_url: "https://www.redcross.org/content/dam/redcross/volunteer/lightbox/youth-volunteer-lightbox-1225.png.transform/1288/q70/feature/image.png",
    creator: {
        name: 'DIC Admin',
        role: 'Editor',
        avatar: ''
    },
    key_points: [
      { icon: 'Clock', text: '১৮ থেকে ৬০ বছর বয়সী সুস্থ মানুষ রক্ত দিতে পারেন।' },
      { icon: 'Users', text: 'ওজন কমপক্ষে ৫০ কেজি (পুরুষ) বা ৪৫ কেজি (নারী) হতে হবে।' }
    ],
    full_content: {
      introduction: "রক্তদান একটি নিরাপদ প্রক্রিয়া, তবে দাতা ও গ্রহীতা উভয়ের সুরক্ষার জন্য বিশ্ব স্বাস্থ্য সংস্থা (WHO) কিছু নির্দিষ্ট মানদণ্ড নির্ধারণ করেছে। রক্তদানের আগে এই যোগ্যতাগুলো যাচাই করে নেওয়া অত্যন্ত জরুরি।",
      sections: [
        {
          sectionTitle: "প্রাথমিক যোগ্যতা",
          content: [
            {
              type: 'list',
              body: [
                "বয়স: ১৮ থেকে ৬০ বছরের মধ্যে (কিছু ক্ষেত্রে ৬৫ পর্যন্ত)।",
                "ওজন: কমপক্ষে ৫০ কেজি (কিছু দেশে ৪৫ কেজি গ্রহণযোগ্য)।",
                "শারীরিক সুস্থতা: রক্তদানের সময় দাতাকে সম্পূর্ণ সুস্থ বোধ করতে হবে। জ্বর, সর্দি বা গলা ব্যথা থাকলে রক্ত দেওয়া যাবে না।"
              ]
            }
          ]
        },
        {
          sectionTitle: "মেডিক্যাল মানদণ্ড",
          content: [
            {
              type: 'text',
              body: "রক্তদানের জন্য নির্দিষ্ট হিমোগ্লোবিন লেভেল থাকা আবশ্যক। সাধারণত পুরুষদের জন্য ১৩.০ গ্রাম/ডিএল এবং নারীদের জন্য ১২.৫ গ্রাম/ডিএল। রক্তচাপ সিস্টোলিক ১০০-১৮০ এবং ডায়াস্টোলিক ৫০-১০০ এর মধ্যে থাকা বাঞ্ছনীয়।"
            },
            {
                type: 'highlight',
                heading: 'বিরতিকাল (Waiting Period)',
                body: "একজন সুস্থ পুরুষ প্রতি ৩ মাস অন্তর এবং নারী প্রতি ৪ মাস অন্তর রক্তদান করতে পারেন। এটি শরীরকে হারানো আয়রন পূরণের সুযোগ দেয়।"
            }
          ]
        },
        {
          sectionTitle: "কারা রক্ত দিতে পারবেন না (Deferral)",
          content: [
            {
              type: 'list',
              body: [
                "গর্ভবতী বা স্তন্যদানকারী মায়েদের রক্তদান থেকে বিরত থাকতে হবে।",
                "বিগত ৬ মাসের মধ্যে বড় কোনো অস্ত্রোপচার হলে।",
                "হেপাটাইটিস বি বা সি, জন্ডিস, এইডস বা ম্যালেরিয়া থাকলে।",
                "গত ২৪ ঘণ্টার মধ্যে মদ্যপান করলে বা অ্যান্টিবায়োটিক সেবন করলে।"
              ]
            }
          ]
        }
      ],
      conclusion: "আপনি যদি উপরের মানদণ্ডগুলো পূরণ করেন, তবে আপনি একজন গর্বিত রক্তদাতা হতে পারেন। আপনার একটি সিদ্ধান্তই বাঁচাতে পারে কারো জীবন।"
    }
  },
  {
    id: 'myths-vs-facts',
    title: 'ভুল ধারণা বনাম বাস্তবতা',
    headline: 'সচেতনতা',
    display_date: '২০ ডিসেম্বর, ২০২৫',
    read_time: '৬ মিনিট পড়ুন',
    description: 'রক্তদান নিয়ে সমাজে অনেক কুসংস্কার আছে। ভয় কাটিয়ে সঠিক তথ্য জানলে আপনিও হতে পারেন একজন জীবন রক্ষাকারী বীর।',
    category: 'Awareness',
    color_theme: 'purple',
    icon: 'AlertCircle',
    image_url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    creator: {
        name: 'DIC Admin',
        role: 'Editor',
        avatar: ''
    },
    key_points: [
      { icon: 'AlertCircle', text: 'রক্ত দিলে শরীর দুর্বল হয় না, ২৪ ঘণ্টায় তরল পূরণ হয়।' },
      { icon: 'Shield', text: 'রক্তদান বেদনাদায়ক নয়, এটি পিপঁড়ার কামড়ের মতো সামান্য।' }
    ],
    full_content: {
      introduction: "রক্তদান নিয়ে আমাদের সমাজে এখনও অনেক অমূলক ভয় ও ভুল ধারণা প্রচলিত আছে। এই কুসংস্কারগুলো মানুষকে রক্তদানের মতো মহৎ কাজ থেকে দূরে রাখে। আসুন জেনে নিই বিজ্ঞান কী বলে।",
      sections: [
        {
          sectionTitle: "শারীরিক দুর্বলতা ও রক্তস্বল্পতা",
          content: [
            {
              type: 'highlight',
              heading: 'মিথ: রক্ত দিলে শরীর দুর্বল হয়ে যায়।',
              body: "ফ্যাক্ট: রক্তদানের পর শরীর মাত্র ২৪ থেকে ৪৮ ঘণ্টার মধ্যে হারানো তরল অংশ পূরণ করে ফেলে। আর লোহিত রক্তকণিকা পূরণ হতে সময় লাগে ৪-৬ সপ্তাহ। পর্যাপ্ত পানি ও খাবার খেলে দুর্বলতার কোনো সুযোগ নেই।"
            },
            {
               type: 'text',
               body: "অনেকে ভাবেন রক্ত দিলে রক্তস্বল্পতা হবে। বাস্তবতা হলো, রক্তদানের আগে হিমোগ্লোবিন টেস্ট করা হয়। যদি তা নিরাপদ মাত্রায় থাকে, তবেই রক্ত নেওয়া হয়।"
            }
          ]
        },
        {
          sectionTitle: "ব্যথা ও সংক্রমণ",
          content: [
            {
              type: 'text',
              body: "অনেকে সুঁইয়ের ব্যথায় ভয় পান। আসলে এই ব্যথা একটি পিপঁড়ার কামড়ের চেয়ে বেশি কিছু নয় এবং তা মাত্র কয়েক সেকেন্ড স্থায়ী হয়। সংক্রমণের ভয়েরও কোনো কারণ নেই, কারণ প্রতিটি দাতাকে রক্ত নেওয়ার জন্য সম্পূর্ণ নতুন ও জীবাণুমুক্ত সুঁই ও ব্যাগ ব্যবহার করা হয়।"
            }
          ]
        },
        {
          sectionTitle: "অন্যান্য ভুল ধারণা",
          content: [
            {
              type: 'list',
              body: [
                "মিথ: উচ্চ রক্তচাপের রোগীরা রক্ত দিতে পারেন না।\nফ্যাক্ট: যদি রক্তচাপ নিয়ন্ত্রণে থাকে (১৮০/১০০ এর নিচে), তবে রক্ত দেওয়া সম্ভব।",
                "মিথ: রক্ত দিলে ওজন কমে/বাড়ে।\nফ্যাক্ট: রক্তদান ওজন কমানোর কোনো পদ্ধতি নয়, এবং এতে ওজন বাড়েও না।",
                "মিথ: ধূমপায়ীরা রক্ত দিতে পারেন না।\nফ্যাক্ট: ধূমপায়ীরা রক্ত দিতে পারেন, তবে রক্তদানের অন্তত ১ ঘণ্টা আগে ও পরে ধূমপান থেকে বিরত থাকা উচিত।"
              ]
            }
          ]
        }
      ],
      conclusion: "ভুল ধারণা বা কুসংস্কারে কান না দিয়ে বিজ্ঞানের তথ্যে আস্থা রাখুন। রক্তদান সম্পূর্ণ নিরাপদ এবং একটি পুণ্যের কাজ। আজই ভয় ঝেড়ে ফেলুন এবং মানবতার সেবায় এগিয়ে আসুন।"
    }
  }
];

// Re-export specific article logic or types if needed by other components
// For backward compatibility with HealthJournal if strictly needed,
// though HealthJournal should ideally handle any LearnArticle.

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  featuredImage: string;
  introduction: string;
  sections: {
    sectionTitle: string;
    content: BlogParagraph[];
  }[];
  conclusion: string;
}

// Transform the first article into the legacy BlogPost format for HealthJournal initial compatibility
const firstArticle = LEARN_ARTICLES[0];
export const BLOOD_DONATION_ARTICLE: BlogPost = {
    id: firstArticle?.id || 'article-1',
    title: firstArticle?.title || 'Default Title',
    author: firstArticle?.creator?.name || 'Admin',
    publishedDate: firstArticle?.display_date || '',
    featuredImage: firstArticle?.image_url || '',
    introduction: firstArticle?.full_content?.introduction || '',
    sections: firstArticle?.full_content?.sections || [],
    conclusion: firstArticle?.full_content?.conclusion || ''
};
