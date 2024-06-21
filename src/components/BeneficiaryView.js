import React from 'react';
import { Descriptions } from 'antd';

const BeneficiaryView = ({ beneficiary }) => (
  <Descriptions layout="vertical">
    <Descriptions.Item label="Full Name">{beneficiary.fullName}</Descriptions.Item>
    <Descriptions.Item label="Address">{beneficiary.address}</Descriptions.Item>
    <Descriptions.Item label="Country">{beneficiary.country}</Descriptions.Item>
    <Descriptions.Item label="PinCode">{beneficiary.pinCode}</Descriptions.Item>
  </Descriptions>
);

export default BeneficiaryView;
