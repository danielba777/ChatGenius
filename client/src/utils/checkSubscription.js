// utils/subscriptionService.js
import axios from 'axios';

export const checkSubscription = async () => {
    try {
        const tokenResponse = await axios.get("https://chatgenius.onrender.com/api/auth/refresh-token");
        if (tokenResponse.data) {
            const config = { headers: { "Authorization": `Bearer ${tokenResponse.data}` } };
            const subscriptionResponse = await axios.get("https://chatgenius.onrender.com/api/auth/subscription", config);
            if (subscriptionResponse.data.subscription) {
                return 'authorized';
            } else {
                return 'unauthorized';
            }
        } else {
            return 'unauthorized';
        }
    } catch (err) {
        console.error('Error fetching subscription data:', err);
        return 'unauthorized';
    }
};
