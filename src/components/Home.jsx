import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useStoreActions } from "easy-peasy";

const Home = () => {
  const HomeQuery = graphql`
    query HomeQuery {
      me {
        id
        firstName
        lastName
      }
    }
  `;
  const data = useLazyLoadQuery(HomeQuery);
  // Storing user details for add answer
  const setCurrentUserAction = useStoreActions(
    (actions) => actions.setCurrentUserAction
  );

  setCurrentUserAction({
    id: data.me.id,
    firstName: data.me.firstName,
    lastName: data.me.lastName,
  });
  return <div>Home</div>;
};

export default Home;
