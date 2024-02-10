'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import dreamFlyer from 'public/images/dream-flyer-updated.jpeg';

const PopUp = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 2000);
    }, []);

    useEffect(() => {
        Modal.setAppElement(document.getElementsByClassName('page-wrapper')[0]);
    },[])


    return (
        <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
                contentLabel="Give Guide"
            >

                <button className="modalClose" onClick={closeModal}></button>
                <div className="modalContent give-guide-wrapper">
                    <div className="give-guide-container">
                        <div className="give-guide-text">
                            <img className="dream-image" src={dreamFlyer.src} />
                        </div>
                    </div>
                </div>
            </Modal>
    )
}

export default PopUp;