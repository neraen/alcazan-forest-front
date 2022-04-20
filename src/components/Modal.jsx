import React, {useEffect} from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide, title, ...props }) =>
    isShowing ?
        <>
            <div className="modal-overlay">

                    <div className="modal-custom">
                        <div className="modal-header">
                            <h4>{title}</h4>
                            <button
                                type="button"
                                className="modal-close-button"
                                onClick={hide}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{props.children}</div>
                    </div>

            </div>

            <style jsx="true">{`
            
           
            .modal-custom {
          height: 500px;
            width: 500px;
            background: #200F00;
            border: aliceblue solid;
            position: relative;
            bottom: 548px;
            left: 48px;
            z-index: 50;
            color: aliceblue;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
         
            }

            .modal-close-button {
              font-size: 1.4rem;
              font-weight: 700;
              color: aliceblue;
              cursor: pointer;
              border: none;
              background: transparent;
            }
          `}</style>
        </>
        : null;


export default Modal;