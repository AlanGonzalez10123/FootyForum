import {createClient } from '@supabase/supabase-js'

const URL = 'https://xzrindsujlxmplwjzaej.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cmluZHN1amx4bXBsd2p6YWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MDIzODksImV4cCI6MjA0NzE3ODM4OX0.XVEvltM6y-HBJrydKnKSL45YLSNTtcBWBL10YxN55J0'

export const supabase = createClient(URL, API_KEY);

export default supabase;