import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';
import "./IconList.css"

const IconList = ({ selectedIcons, onIconsSelect, onIconRemove }) => {
    const iconOptions = [
        { name: 'Ateş', icon: faFire },
        { name: 'Yemek', icon: faUtensils },
        { name: 'Seyahat', icon: faPlane },
        { name: 'Kamera', icon: faCamera },
        { name: 'Müzik', icon: faMusic },
    ];

    const handleIconSelect = (selectedIcon) => {
        const isIconSelected = selectedIcons.some((icon) => icon.iconName === selectedIcon.iconName);
        if (!isIconSelected) {
            onIconsSelect(selectedIcon);
        }
    };

    const handleIconRemove = (removedIcon) => {
        const updatedIcons = selectedIcons.filter((icon) => icon.iconName !== removedIcon.iconName);
        onIconRemove(updatedIcons);
    };

    return (
        <div className="card_create_icon-icon-list">
          <h4 className="card_create_icon-section-title">Simvollar:</h4>
          <div className="card_create_icon-icon-options">
            {iconOptions.map((option, index) => (
              <div key={index} className="card_create_icon-icon-item" onClick={() => handleIconSelect({ ...option, iconName: option.name })}>
                <div className="card_create_icon-icon-container">
                  <FontAwesomeIcon icon={option.icon} className="card_create_icon-icon" />
                </div>
                <span className="card_create_icon-icon-name">{option.name}</span>
              </div>
            ))}
          </div>
    
          <div className="card_create_icon-selected-icons">
            <h4 className="card_create_icon-section-title">Seçilmiş simvollar:</h4>
            <div className="card_create_icon-selected-icons-container">
              {selectedIcons.map((icon, index) => (
                <div key={index} onClick={() => handleIconRemove(icon)} className="card_create_icon-selected-icon">
                  <div className="card_create_icon-icon-container">
                    <FontAwesomeIcon icon={icon.icon} className="card_create_icon-selected" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default IconList;


// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';
// import "./IconList.css"

// const IconList = ({ selectedIcons, onIconsSelect, onIconRemove }) => {
//     const iconOptions = [
//         { name: 'Ateş', icon: faFire },
//         { name: 'Yemek', icon: faUtensils },
//         { name: 'Seyahat', icon: faPlane },
//         { name: 'Kamera', icon: faCamera },
//         { name: 'Müzik', icon: faMusic },
//     ];

//     const handleIconSelect = (selectedIcon) => {
//         const isIconSelected = selectedIcons.some((icon) => icon.iconName === selectedIcon.iconName);
//         if (!isIconSelected) {
//             onIconsSelect(selectedIcon);
//         }
//     };

//     const handleIconRemove = (removedIcon) => {
//         const updatedIcons = selectedIcons.filter((icon) => icon.iconName !== removedIcon.iconName);
//         onIconRemove(updatedIcons);
//     };

//     return (
//         <div className="icon-list">
//           <h4 className="section-title">Simgeler:</h4>
//           <ul className="icon-options">
//             {iconOptions.map((option, index) => (
//               <li key={index} onClick={() => handleIconSelect({ ...option, iconName: option.name })}>
//                 <FontAwesomeIcon icon={option.icon} className="icon" />
//                 <span>{option.name}</span>
//               </li>
//             ))}
//           </ul>
    
//           {/* Seçilen simgelerin gösterildiği bölüm */}
//           <div className="selected-icons">
//             <h4 className="section-title">Seçili Simgeler:</h4>
//             {selectedIcons.map((icon, index) => (
//               <div key={index} onClick={() => handleIconRemove(icon)} className="selected-icon">
//                 <FontAwesomeIcon icon={icon.icon} />
//               </div>
//             ))}
//           </div>
//         </div>
//       );
// };

// export default IconList;




// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';

// const IconList = ({ selectedIcons, onIconsSelect, onIconRemove }) => {
//     const iconOptions = [
//         { name: 'Ateş', icon: faFire },
//         { name: 'Yemek', icon: faUtensils },
//         { name: 'Seyahat', icon: faPlane },
//         { name: 'Kamera', icon: faCamera },
//         { name: 'Müzik', icon: faMusic },
//     ];

//     const handleIconSelect = (selectedIcon) => {
//         const isIconSelected = selectedIcons.some((icon) => icon.iconName === selectedIcon.iconName);
//         if (!isIconSelected) {
//             onIconsSelect(selectedIcon);
//         }
//     };

//     const handleIconRemove = (removedIcon) => {
//         const updatedIcons = selectedIcons.filter((icon) => icon.iconName !== removedIcon.iconName);
//         onIconRemove(updatedIcons);
//     };

//     return (
//         <div className="icon-list">
//             <h4>Simgeler:</h4>
//             <ul>
//                 {iconOptions.map((option, index) => (
//                     <li key={index} onClick={() => handleIconSelect({ ...option, iconName: option.name })}>
//                         <FontAwesomeIcon icon={option.icon} />
//                         {/* <span>{option.name}</span> */}
//                     </li>
//                 ))}
//             </ul>

//             {/* Seçilen simgelerin gösterildiği bölüm */}
//             <div className="selected-icons">
//                 <h4>Seçili Simgeler:</h4>
//                 {selectedIcons.map((icon, index) => (
//                     <div key={index} onClick={() => handleIconRemove(icon)}>
//                         <FontAwesomeIcon icon={icon.icon} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default IconList;
