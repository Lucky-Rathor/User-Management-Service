import React from 'react';

function ThankYouPage() {
    return (
        <div>
            <h1>Thank You!</h1>
            <p>Welcome to your account.</p>
            <button onClick={() => alert('Account deleted successfully!')}>Remove Account</button>
        </div>
    );
}

export default ThankYouPage;
