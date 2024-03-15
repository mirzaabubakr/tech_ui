import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BASE_URL } from "../../utils/config";

const File = () => {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");

  const data = localStorage.getItem("userData");
  const token = localStorage.getItem("token");

  const user = JSON.parse(data);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, video/*",
    onDrop,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("tags", tags);

    try {
      const response = await fetch(`${BASE_URL}/file/upload/${user.data.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setFiles([]);
        setTags("");
      } else {
        console.error("Failed to submit files and tags:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting files and tags:", error.message);
    }
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p className="dropzone-text">
              Drag and drop image or video files here, or click to select files
            </p>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="tags-input"
          />
        </div>
        {files.map((file, index) => (
          <div key={index} className="file-preview">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Selected image"
                className="preview-image"
              />
            ) : file.type.startsWith("video/") ? (
              <video controls className="preview-video">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ))}
        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default File;
