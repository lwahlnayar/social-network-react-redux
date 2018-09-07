import React from "react";

export default function Uploader(props) {
    return (
        <div className="uploaderContainer">
            <div onClick={props.exitModal} className="overlay">
                <div onClick={props.handleModalClick} className="uploaderModal">
                    <img
                        id="close"
                        onClick={props.exitModal}
                        src="./close-x.png"
                    />

                    <h2>Want to change your Profile Picture?</h2>
                    <input
                        onChange={props.submit}
                        id="fileButton"
                        type="file"
                        accept="image/*"
                    />
                    <label id="labelUploadButton" htmlFor="fileButton">
                        UPLOAD
                    </label>
                </div>
            </div>
        </div>
    );
}
