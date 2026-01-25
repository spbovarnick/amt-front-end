'use client'

import toast from "react-hot-toast";
import Modal from "react-modal"
import { useState } from "react";
import { sendArchiveItemFeedback } from "@/utils/api";
import ContactForm from "./ContactForm";

export default function ArchiveItemCommentModal({ id, uid, title, archiveComment }) {
  const [modalState, setModalState] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddy, setEmailAddy] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  Modal.setAppElement("body");

  const openModal = (e) => {
    e.preventDefault();
    setModalState(!modalState)
  }

  const closeModal = (e) => {
    e.preventDefault();
    setModalState(!modalState)
  }

  async function handleCommentSubmission(e) {
    e.preventDefault();
    const result = await sendArchiveItemFeedback(title, id, uid, firstName, lastName, emailAddy, subjectLine, commentValue)
      if (result.status === "success") {
          toast("✅ Message sent!")
      } else {
        alert("❌ There was a problem sending your message. Please try again or contact us another way.")
      }
      setFirstName("");
      setLastName("");
      setCommentValue('');
      setEmailAddy("");
      setSubjectLine("");
      setModalState(false);
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