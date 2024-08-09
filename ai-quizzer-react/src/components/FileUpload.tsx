import { ChangeEvent, FormEvent, useState } from 'react'
import '../styles/FileUpload.css'

export const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setSelectedFile(file);

        if(file){
            const fileURL = URL.createObjectURL(file);
            setFilePreview(fileURL);
        } else {
            setFilePreview(null);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(selectedFile);
    };

    return(
        <div className="upload-container">
            <form className='form' encType='multipart/form-data'>
                
                <div className='button-container' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                
                    <button className="file-input-button">
                    <div className="tooltip">Upload Your Notes</div>
                    <input name="file" id="fileInput" type="file" className="file-input" accept=".pdf, .doc, .docx" onChange={handleFileChange} required></input>
                        <svg
                            aria-hidden="true"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            stroke-width="2"
                            stroke="#fffffff"
                            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            ></path>
                            <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            stroke="#fffffff"
                            d="M17 15V18M17 21V18M17 18H14M17 18H20"
                            ></path>
                        </svg>
                    </button>
                </div>                 

            </form>

            {filePreview && (
                <div className='file-display'>
                    <h3>Preview</h3>
                    {selectedFile &&(
                        <iframe className='file-window' src={filePreview}></iframe>
                    )}
                </div>
            )}
        </div>
    )
}