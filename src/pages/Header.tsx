import React from "react";
import runTopLogo from "../images/run_top_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "src/hooks/useMe";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data, loading, error } = useMe();
  return (
    <>
      {!data?.getMyProfile.isVerified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 md:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <img src={runTopLogo} className="w-24" />
          <span className="text-sm">
            <Link to="/users/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
