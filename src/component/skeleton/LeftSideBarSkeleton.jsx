import React from "react";
import Skeleton from "react-loading-skeleton";
function LeftSideBarSkeleton() {
  return (
    <ul>
      <li>
        <span>
          <Skeleton />
        </span>
      </li>
      <li>
        <span>
          <Skeleton />
        </span>
      </li>
      <li>
        <span>
          <Skeleton />
        </span>
      </li>
      <li>
        <span>
          <Skeleton />
        </span>
      </li>
    </ul>
  );
}

export default LeftSideBarSkeleton;
