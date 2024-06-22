import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { checkSubscription } from '../utils/checkSubscription'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const NormalWrapper = ({ children }) => {
    const [subscriptionStatus, setSubscriptionStatus] = useState('loading')

    useEffect(() => {
        const fetchSubscription = async () => {
            const status = await checkSubscription()
            setSubscriptionStatus(status)
            if (subscriptionStatus !== 'authorized') toast.error("You do not have a subscription yet")
        };

        fetchSubscription()
    }, []);

    if(subscriptionStatus === 'loading') {
        return <Loader />
    }

    console.log("subscriptionStatus before toast: ", subscriptionStatus)
    if (subscriptionStatus !== 'authorized') toast.error("You do not have a subscription yet")

    return subscriptionStatus === 'authorized' ? children : <Navigate to="/" />
};

export default NormalWrapper
