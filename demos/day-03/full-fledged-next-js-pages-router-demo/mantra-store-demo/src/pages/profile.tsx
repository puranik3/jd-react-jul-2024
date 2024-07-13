import Head from "next/head";
import ProfileForm from "@/components/profile/profile-form";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";

const ProfilePage = ({ session }: any) => {
    return (
        <>
            <Head>
                <title>My profile</title>
                <meta name="description" content="User profile information" />
            </Head>

            <ProfileForm />
        </>
    );
};

// NOTE: This is the server-side alternative to the useEffect() to protect the /profile route in the Profile component
export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

export default ProfilePage;
