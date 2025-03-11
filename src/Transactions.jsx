// Transactions.js
import React, {useState} from 'react';
import axios from 'axios';
import './Transactions.css';
import {baseUrl} from "./config";

const Transactions = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState(''); // State for the message
    const [progressMessage, setProgressMessage] = useState(''); // State for the message
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadMessage('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.'); // Or a more elegant error handling
            return;
        }
        setIsLoading(true); // Set loading to true before upload

        const formData = new FormData();
        formData.append('file', selectedFile); // 'file' is the field name expected by your backend

        try {
            const response = await axios.post(`${baseUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            setSelectedFile(null);
            setIsLoading(false); // Set loading to false on error
            const intervalId = setInterval(async () => {
                try {
                    const progressResponse = await axios.get(`${baseUrl}/progress`);
                    const newMessage = progressResponse.data.message; // Assuming your backend returns an array of messages
                    if (newMessage) {
                        setProgressMessage(newMessage)
                    }

                    if (progressResponse.data.finished) { // Check for completion status from the backend
                        clearInterval(intervalId);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                    clearInterval(intervalId); // Stop polling on error
                    setIsLoading(false);
                }
            }, 500);

            setUploadMessage(`${response.data.file_name} uploaded successfully!`);
            // Handle success, e.g., show a success message or update the UI
        } catch (error) {
            setIsLoading(false); // Set loading to false on error

            setUploadMessage('Error uploading file!');
            // Handle error, e.g., show an error message to the user
        }
    };


    return (
        <div>
            <h1>Transactions</h1>

            <div className="file-upload-section"> {/* Add the container div */}
                <input type="file" id="fileInput" onChange={handleFileChange}/>
                {selectedFile && <span className="file-name">{selectedFile.name}</span>}

                <button onClick={handleUpload} className="upload-button">Upload File</button>
            </div>
            <div>
                {isLoading && <div className="loading-indicator">.</div>} {/* Display loading indicator */}

            </div>
            <div>
                {/* Display the messages */}
            {progressMessage &&
                <p className={progressMessage.includes("Error") ? "error-message" : "success-message"}>{progressMessage}</p>} {/* Conditionally render success/error message */}
            </div>
            {/* Display the upload message */}
            {uploadMessage &&
                <p className={uploadMessage.includes("Error") ? "error-message" : "success-message"}>{uploadMessage}</p>} {/* Conditionally render success/error message */}

        </div>

    );
};

export default Transactions;
