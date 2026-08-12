// Minimal Supabase client stub for the hackathon MVP
// Reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createSupabaseClient(){
  const url = process?.env?.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if(!url || !key){
    // Return a simple mock with basic methods to avoid runtime errors during phases
    return {
      from: ()=>({select: async ()=>({data:[]})}),
      auth: { user: ()=>null }
    }
  }
  // For now we don't initialize the real client to avoid extra dependency
  return {
    url,key
  }
}
