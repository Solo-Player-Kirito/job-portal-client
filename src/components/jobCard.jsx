import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  ArrowRight,
  Users,
  Star,
} from "lucide-react";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 p-6 group h-full flex flex-col">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors truncate">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">{job.company}</span>
            {job.isFeatured && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </span>
            )}
          </div>
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            job.type === "Full-Time"
              ? "bg-blue-100 text-blue-800"
              : job.type === "Part-Time"
              ? "bg-purple-100 text-purple-800"
              : job.type === "Internship"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {job.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{job.location}</span>
        </div>

        {job.salary && (
          <div className="flex items-center">
            <Banknote className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
        )}

        {job.postedDate && (
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>{job.postedDate}</span>
          </div>
        )}

        {job.experience && (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span>{job.experience}</span>
          </div>
        )}
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="mt-2 mb-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center text-xs text-gray-500">
          {job.applicants ? (
            <>
              <Users className="w-3.5 h-3.5 mr-1.5" />
              <span>{job.applicants} applicants</span>
            </>
          ) : (
            <span className="text-green-600">New</span>
          )}
        </div>
        <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
          <span className="text-sm font-medium">View Details</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
}

export default JobCard;
