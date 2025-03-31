import { useState } from 'react';

const UploadStudyMaterial = () => {

      const [materials, setMaterials] = useState([])
      const [materialFile, setMaterialFile] = useState(null)

      const handleMaterialUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
          setMaterialFile(file)
        }
      }

      const uploadMaterial = () => {
        if (materialFile) {
          const newMaterial = {
            id: Date.now(),
            name: materialFile.name,
            url: URL.createObjectURL(materialFile),
          }
          setMaterials([...materials, newMaterial])
          setMaterialFile(null)
        }
      }

    return (
        <div>
        <h1>Upload Study Material</h1>
        <form>
            <input type="file" accept=".pdf,.doc,.docx" />
            <button type="submit">Upload</button>
        </form>
        </div>
    );
}

export default UploadStudyMaterial;