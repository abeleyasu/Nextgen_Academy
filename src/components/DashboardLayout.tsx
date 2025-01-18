import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap,
  Calendar,
  LogOut,
  Users,
  Settings,
  FileSpreadsheet
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ to, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
        isActive 
          ? 'bg-indigo-50 text-indigo-600' 
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    async function checkRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setIsAdmin(data?.role === 'admin');
      }
    }
    checkRole();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">NextGen Academy</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              <NavItem
                to="/dashboard"
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Dashboard"
                isActive={location.pathname === '/dashboard'}
              />
              <NavItem
                to="/dashboard/courses"
                icon={<BookOpen className="h-5 w-5" />}
                label="Courses"
                isActive={location.pathname.startsWith('/dashboard/courses')}
              />
              <NavItem
                to="/dashboard/exams"
                icon={<FileSpreadsheet className="h-5 w-5" />}
                label="Exams"
                isActive={location.pathname.startsWith('/dashboard/exams')}
              />
              <NavItem
                to="/dashboard/calendar"
                icon={<Calendar className="h-5 w-5" />}
                label="Calendar"
                isActive={location.pathname.startsWith('/dashboard/calendar')}
              />
              
              {isAdmin && (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </h3>
                  </div>
                  <NavItem
                    to="/dashboard/students"
                    icon={<Users className="h-5 w-5" />}
                    label="Students"
                    isActive={location.pathname.startsWith('/dashboard/students')}
                  />
                  <NavItem
                    to="/dashboard/settings"
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    isActive={location.pathname.startsWith('/dashboard/settings')}
                  />
                </>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}