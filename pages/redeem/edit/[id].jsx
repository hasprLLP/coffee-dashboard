//& Input Components [#IMPORTS#]
import TextField from '@/components/input';
import DropDown from '@/components/dropdown';
import GoBack from '@/helpers/goback';
import UpdateButton from '@/components/updateButton';
import DeleteButton from '@/components/deleteButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import server from 'src/backend/node/server';

//& Create & Export Driver [#FUNCTION#]
export default function EditSchool() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();

  //& Return UI [#RETURN#]
  return <div className='home'>Hello</div>;
}
