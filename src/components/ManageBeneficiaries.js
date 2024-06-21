import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, message } from "antd";
import BeneficiaryList from "./BeneficiaryList";
import BeneficiaryForm from "./BeneficiaryForm";
import {
  addBeneficiary,
  editBeneficiary,
  removeBeneficiary,
  setBeneficiaries,
} from "../redux/beneficiariesSlice";
import { Breadcrumb } from "antd";

const ManageBeneficiaries = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const dispatch = useDispatch();
  const beneficiaries = useSelector(
    (state) => state.beneficiaries.beneficiaries
  );

  useEffect(() => {
    fetch("http://localhost:5000/beneficiaries")
      .then((response) => response.json())
      .then((data) => dispatch(setBeneficiaries(data)));
  }, [dispatch]);

  const showModal = (beneficiary = null) => {
    setEditingBeneficiary(beneficiary);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingBeneficiary(null);
  };

  const handleSave = (beneficiary) => {
    const url = editingBeneficiary
      ? `http://localhost:5000/beneficiaries/${editingBeneficiary.id}`
      : "http://localhost:5000/beneficiaries";
    const method = editingBeneficiary ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beneficiary),
    })
      .then((response) => response.json())
      .then((savedBeneficiary) => {
        if (editingBeneficiary) {
          dispatch(editBeneficiary(savedBeneficiary));
        } else {
          dispatch(addBeneficiary(savedBeneficiary));
        }
        handleCancel();
      })
      .catch((error) => {
        message.error("Error occurred while saving beneficiary");
      });
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:5000/beneficiaries/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          dispatch(removeBeneficiary(id));
          message.success("Beneficiary removed successfully");
        } else {
          message.error("Failed to remove beneficiary");
        }
      })
      .catch((error) => {
        message.error("Error occurred while removing beneficiary");
      });
  };

  return (
    <div className="Beneficiary_container">
      <div className="d-flex justify-content-between align-items-center mt-2">
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List of beneficiaries</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          style={{ backgroundColor: "#2ecc71" }}
          onClick={() => showModal()}
        >
          Add Beneficiary
        </Button>
      </div>
      <BeneficiaryList
        beneficiaries={beneficiaries}
        onEdit={showModal}
        onRemove={handleRemove}
      />
      <Modal
        title={editingBeneficiary ? "Edit Beneficiary" : "Add Beneficiary"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <BeneficiaryForm beneficiary={editingBeneficiary} onSave={handleSave} />
      </Modal>
    </div>
  );
};

export default ManageBeneficiaries;
