'use client'

import Modal from "react-modal"
import { useState } from "react";
import ContactForm from "./ContactForm";

export default function ArchiveItemCommentModal({ id, uid }) {
  const [modalState, setModalState] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setModalState(!modalState)
  }

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(!modalState)
  }

  return(
    <>
      <Modal
        isOpen={modalState}
        className={'comment-modal'}
        contentLabel="Archive Item feedback modal"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        overlayClassName="comment-modal-overlay"
        ariaHideApp={false}
      >
          <button className="close-modal" onClick={(e)=>closeModal(e)}>X</button>
          <ContactForm
            id={id}
            uid={uid}
            archiveComment={true}
            setModalState={setModalState}
          />
      </Modal>

      <div className="info-set">
        Would you like to contribute to this archive item? <span className="open-modal-btn" onClick={(e)=>openModal(e)}>Click here.</span>
      </div>
    </>
  )
}