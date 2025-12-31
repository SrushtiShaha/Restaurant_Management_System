import { useState } from "react";
import "./Modal.css";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="modal-toggle" onClick={() => setIsOpen(true)}>
        Toggle modal
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Food Donation Filters</h3>
              <button
                className="text-gray-500 text-2xl"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>

            <form className="space-y-4">
              {/* Food Type Selection */}
              <label className="text-gray-700 font-medium">Food Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-1/2 py-2 rounded-lg bg-green-500 text-white font-medium"
                >
                  VEG
                </button>
                <button
                  type="button"
                  className="w-1/2 py-2 rounded-lg bg-red-500 text-white font-medium"
                >
                  NON-VEG
                </button>
              </div>

              {/* Min. Servings */}
              <label className="text-gray-700 font-medium">Min. Servings</label>
              <input
                type="number"
                placeholder="Enter min. servings"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Food Category */}
              <label className="text-gray-700 font-medium">Food Category</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="py-2 rounded-lg bg-black text-white font-medium"
                >
                  HOTELS
                </button>
                <button
                  type="button"
                  className="py-2 rounded-lg bg-black text-white font-medium"
                >
                  EVENTS
                </button>
                <button
                  type="button"
                  className="py-2 rounded-lg bg-black text-white font-medium"
                >
                  WEDDINGS
                </button>
              </div>

              {/* Estimated Food */}
              <label className="text-gray-700 font-medium">
                Estimated Food
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="No. of servings"
                  className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="No. of dishes"
                  className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                NEXT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
