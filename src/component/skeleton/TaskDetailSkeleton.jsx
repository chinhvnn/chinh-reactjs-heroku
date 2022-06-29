import React from "react";
import Skeleton from "react-loading-skeleton";
function TaskDetailSkeleton() {
  return (
    <div className="row-flex j-content-center">
      <div className="create-new-task">
        <h3>TASK DETAIL</h3>

        <div className="row-flex mb-2">
          <div className="col-flex-md-4 pt-3 pl-1">
            <Skeleton width={"100px"} />
          </div>
          <div className="col-flex-md-8">
            <Skeleton height={"100%"} />
          </div>
        </div>

        <div className="row-flex mb-2">
          <div className="col-flex-md-4 pt-3 pl-1">
            <Skeleton width={"100px"} />
          </div>
          <div className="col-flex-md-8">
            <Skeleton height={"100%"} />
          </div>
        </div>

        <div className="row-flex mb-2">
          <div className="col-flex-md-4 pt-3 pl-1">
            <Skeleton width={"100px"} />
          </div>
          <div className="col-flex-md-8">
            <Skeleton height={"100%"} />
          </div>
        </div>

        <div className="row-flex mb-2">
          <div className="col-flex-md-4 pt-3 pl-1">
          <Skeleton width={"100px"} />
          </div>
          <div className="col-flex-md-8">
            <Skeleton height={"70px"} />
          </div>
        </div>

        <div className="row-flex ">
          <div className="col-flex-md-4 pt-3 pl-1">
          <Skeleton width={"100px"} />
          </div>
          <div className="row-flex col-flex-md-8 pt-3">
          <Skeleton width={"380px"} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default TaskDetailSkeleton;
