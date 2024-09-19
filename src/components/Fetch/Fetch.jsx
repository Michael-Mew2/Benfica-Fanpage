import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { BrowserRouter } from "react-router-dom";

export default function Fetch() {



  // ----------



  // ==========

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        
          <Layout />
        </BrowserRouter>
      )}
    </>
  );
}
