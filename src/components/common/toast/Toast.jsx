import React, { useState, useEffect } from 'react';

const Toast = ({ message, duration, type }) => {
    const [showToast, setShowToast] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setTimeout(() => setShowToast(false), duration);
        const interval = setInterval(() => setProgress((prevProgress) => prevProgress - 10), duration / 10);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    let borderColor;
    let progressColor;

    switch (type) {
        case 'warning':
            borderColor = '#ff9800';
            progressColor = '#ffd54f';
            break;
        case 'success':
            borderColor = '#4caf50';
            progressColor = '#4caf50';
            break;
        case 'info':
            borderColor = '#2196f3';
            progressColor = '#64b5f6';
            break;
        case 'error':
            borderColor = '#f44336';
            progressColor = '#ffcdd2';
            break;
        default:
            borderColor = '#333';
            progressColor = '#333';
    }

    return (
        showToast && (
            <div className="custom-toast" style={{ borderColor, top: '20px', right: '20px' }}>
                {message}
                <button onClick={() => setShowToast(false)}>Close</button>
                <div className="toast-progress" style={{ width: `${progress}%`, backgroundColor: progressColor }} />
            </div>
        )
    );
};

export default Toast;