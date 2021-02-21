import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonAnimation() {
    return (
        <div>
            <Skeleton variant="text" animation={false} />
            <Skeleton variant="circle" width={40} height={40} animation="wave" />
            <Skeleton variant="rect" width={600} height={130} animation="wave" />
        </div>
    );
}
