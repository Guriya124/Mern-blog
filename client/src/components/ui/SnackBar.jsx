import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Snackbar = ({ message, type, show, onClose }) => {
    const snackbarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (snackbarRef.current && !snackbarRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [show, onClose]);

    if (!show) return null;

    const getSnackbarStyle = () => {
        switch (type) {
            case "success":
                return "bg-green-500 text-white";
            case "error":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div
            ref={snackbarRef}
            className={`fixed bottom-4 left-30 right-0 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${getSnackbarStyle()}`}
        >
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-gray-200"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

Snackbar.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Snackbar;