import React from 'react';

const Feature = ({ iconSrc, altText, title, content }) => {
    return (
        <div className='feature-item' >
            <img src={iconSrc} alt={altText} className='feature-icon' />
            <h3 className='feature-item-title'>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default Feature;