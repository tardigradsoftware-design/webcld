// src/lib/supabase.ts
// Supabase istemcileri — sunucu (service role) ve istemci (anon) ayrımı ile.

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { ContactSubmission } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/** Yapılandırma tam mı? (eksikse formlar yedek akışa düşer) */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey)

/**
 * Yalnızca SUNUCU tarafında kullanılmalı.
 * Service role anahtarı RLS'i bypass eder; asla istemciye gönderilmez.
 */
let adminClient: SupabaseClient | null = null
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseServiceKey) return null
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return adminClient
}

/** İstemci tarafı anon client (RLS politikaları geçerlidir) */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

export interface ContactInsert {
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  city: string | null
  message: string
  kvkk_accepted: boolean
  source_url: string | null
  ip_address: string | null
}

export interface ContactInsertResult {
  ok: boolean
  id?: string
  error?: string
}

/**
 * contacts tablosuna kayıt ekler.
 * Supabase yapılandırılmamışsa ok=false döner (yönlendirici akış e-posta ile devam eder).
 */
export async function insertContact(data: ContactInsert): Promise<ContactInsertResult> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { ok: false, error: 'SUPABASE_NOT_CONFIGURED' }
  }
  const { data: row, error } = await supabase
    .from('contacts')
    .insert({ ...data, status: 'new' })
    .select('id')
    .single()

  if (error) return { ok: false, error: error.message }
  return { ok: true, id: (row as { id: string }).id }
}

/** Kayıt okuma (yönetim tarafı için) */
export async function getContactSubmissions(limit = 50): Promise<ContactSubmission[]> {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error || !data) return []
  return (data as Record<string, unknown>[]).map((row) => ({
    id: String(row.id),
    name: String(row.name ?? ''),
    email: String(row.email ?? ''),
    phone: String(row.phone ?? ''),
    company: row.company ? String(row.company) : undefined,
    service: row.service ? String(row.service) : undefined,
    city: row.city ? String(row.city) : undefined,
    message: String(row.message ?? ''),
    kvkkAccepted: Boolean(row.kvkk_accepted),
    sourceUrl: String(row.source_url ?? ''),
    ipAddress: String(row.ip_address ?? ''),
    createdAt: String(row.created_at ?? ''),
  }))
}
