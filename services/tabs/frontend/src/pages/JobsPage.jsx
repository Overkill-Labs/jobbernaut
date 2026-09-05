import { useState } from "react";
import seedJobs from "../data/mockJobs.json";
import JobDialog from "../components/jobs/JobDialog";

const STATUS_STYLES = {
  applied: "bg-blue-100 text-blue-800",
  screening: "bg-purple-100 text-purple-800",
  interviewing: "bg-amber-100 text-amber-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
  archived: "bg-gray-100 text-gray-600",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState(seedJobs);
  const [activeJob, setActiveJob] = useState(null);

  const handleSave = (updatedJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)),
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-h)]">
      <header className="border-b border-[var(--border)] px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Jobbernaut</h1>
        <span className="text-sm text-[var(--text)]">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""}
        </span>
      </header>

      <main className="px-8 py-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-[var(--text)] border-b border-[var(--border)]">
              <th className="pb-3 pr-4 w-1/4">Title</th>
              <th className="pb-3 pr-4 w-1/5">Company</th>
              <th className="pb-3 pr-4 w-24">Status</th>
              <th className="pb-3 pr-4">Applied</th>
              <th className="pb-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                onClick={() => setActiveJob(job)}
                className="border-b border-[var(--border)] cursor-pointer hover:bg-[var(--accent-bg)] transition-colors"
              >
                <td className="py-3 pr-4 font-medium text-[var(--text-h)]">
                  {job.title || (
                    <span className="italic text-[var(--text)]">Untitled</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {job.company_name || (
                    <span className="italic text-[var(--text)]">—</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={[
                      "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                      STATUS_STYLES[job.status] ?? STATUS_STYLES.applied,
                    ].join(" ")}
                  >
                    {job.status
                      ? job.status.charAt(0).toUpperCase() + job.status.slice(1)
                      : "—"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-[var(--text)]">
                  {job.date_applied || "—"}
                </td>
                <td className="py-3 text-[var(--text)]">
                  {job.location || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <JobDialog
        job={activeJob}
        onClose={() => setActiveJob(null)}
        onSave={handleSave}
      />
    </div>
  );
}
