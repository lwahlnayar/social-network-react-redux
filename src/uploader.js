import React from "react";

export default function Uploader(props) {
    return (
        <div className="uploaderContainer">
            <div className="overlay">
                <div className="uploaderModal">
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
