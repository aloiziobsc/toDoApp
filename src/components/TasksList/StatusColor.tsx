import { useEffect, useState } from 'react';
import './taskList.scss'
import { returnStatusColor } from './utils';

const StatusColor = ({status}:any) => {
  const [color, setColor] = useState(returnStatusColor(status))

  useEffect(() => {
    setColor(returnStatusColor(status))
  }, [status]);

  return (
    <div className='circle' style={{backgroundColor: color}}>
    </div>
  );
};

export default StatusColor;
