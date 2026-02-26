"use client"

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="w-full max-w-310 flex flex-row flex-wrap items-center gap-2.5 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap-2.5">
          {/* Item */}
          {item.href ? (
            <Link
              href={item.href}
              className="text-[17.4px] font-medium leading-7 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[17.4px] font-semibold leading-7 text-gray-900">
              {item.label}
            </span>
          )}

          {/* Separator - Only show if not the last item */}
          {index < items.length - 1 && (
            <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
              <ChevronRight size={14} className="text-gray-500" />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
