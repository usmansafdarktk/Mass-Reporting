import React, { useState } from 'react';
import {
  FiAlertCircle,
  FiVideo,
  FiHelpCircle,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

const faqItems = [
  {
    question: 'What if my report contains incorrect location or timestamp?',
    answer:
      'While small errors can be tolerated, significantly inaccurate data may render the report invalid. Always review auto-filled location and timestamp data before submitting.',
  },
  {
    question: 'Can I track the status of my report?',
    answer:
      'Yes. Visit your dashboard to monitor report status in real-time (Pending, Under Review, Verified, or Rejected).',
  },
  {
    question: 'Is there a limit to how many reports I can submit?',
    answer:
      'There is no hard limit, but reports are rate-limited to prevent spam. High-frequency reporters are monitored for quality.',
  },
  {
    question: 'What qualifies as a valid violation?',
    answer:
      'Any activity violating public safety, traffic laws, environmental standards, or civil regulations (e.g., illegal parking, open burning, road encroachments).',
  },
  {
    question: 'Who reviews my report?',
    answer:
      'Reports are routed to verified agents or designated officials in the respective district for manual or AI-assisted review.',
  },
];

const HelpPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 pt-4 pb-10 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Help & Reporting Guidelines</h1>

        {/* Section Card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border dark:border-gray-700 dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)]">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FiFileText /> How to Report Effectively
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Follow these structured steps to submit an actionable and verifiable violation report:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>Use a clear and informative title (e.g., “Double parking at Liberty Market - 9AM”).</li>
            <li>Enable GPS access or pinpoint the location manually.</li>
            <li>Attach relevant image or video evidence with good visibility.</li>
            <li>Include time, date, and nearby landmarks in the description.</li>
            <li>Reports must be fact-based. Avoid speculative or duplicate submissions.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-xl dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] p-6 border dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FiVideo /> Supported Media Formats
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            For smooth upload and analysis, media must conform to these specifications:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              <strong>Images:</strong> JPEG, PNG, WebP — 640x480 to 1920x1080, max 10MB.
            </li>
            <li>
              <strong>Videos:</strong> MP4 (H.264) or WebM — max 60 seconds, 25MB.
            </li>
            <li>Do not upload media with watermarks, personal IDs, or excessive compression.</li>
            <li>Blur out any visible license plates or faces if not essential to the violation.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-xl dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] p-6 border dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FiAlertCircle /> Legal & Privacy Disclaimer
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              You are responsible for the accuracy and legality of submitted reports and content.
            </li>
            <li>
              The platform holds no liability for false, misleading, or defamatory reports.
            </li>
            <li>
              Personally identifiable data is stored securely and is not shared without legal obligation.
            </li>
            <li>
              Content violating platform policy may be flagged, hidden, or permanently removed.
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-[#1e293b] rounded-xl dark:shadow-none shadow-[0px_0px_4px_rgba(24,54,178,1)] p-6 border dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
            <FiHelpCircle /> Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-3">
            {faqItems.map((faq, idx) => (
            <div
                key={idx}
                className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
            >
                <button
                className={`
                    w-full text-left 
                    px-5 py-4 
                    flex justify-between items-center 
                    text-base font-medium 
                    text-black dark:text-white 
                    hover:bg-blue-100 dark:hover:bg-transparent
                    transition-colors duration-200
                `}
                onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                >
                {faq.question}
                {expandedIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedIndex === idx && (
                <div className="px-5 pb-4 pt-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800">
                    {faq.answer}
                </div>
                )}
            </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
