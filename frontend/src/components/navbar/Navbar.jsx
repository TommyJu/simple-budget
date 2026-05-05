import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavBar = ({
  pageTitle,
  isBackButtonShown = true,
  isSettingsButtonShown = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex p-2 items-center">
      <div className="w-10 flex justify-start">
        {isBackButtonShown && (
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        )}
      </div>
      <h2 className="flex-1 text-center text-5xl px-4 text-primary indie-flower-regular">
        {pageTitle}
      </h2>
      <div className="w-10 flex justify-end">
        {isSettingsButtonShown && (
          <Settings
            className="cursor-pointer"
            onClick={() => navigate("/settings")}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
