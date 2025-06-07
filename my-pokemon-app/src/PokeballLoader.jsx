import React from "react";
const PokeballLoader = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <div className="pokeball-spinner" />
      <style>{`
        .pokeball-spinner {
          margin: auto;
          width: 50px;
          height: 50px;
          border: 5px solid #d32f2f; /* red top */
          border-bottom: 5px solid white;
          border-radius: 50%;
          position: relative;
          animation: spin 1.5s linear infinite;
          box-sizing: border-box;
          background: white;
        }
        .pokeball-spinner::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 10px;
          background: black;
          transform: translateY(-50%);
          z-index: 1;
        }
        .pokeball-spinner::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 15px;
          height: 15px;
          background: white;
          border: 4px solid black;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
export default PokeballLoader;
