import { CgClose } from "react-icons/cg"
export function Modal({ title, close, children }: any) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h1>{title || ""}</h1>
                    <CgClose onClick={() => close(false)} />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}