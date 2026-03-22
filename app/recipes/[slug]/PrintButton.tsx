"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rd-share-btn rd-print-btn"
      type="button"
    >
      🖨 Print
    </button>
  );
}
