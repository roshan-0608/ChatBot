import { Modal } from "./Modal.jsx";
import "./ConfirmationDialog.css";

export function ConfirmationDialog({ isOpen, title, message, confirmLabel = "Confirm", onConfirm, onCancel }) {
    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <h2 className="confirm-title">{title}</h2>
            <p className="confirm-message">{message}</p>
            <div className="confirm-actions">
                <button className="confirm-cancel-button" onClick={onCancel}>Cancel</button>
                <button className="confirm-danger-button" onClick={onConfirm}>{confirmLabel}</button>
            </div>
        </Modal>
    );
}
