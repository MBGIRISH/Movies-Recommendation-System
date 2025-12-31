
import React, { ReactNode } from 'react';

interface NotebookCellProps {
  title: string;
  children: ReactNode;
  icon?: string;
  id?: string;
}

const NotebookCell: React.FC<NotebookCellProps> = ({ title, children, icon, id }) => {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
          <i className={`fa-solid ${icon || 'fa-brain'}`}></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default NotebookCell;
