import { useAuthentication } from '../../contexts/AuthenticationContext';

export default function MessageBoard() {
  const { user } = useAuthentication();



  return <div></div>;
}
