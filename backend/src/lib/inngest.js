import {Inngest} from 'inngest';
import {connectDB} from './db.js';
import User from '../models/User.js';
// import {ENV} from './env.js';


export const inngest = new Inngest({ id : 'INTERVIEW_APP'});

const syncUser = inngest.createFunction(
    { id : 'Sync User to DB'},
    { event : 'clerk/user.created'},
    async ({event}) => {
        // connect to DB
        await connectDB()

        const {id , email_addresses , first_name , last_name , image_url} = event.data

        const newUser = {
            clerkId : id,
            email : email_addresses[0]?.email_address,
            name : `${first_name} ${last_name}`,
            profileImage : image_url,
        }

       await User.create(newUser)
    });


const deleteUserFromDB = inngest.createFunction(
    { id : 'delete User from DB'},
    { event : 'clerk/user.deleted'},
    async ({event}) => {
        // connect to DB
        await connectDB()

        const {id} = event.data
       await User.deleteOne({clerkId : id})
    })
export const functions = [syncUser , deleteUserFromDB];