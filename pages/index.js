import { MongoClient } from 'mongodb';
import React, { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://www.wallpaperup.com/uploads/wallpapers/2013/12/16/197406/54df26048323f74b219da0dca522e1cb-700.jpg',
        address: 'Some Address,Some city 128',
        description: 'This is a first meetup!'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://cdn57.androidauthority.net/wp-content/uploads/2015/11/00-best-backgrounds-and-wallpaper-apps-for-android-770x433.jpg',
        address: 'Some Address,Some city 878',
        description: 'This is a second meetup!'
    }
];
const HomePage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://avi-next:avi1294@cluster0.hz0ny.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.meetups(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup, image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 3
    };
}

export default HomePage
