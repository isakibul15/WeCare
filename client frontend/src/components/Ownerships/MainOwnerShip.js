import React from "react";
import CreateOwnership from "./CreateOwnership";
import OwnershipRequests from "./OwnershipRequests";

const MainOwnerShip = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Transfer Ownership</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateOwnership />
            {/* Categories table */}
            <OwnershipRequests />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainOwnerShip;
