export default function WallCard({ entry }) {
  if (!entry) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{entry.student_name}</h3>
          <p className="text-indigo-600 font-medium text-sm">
            {entry.role} @ {entry.company}
          </p>
        </div>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">
          {entry.batch}
        </span>
      </div>
      
      {entry.tips && (
        <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-slate-700 text-sm italic">&quot;{entry.tips}&quot;</p>
        </div>
      )}
      
      {entry.linkedin && (
        <a
          href={entry.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          Connect on LinkedIn
        </a>
      )}
    </div>
  );
}
