import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";

const { Option } = Select;

const countries = ["India", "US", "UK", "Canada", "Australia"];

const BeneficiaryForm = ({ beneficiary, onSave }) => {
  const { control, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    if (beneficiary) {
      setValue("fullName", beneficiary.fullName || "");
      setValue("address", beneficiary.address || "");
      setValue("country", beneficiary.country || ""); // Ensure beneficiary.country is not undefined
      setValue("pinCode", beneficiary.pinCode || "");
    }
  }, [beneficiary, setValue]);

  const onSubmit = (data) => {
    const url = beneficiary
      ? `http://localhost:5000/beneficiaries/${beneficiary.id}`
      : "http://localhost:5000/beneficiaries";
    const method = beneficiary ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(onSave);

    if (beneficiary) {
      data.id = beneficiary.id;
    }
    onSave(data);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Full Name" required>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Address" required>
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Country" required>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select {...field} defaultValue={beneficiary?.country || undefined}>
              {countries.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item label="PinCode" required>
        <Controller
          name="pinCode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {beneficiary ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BeneficiaryForm;
