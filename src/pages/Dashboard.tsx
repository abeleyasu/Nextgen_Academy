import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, FileSpreadsheet, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  onClick?: () => void;
}

function StatCard({ icon, label, value, onClick }: StatCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${
        onClick ? 'cursor-pointer hover:border-indigo-500 transition-colors' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-indigo-50 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState({
    coursesCount: 0,
    studentsCount: 0,
    examsCount: 0,
    completionRate: 0
  });
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    async function fetchStats() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin');

        // Fetch statistics
        const { data: courses } = await supabase
          .from('courses')
          .select('count');
        
        const { data: students } = await supabase
          .from('profiles')
          .select('count')
          .eq('role', 'student');

        const { data: exams } = await supabase
          .from('exams')
          .select('count');

        // Calculate completion rate (example calculation)
        const { data: progress } = await supabase
          .from('user_progress')
          .select('completed');

        const completedCount = progress?.filter(p => p.completed).length || 0;
        const totalCount = progress?.length || 1;
        const completionRate = Math.round((completedCount / totalCount) * 100);

        setStats({
          coursesCount: courses?.[0]?.count || 0,
          studentsCount: students?.[0]?.count || 0,
          examsCount: exams?.[0]?.count || 0,
          completionRate: completionRate
        });
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-indigo-600" />}
          label="Total Courses"
          value={stats.coursesCount}
          onClick={() => navigate('/dashboard/courses')}
        />
        {isAdmin && (
          <StatCard
            icon={<Users className="h-6 w-6 text-indigo-600" />}
            label="Total Students"
            value={stats.studentsCount}
            onClick={() => navigate('/dashboard/students')}
          />
        )}
        <StatCard
          icon={<FileSpreadsheet className="h-6 w-6 text-indigo-600" />}
          label="Available Exams"
          value={stats.examsCount}
          onClick={() => navigate('/dashboard/exams')}
        />
        <StatCard
          icon={<Trophy className="h-6 w-6 text-indigo-600" />}
          label="Completion Rate"
          value={`${stats.completionRate}%`}
        />
      </div>

      {/* Recent Activity or Course Progress would go here */}
    </div>
  );
}