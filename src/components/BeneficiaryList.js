import React, { useState } from "react";
import { Table, Modal, message } from "antd";
import BeneficiaryView from "./BeneficiaryView";
import { EyeFilled, DeleteFilled, EditFilled } from "@ant-design/icons";

const BeneficiaryList = ({ beneficiaries, onEdit, onRemove }) => {
  const [viewingBeneficiary, setViewingBeneficiary] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const showViewModal = (beneficiary) => {
    setViewingBeneficiary(beneficiary);
    setIsViewModalVisible(true);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
    setViewingBeneficiary(null);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this beneficiary?",
      content: "This action cannot be undone.",
      onOk() {
        onRemove(id);
      },
      onCancel() {
        message.info("Delete action cancelled.");
      },
    });
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "PinCode",
      dataIndex: "pinCode",
      key: "pinCode",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span className="d-flex">
          <EditFilled onClick={() => onEdit(record)} style={{ cursor: "pointer" }} />
          <DeleteFilled
            onClick={() => showDeleteConfirm(record.id)}
            style={{ marginLeft: "8px", cursor: "pointer" }}
          />
          <EyeFilled
            onClick={() => showViewModal(record)}
            style={{ marginLeft: "8px", cursor: "pointer" }}
          />
        </span>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={beneficiaries} columns={columns} rowKey="id" scroll={{ x: "100%" }} />
      <Modal
        title="View Beneficiary"
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
      >
        {viewingBeneficiary && <BeneficiaryView beneficiary={viewingBeneficiary} />}
      </Modal>
    </>
  );
};

export default BeneficiaryList;
