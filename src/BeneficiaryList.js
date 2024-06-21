import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm } from "antd";
import { removeBeneficiary } from "./redux/Action/action";

const BeneficiaryList = () => {
  const beneficiaries = useSelector((state) => state.beneficiaries);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeBeneficiary(id));
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Pincode", dataIndex: "pincode", key: "pincode" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Link to={`/edit/${record.id}`}>
            <Button>Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this beneficiary?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Link to="/add">
        <Button type="primary">Add Beneficiary</Button>
      </Link>
      <Table dataSource={beneficiaries} columns={columns} rowKey="id" />
    </div>
  );
};

export default BeneficiaryList;
