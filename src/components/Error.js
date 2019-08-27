import React from 'react';

const Error = (props) => {
    return (
        <div class="error pt-1">
            <strong>{ props.message }</strong>
        </div>
    );
}

export default Error;