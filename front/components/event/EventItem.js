import React from "react";
import Link from "next/link";

export default function EventItem() {
  return (
    <div>
      <Link href="/event/detail">
        <h2>개별 이벤트</h2>
      </Link>
    </div>
  );
}
