import '../styles/FileUpload.css'

export const FileUpload = () => {

    return(
        <>
            <h2>Upload you Notes</h2>
            <form encType='multipart/form-data'>
                <label htmlFor="fileInput">Choose a file to upload:</label>
                <input name="file" id="fileInput" type="file" className="file-input" accept=".pdf, .doc, .docx" required></input>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}