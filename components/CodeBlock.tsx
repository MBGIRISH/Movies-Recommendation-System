
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg my-4 group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-xs text-slate-400">
        <span>Python</span>
        <i className="fa-solid fa-copy cursor-pointer hover:text-white transition"></i>
      </div>
      <pre className="p-4 text-sm code-font overflow-x-auto text-emerald-400">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
