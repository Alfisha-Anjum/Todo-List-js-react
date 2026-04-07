const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 opacity-75"
        onClick={onClose}
      ></div>
      <div className="z-10 rounded-md bg-white p-5">
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p>Are you sure you want to delete this account?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
