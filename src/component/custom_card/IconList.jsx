import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';

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
        <div className="icon-list">
            <h4>Simgeler:</h4>
            <ul>
                {iconOptions.map((option, index) => (
                    <li key={index} onClick={() => handleIconSelect({ ...option, iconName: option.name })}>
                        <FontAwesomeIcon icon={option.icon} />
                        <span>{option.name}</span>
                    </li>
                ))}
            </ul>

            {/* Seçilen simgelerin gösterildiği bölüm */}
            <div className="selected-icons">
                <h4>Seçili Simgeler:</h4>
                {selectedIcons.map((icon, index) => (
                    <div key={index} onClick={() => handleIconRemove(icon)}>
                        <FontAwesomeIcon icon={icon.icon} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconList;





// // IconList.js
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFire, faUtensils, faPlane, faCamera, faMusic } from '@fortawesome/free-solid-svg-icons';

// const IconList = ({ selectedIcons, onIconsSelect }) => {
//     const iconOptions = [
//         { name: 'Ateş', icon: faFire },
//         { name: 'Yemek', icon: faUtensils },
//         { name: 'Seyahat', icon: faPlane },
//         { name: 'Kamera', icon: faCamera },
//         { name: 'Müzik', icon: faMusic },
//         // İsteğe bağlı olarak buraya daha fazla simge ekleyebilirsiniz
//     ];

//     const handleIconSelect = (selectedIcon) => {
//         const isIconSelected = selectedIcons.some((icon) => icon.iconName === selectedIcon.iconName);
//         if (!isIconSelected) {
//             onIconsSelect(selectedIcon);
//         }
//     };

//     return (
//         <div className="icon-list">
//             <h4>Simgeler:</h4>
//             <ul>
//                 {iconOptions.map((option, index) => (
//                     <li key={index} onClick={() => handleIconSelect({ ...option, iconName: option.name })}>
//                         <FontAwesomeIcon icon={option.icon} />
//                         <span>{option.name}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default IconList;
