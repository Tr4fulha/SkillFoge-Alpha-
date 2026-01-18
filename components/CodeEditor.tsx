import React, { useState, useRef, useEffect } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder, className }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = value.split('\n').length;
    setLineCount(Math.max(lines, 1));
  }, [value]);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Need to set timeout to update cursor position after render
      setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className={`flex bg-slate-900 border border-slate-700 rounded-lg overflow-hidden font-mono text-sm ${className}`}>
      {/* Line Numbers */}
      <div 
        ref={lineNumbersRef}
        className="bg-slate-950 text-slate-600 text-right py-3 px-2 select-none border-r border-slate-800 overflow-hidden w-10 shrink-0 leading-6"
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* Editor Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent text-slate-200 p-3 outline-none resize-none leading-6 whitespace-pre"
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;