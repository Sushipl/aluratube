import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://cyqgmdjasbbvtgtpisnf.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5cWdtZGphc2JidnRndHBpc25mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTcxMjEsImV4cCI6MTk4MzgzMzEyMX0.kGBHmRhBFXZJuC-vriihoIHbhoWH4v59_k0DwBEKldc'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from('TabelaVideos')
                .select("*")
        }
    }
}