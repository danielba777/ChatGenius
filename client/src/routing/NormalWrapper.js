import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { checkSubscription } from '../utils/checkSubscription'
import Loader from '../components/Loader'

const NormalWrapper = ({ children }) => {
    const [subscriptionStatus, setSubscriptionStatus] = useState('loading')

    useEffect(() => {
        const fetchSubscription = async () => {
            const status = await checkSubscription()
            setSubscriptionStatus(status)
        };

        fetchSubscription()
    }, []);

    if(subscriptionStatus === 'loading') {
        return <Loader />
    }

    return subscriptionStatus === 'authorized' ? children : <Navigate to="/" />
};

export default NormalWrapper
