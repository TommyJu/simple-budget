const ModalWrapper = ({ children, onClose, title }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-center">
            <h3>
                {title}
            </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            X
          </button>
        </div>

        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ModalWrapper;
