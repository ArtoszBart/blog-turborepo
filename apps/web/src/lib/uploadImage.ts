import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_API_KEY!;

export async function uploadImage(image: File): Promise<string> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = await supabase.storage
    .from('images')
    .upload(`${image.name}_${Date.now()}`, image);
  if (!data.data?.path) throw new Error('Failed to upload the file');

  const urlData = supabase.storage.from('images').getPublicUrl(data.data?.path);
  return urlData.data.publicUrl;
}
