import DropDown from '@/components/dropdown';
import Table from '@/components/table';
import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
export default function Home() {
  const [dropdown, setDropdown] = useState('Empty');

  return (
    <div className='home'>
      <div style={{ marginTop: '5vw' }}>Home Page or Default Something</div>
      <DropDown title={'Help Plix'} options={['Pudi Sabji', 'Dahi Raita', 'Cream Roll']} value={dropdown} setter={setDropdown} />
      <div>Item Selected is : {dropdown}</div>
      <input type="file" className="file-picker css-13vuage" id="avatar" name="avatar" accept="image/png, image/jpeg" />
      <div style={{ marginLeft: "5vw", width: "85%", height: "100%", marginTop: "7.5vw" }}>
        <Table />
      </div>
    </div>
  );
}
