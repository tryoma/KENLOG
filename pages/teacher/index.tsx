import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session)

  const userItem = {
    name: 'test',
    email: 'test',
    image: 'test',
    birthday: '2021-01-01',
  };

  return {
    props: userItem,
  };
}

const TeacherHome: NextPage<any> = (props) => {
  const { name, email, image, birthday } = props;

  return (
    <>
      <div>
        <h1>プロファイル</h1>
        
      </div>
    </>
  );
};

export default TeacherHome;