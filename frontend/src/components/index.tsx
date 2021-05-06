import * as React from 'react';

type Props = {
  list: any;
  index: number;
  skip: number
  onView: (data: object) => void;
};

const ProfileList: React.FC<Props> = ({ list, index, skip, onView }) => {
  const { name = '', gender = '', mass = '', height = '' } = list || {};
  return (
    <tr key={index}>
      <td>{index + skip + 1}</td>
      <td>{name ? name : '-'}</td>
      <td>{gender ? gender : '-'}</td>
      <td>{mass ? mass : '-'}</td>
      <td>{height ? height : '-'}</td>
      <td onClick={() => onView(list)} className="cursor-pointer">
        <i className="fa fa-eye" aria-hidden="true"></i>
      </td>
    </tr>
  );
};

export default ProfileList;
