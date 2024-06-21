import React from 'react';
import { List, Button } from 'antd';

const BeneficiaryItem = ({ beneficiary, onEdit, onRemove }) => (
  <List.Item
    actions={[
      <Button onClick={() => onEdit(beneficiary)}>Edit</Button>,
      <Button onClick={() => onRemove(beneficiary.id)}>Remove</Button>,
    ]}
  >
    <List.Item.Meta
      title={beneficiary.fullName}
      description={`${beneficiary.address}, ${beneficiary.country} - ${beneficiary.pinCode}`}
    />
  </List.Item>
);

export default BeneficiaryItem;
