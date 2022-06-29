import React from "react";
import Skeleton from "react-loading-skeleton";
function TaskItemSkeleton() {
  
  return (
    <>
      <div className="col-flex-md-3 p-2">
        <div className="task-item">
          <div>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <hr></hr>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton height={"50px"} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-flex-md-3 p-2">
        <div className="task-item">
          <div>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <hr></hr>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton height={"50px"} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-flex-md-3 p-2">
        <div className="task-item">
          <div>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <hr></hr>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton height={"50px"} />
            </p>
          </div>
        </div>
      </div>
      <div className="col-flex-md-3 p-2">
        <div className="task-item">
          <div>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton />
            </p>
            <hr></hr>
            <p>
              <Skeleton />
            </p>
            <p>
              <Skeleton height={"50px"} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItemSkeleton;
