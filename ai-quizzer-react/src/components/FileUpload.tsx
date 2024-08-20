import { ChangeEvent, FormEvent, useState } from 'react';
import '../styles/FileUpload.css';
import {Worker, Viewer} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export const FileUpload = () => {
    const [pdfFile, setPdfFile] = useState<Uint8Array | null>(null);
    const [pdfText, setPdfText] = useState<string | null>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        if(file){

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const arrayBufferSlice = arrayBuffer.slice(0);
                const uint8Array = new Uint8Array(arrayBufferSlice)
                setPdfFile(uint8Array);

                const pdf = await getDocument({data: arrayBuffer}).promise;
                let fullText = '';

                for(let i = 1; i <= pdf.numPages; i++){
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + '\n';
                }

                console.log(fullText);
                setPdfText(fullText);
            }
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeWidth="2"
                            stroke="#fffffff"
                            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            ></path>
                            <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            stroke="#fffffff"
                            d="M17 15V18M17 21V18M17 18H14M17 18H20"
                            ></path>
                        </svg>
                    </button>
                </div>                 

            </form>

            {pdfFile && (
                <div className='file-display'>
                    <h3>Preview</h3>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile}/>
                    </Worker>
                </div>
            )}
        </div>
    )
}