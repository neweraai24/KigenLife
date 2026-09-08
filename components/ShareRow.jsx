"use client";

import { useEffect, useState } from "react";

export default function ShareRow({ url }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from window.location, unavailable during SSR
    setCurrentUrl(window.location.href);
  }, []);

  const shareUrl = url || currentUrl;

  return (
    <div className="mb-14 flex flex-wrap items-center gap-3">
      <span className="mr-1 text-[15px] font-semibold text-kg-moss-900">Chia sẻ:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 items-center rounded border border-kg-sage-500/35 px-4 text-[15px] text-kg-moss-900 no-underline"
      >
        Facebook
      </a>
      <a
        href={`https://zalo.me/share/url?url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 items-center rounded border border-kg-sage-500/35 px-4 text-[15px] text-kg-moss-900 no-underline"
      >
        Zalo
      </a>
      <button
        type="button"
        onClick={() => {
          if (navigator.clipboard) navigator.clipboard.writeText(shareUrl).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
        className="h-11 rounded border border-kg-sage-500/35 px-4 text-[15px] text-kg-moss-900"
      >
        {copied ? "Đã sao chép" : "Sao chép liên kết"}
      </button>
    </div>
  );
}
