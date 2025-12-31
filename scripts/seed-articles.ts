
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { LEARN_ARTICLES } from '../src/assets/data/learn/content';

// Load environment variables from .env.local or .env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envLocalPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envLocalPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Starting seed process...');
  console.log(`Found ${LEARN_ARTICLES.length} articles to seed.`);

  for (const article of LEARN_ARTICLES) {
    console.log(`Seeding article: ${article.title} (${article.id})`);

    const payload = {
      id: article.id,
      title: article.title,
      headline: article.headline,
      description: article.description,
      image_url: article.image_url,
      category: article.category,
      color_theme: article.color_theme,
      icon: article.icon,
      read_time: article.read_time,
      display_date: article.display_date,
      key_points: article.key_points, // JSONB
      creator: article.creator, // JSONB
      is_active: true, // Default to true
      full_content: article.full_content, // JSONB
      // Legacy content field required by DB constraint
      content: article.full_content?.introduction || article.description || '', 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('article_posts')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error(`Error seeding ${article.id}:`, error);
    } else {
      console.log(`Successfully seeded ${article.id}`);
    }
  }

  console.log('Seeding complete.');
}

seed().catch(console.error);
