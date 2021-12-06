import User from '../models/user';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const connectAccount = async (req, res) => {

    const user = await User.findById(req.user._id).exec();

    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "express",
        });
        console.log("Account is =====>", account);
        user.stripe_account_id = account.id;
        user.save();
    }
} 