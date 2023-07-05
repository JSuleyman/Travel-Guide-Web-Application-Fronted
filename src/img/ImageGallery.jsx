// import React, { useState, useRef } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './index.css';

// const ImageGallery = ({ onImageSelect, onDeleteImage }) => {
//     const [images, setImages] = useState([]);
//     const fileInputRef = useRef(null);

//     const handleImageUpload = (event) => {
//         const newImages = Array.from(event.target.files);
//         setImages([...images, ...newImages]);
//         fileInputRef.current.value = null;

//         onImageSelect(newImages[newImages.length - 1]);
//     };

//     const handleImageDelete = (index) => {
//         const deletedImage = images[index];
//         const updatedImages = [...images];
//         updatedImages.splice(index, 1);
//         setImages(updatedImages);

//         onDeleteImage(deletedImage);
//     };

//     const handleFileSelect = () => {
//         fileInputRef.current.value = null;
//     };
//     const onDragEnd = (result) => {
//         if (!result.destination) return;

//         const reorderedImages = Array.from(images);
//         const [removed] = reorderedImages.splice(result.source.index, 1);
//         reorderedImages.splice(result.destination.index, 0, removed);
//         setImages(reorderedImages);
//     };

//     return (
//         <div>
//             <h2>Image Gallery</h2>
//             <div className="image-container">
//                 <div className="file-input-container">
//                     <label htmlFor="file-upload" className="custom-file-upload">
//                         Yükle
//                     </label>
//                     <input
//                         ref={fileInputRef}
//                         id="file-upload"
//                         type="file"
//                         multiple
//                         onChange={handleImageUpload}
//                         onClick={handleFileSelect}
//                         style={{ display: 'none' }}
//                     />
//                 </div>
//                 {images.length > 0 && (
//                     <DragDropContext onDragEnd={onDragEnd}>
//                         <Droppable droppableId="characters">
//                             {(provided) => (
//                                 <div className="selected-image-container" ref={provided.innerRef} {...provided.droppableProps}>
//                                     {images.map((image, index) => (
//                                         <Draggable key={index} draggableId={`image-${++index}`} index={index}>
//                                             {(provided) => (
//                                                 <div
//                                                     className="image-item"
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                 >
//                                                     <img src={URL.createObjectURL(image)} alt="uploaded" className="selected-image" />
//                                                     <span className="selected-image-name">{image.name}</span>
//                                                     <span className="selected-image-size">{image.size} bytes</span>
//                                                     <button className="delete-button" onClick={() => handleImageDelete(index)}>
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//                     </DragDropContext>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ImageGallery;

import React, { useState, useRef } from 'react';
import './index.css';

const ImageGallery = ({ onImageSelect, onDeleteImage }) => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const newImages = Array.from(event.target.files);
        setImages([...images, ...newImages]);
        fileInputRef.current.value = null;

        // Seçilen resmi CustomCard bileşenine iletmek için onImageSelect fonksiyonunu çağırın
        onImageSelect(newImages[newImages.length - 1]);
    };

    const handleImageDelete = (index) => {
        const deletedImage = images[index];
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);

        // Silinen resmi API'den de kaldırmak için onDeleteImage fonksiyonunu çağırın
        onDeleteImage(deletedImage);
    };

    const handleFileSelect = () => {
        fileInputRef.current.value = null;
    };

    return (
        <div>
            <h2>Image Gallery</h2>
            <div className="image-container">
                <div className="file-input-container">
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Yükle
                    </label>
                    <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        onClick={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                </div>
                {images.length > 0 && (
                    <div className="selected-image-container">
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={URL.createObjectURL(image)} alt="uploaded" className="selected-image" />
                                <span className="selected-image-name">{image.name}</span>
                                <span className="selected-image-size">{image.size} bytes</span>
                                <button className="delete-button" onClick={() => handleImageDelete(index)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;


// import React, { useState, useRef } from 'react';
// import './index.css';

// const ImageGallery = ({ onImageSelect, onDeleteImage }) => {
//     const [images, setImages] = useState([]);
//     const fileInputRef = useRef(null);

//     const handleImageUpload = (event) => {
//         const newImages = Array.from(event.target.files).map((file) => ({
//             file,
//             isDefault: images.length === 0,
//         }));
//         setImages([...images, ...newImages]);
//         fileInputRef.current.value = null;

//         // Seçilen resimleri CustomCard bileşenine iletmek için onImageSelect fonksiyonunu çağırmak yerine
//         // onImageSelect fonksiyonuna doğrudan yeni resimleri geçirebilirsiniz.
//         onImageSelect([...images, ...newImages]);
//     };


//     const handleImageDelete = (index) => {
//         const deletedImage = images[index].file;
//         const updatedImages = [...images];
//         updatedImages.splice(index, 1);
//         setImages(updatedImages);

//         // Silinen resmi API'den de kaldırmak için onDeleteImage fonksiyonunu çağırın
//         onDeleteImage(deletedImage);
//     };

//     const handleImageSelect = (index) => {
//         const updatedImages = [...images];
//         updatedImages.forEach((image, i) => {
//             image.isDefault = i === index;
//         });
//         setImages(updatedImages);

//         // Seçilen resmi CustomCard bileşenine iletmek için onImageSelect fonksiyonunu çağırın
//         onImageSelect(images[index].file);
//     };

//     const handleFileSelect = () => {
//         fileInputRef.current.value = null;
//     };

//     return (
//         <div>
//             <h2>Image Gallery</h2>
//             <div className="image-container">
//                 <div className="file-input-container">
//                     <label htmlFor="file-upload" className="custom-file-upload">
//                         Yükle
//                     </label>
//                     <input
//                         ref={fileInputRef}
//                         id="file-upload"
//                         type="file"
//                         multiple
//                         onChange={handleImageUpload}
//                         onClick={handleFileSelect}
//                         style={{ display: 'none' }}
//                     />
//                 </div>
//                 {images.length > 0 && (
//                     <div className="selected-image-container">
//                         {images.map((image, index) => (
//                             <div
//                                 key={index}
//                                 className={`image-item ${image.isDefault ? 'selected' : ''}`}
//                                 onClick={() => handleImageSelect(index)}
//                             >
//                                 <img src={URL.createObjectURL(image.file)} alt="uploaded" className="selected-image" />
//                                 <span className="selected-image-name">{image.file.name}</span>
//                                 <span className="selected-image-size">{image.file.size} bytes</span>
//                                 {image.isDefault && <span className="default-indicator">Default</span>}
//                                 {images.length > 1 && !image.isDefault && (
//                                     <button
//                                         className="delete-button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleImageDelete(index);
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                 )}
//                                 {images.length === 1 && (
//                                     <button
//                                         className="delete-button"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleImageDelete(index);
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ImageGallery;