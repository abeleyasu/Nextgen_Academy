/*
  # Add role management and exams

  1. Changes
    - Add role column to profiles table
    - Create exams table
    - Add RLS policies for exams

  2. Security
    - Enable RLS on exams table
    - Add policies for admin and student access
*/

-- Add role to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'student' 
CHECK (role IN ('admin', 'student'));

-- Create exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  duration_minutes integer NOT NULL DEFAULT 60,
  passing_score integer NOT NULL DEFAULT 70,
  is_published boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- Exam policies
CREATE POLICY "Admins can manage exams"
  ON exams
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Students can view published exams"
  ON exams
  FOR SELECT
  TO authenticated
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'student'
    )
  );