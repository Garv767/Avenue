import { getDeadlineStatus } from "./utils";

export default function JobCard({ job }) {
  if (!job) return null;
  const status = getDeadlineStatus(job.deadline);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{job.title}</h3>
        {status && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium border whitespace-nowrap ml-2 ${status.color}`}>
            {status.text}
          </span>
        )}
      </div>
      
      <p className="text-slate-600 font-medium mb-1">{job.company}</p>
      
      <div className="mt-auto pt-4 space-y-3">
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium capitalize">
            {job.type === 'full-time' ? 'Full-Time' : job.type}
          </span>
          {job.deadline && (
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
              Due: {new Date(job.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
        
        <a
          href={job.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-indigo-700 transition-colors"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
