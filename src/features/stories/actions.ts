'use server';

import { createClient } from '@/lib/supabase/server';
import { storySchemas } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';
import { storyService } from './services/story.service';

export async function submitStoryAction(prevState: any, formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        message: 'You must be logged in to submit a story',
      };
    }

    // Check if user is verified? 
    // Ideally we should check if they are a verifiable donor, but let's just check authentication for now.
    // The service might fail if the profile doesn't exist?

    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
    };

    const validated = storySchemas.create.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: 'Invalid input data',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    await storyService.submit({
      donor_id: user.id,
      title: validated.data.title,
      content: validated.data.content,
    });

    revalidatePath('/stories');
    
    return {
      success: true,
      message: 'Story submitted successfully! It is pending review.',
    };

  } catch (error) {
    console.error('Failed to submit story:', error);
    return {
      success: false,
      message: 'Failed to submit story. Please try again later.',
    };
  }
}
