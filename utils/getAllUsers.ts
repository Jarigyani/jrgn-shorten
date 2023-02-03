import { urlParesAtom, userAtom } from '@/atoms';
import { SessionUser } from '@/types/types';
import { useAtom } from 'jotai';

type Props = {
  sUser: SessionUser;
};

const GetAllUsers = ({ sUser }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [urlPares, setUrlPares] = useAtom(urlParesAtom);
  setUser(sUser);
  if (user?.email) {
    fetch('/api/getallurls', {
      method: 'POST',
      body: JSON.stringify({
        email: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return console.log(data.error);
        return setUrlPares(data);
      });
  }
};

export default GetAllUsers;
