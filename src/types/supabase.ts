export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          image_url: string
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          image_url: string
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          image_url?: string
          author_id?: string
        }
      }
      exams: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          course_id: string
          duration_minutes: number
          passing_score: number
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          course_id: string
          duration_minutes?: number
          passing_score?: number
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          course_id?: string
          duration_minutes?: number
          passing_score?: number
          is_published?: boolean
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          full_name: string
          avatar_url: string | null
          learning_path: string[]
          role: 'admin' | 'student'
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          full_name: string
          avatar_url?: string | null
          learning_path?: string[]
          role?: 'admin' | 'student'
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          learning_path?: string[]
          role?: 'admin' | 'student'
        }
      }
    }
  }
}