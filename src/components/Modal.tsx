import React, {useEffect} from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide, title, ...props }) =>
    isShowing ?
        <>
            <div className="modal-overlay">

                    <div className="modal-custom">
                        <div className="modal-header">
                            <h4 className="custom-modal-title">{title}</h4>
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
            
            .custom-modal-title{
                text-align: center;
                display: flex;
                align-items: center;
                font-family: 'Modern Antiqua', cursive;
            }
           
            .modal-custom {
                height: 500px;
                width: 1000px;
                background: rgba(0,0,0,0.5);
                border: rgba(255,255,255,0.4) 1px solid;
                position: absolute;
                top: 0px;
                left: 71px;
                backdrop-filter: blur(20px);
                z-index: 50;
                color: aliceblue;
                border-radius: 10px;
                overflow: scroll;
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