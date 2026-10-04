export default function ResourceCard({ resource }) {
  if (!resource) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="mb-2">
        <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-md">
          {resource.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{resource.title}</h3>
      <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">{resource.description}</p>
      
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 mt-auto"
      >
        View Resource
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
}
