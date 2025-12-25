'use client'

import toast from "react-hot-toast";
import Modal from "react-modal"
import { useState } from "react";
import { sendArchiveItemFeedback } from "@/utils/api";

export default function ArchiveItemComment({ id, uid, title, archiveComment }) {
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
          toast("✅ Comment sent!")
      } else {
        alert("❌ There was a problem sending your comment. Please try again or contact us another way.")
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
          <form className="feedback-form">
            <div className="form-header">CONTACT</div>
            <div className="ff-names">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
                />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
            <input
              type="email"
              id="emailAddy"
              name="emailAddy"
              value={emailAddy}
              onChange={e => setEmailAddy(e.target.value)}
              placeholder="Email Address"
            />
            <div className="subject-set">
              <label htmlFor="subject" className="subject-header">Subject</label>
              <input
                name="subject"
                type="text"
                id="subjectLine"
                readOnly={archiveComment}
                value={archiveComment ? ("Archive Item: Comment") : subjectLine}
                onChange={e => setSubjectLine(e.target.value)}
              />
            </div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={commentValue}
              onChange={e => setCommentValue(e.target.value)}
              placeholder="Would you like to contribute to this archive item? Please share here..."
            />
            <button
              type="submit"
              id="submit-comment-btn"
              onClick={handleCommentSubmission}
              disabled={commentValue.length === 0}
            >Submit</button>
          </form>
      </Modal>

      <div className="info-set">
        Would you like to contribute to this archive item? <span className="open-modal-btn" onClick={(e)=>openModal(e)}>Click here.</span>
      </div>
    </>
  )
}