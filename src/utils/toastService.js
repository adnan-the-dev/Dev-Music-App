// src/utils/toastService.js

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "info") => {
  const config = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    theme: "colored",
    icon: false,
  };

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "warning":
      toast.warning(message, config);
      break;
    default:
      toast.info(message, config);
      break;
  }
};

export default showToast;
