import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  centered = false, 
  maxWidth = 'full',
  className = ""
}) => {
  const maxWidthClasses = {
    sm: 'max-w-md',     // ~448px (Auth forms)
    md: 'max-w-2xl',    // ~672px
    lg: 'max-w-4xl',    // ~896px
    xl: 'max-w-6xl',    // ~1152px (Dashboard/Modules)
    '2xl': 'max-w-7xl', // ~1280px
    full: 'max-w-full'
  };

  return (
    <main 
      className={`min-h-screen w-full bg-slate-50 ${className} ${centered ? 'grid place-items-center' : 'flex flex-col'}`}
    >
      <div 
        className={`w-full px-6 md:px-12 mx-auto ${maxWidthClasses[maxWidth]} ${centered ? '-mt-12 md:-mt-16' : 'pt-32 md:pt-40 pb-16'}`}
      >
        {children}
      </div>
    </main>
  );
};

export default PageLayout;
