import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader(props) {
    return (
        <>
            <CircularProgress className="preloader-wrapper big" size={50} color="secondary" />
        </>
    );
}
