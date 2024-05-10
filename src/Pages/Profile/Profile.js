import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        // Retrieve user information from local storage
        const storedUserInfo = localStorage.getItem('formData');
        console.log(storedUserInfo)
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('File uploaded successfully.');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center my-8">
                <h2 className="text-xl mb-4 font-bold">Upload your photo</h2>
                <div className="h-48 w-72 bg-indigo-400 flex items-center rounded-lg">
                    <div >
                        <input type="file" onChange={handleFileChange} />
                    </div>
                </div>
                <button className="btn rounded-lg mt-4 bg-white text-indigo-500" onClick={handleUpload}>Upload</button>
            </div>
            <div>
                {userInfo ? (
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold">Name: {userInfo.username}</p>
                        <p className="text-2xl font-bold">Email: {userInfo.email}</p>
                    </div>
                ) : (
                    <p>No user information available</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
