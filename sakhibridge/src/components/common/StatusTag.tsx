import React from 'react';

interface StatusTagProps {
  status:
    | 'completed'
    | 'active'
    | 'upcoming'
    | 'submitted'
    | 'draft'
    | 'in_review';
  label?: string;
  className?: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  label,
  className = ''
}) => {
  const configs = {
    completed: {
      dotColor: 'bg-emerald-600',
      textColor: 'text-stone-700',
      defaultLabel: 'Completed'
    },
    active: {
      dotColor: 'bg-teal-600 animate-pulse',
      textColor: 'text-teal-900 font-medium',
      defaultLabel: 'In Progress'
    },
    upcoming: {
      dotColor: 'bg-stone-300',
      textColor: 'text-stone-500',
      defaultLabel: 'Upcoming'
    },
    submitted: {
      dotColor: 'bg-teal-600',
      textColor: 'text-stone-800 font-medium',
      defaultLabel: 'Submitted'
    },
    draft: {
      dotColor: 'bg-stone-400',
      textColor: 'text-stone-600',
      defaultLabel: 'Draft'
    },
    in_review: {
      dotColor: 'bg-amber-600',
      textColor: 'text-stone-800',
      defaultLabel: 'Under Review'
    }
  };

  const config = configs[status] || configs.upcoming;
  const displayLabel = label || config.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${config.textColor} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dotColor}`}
        aria-hidden="true"
      />
      <span>{displayLabel}</span>
    </span>
  );
};
