import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonComponent from "../../../../../components/Button/ButtonComponent";
import { Combo, ComboRequest } from "../../../../../model/Combo";
import { Service } from "../../../../../model/Service";
import { comboApi } from "../../../../../service/comboApi";
import { serviceApi } from "../../../../../service/serviceApi";
import { formatVND } from "../../../../../utils/formatPrice";

interface ModalDetailProps {
  id: number;
  setRender: any;
}

const ModalDetail = ({ id, setRender }: ModalDetailProps) => {
  const [data, setData] = useState<Combo>();
  const [dataService, setDataService] = useState<Service[]>([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]); // Track selected services

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleSubmit = () => {
    form.submit();
  };

  const handleFinish = async (values: ComboRequest) => {
    try {
      setLoading(true);
      await comboApi.updateCombo(id, values);
      toast.success("Add combo success");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRender(true);
    }
  };

  const onSelectService = async (comboID: number, serviceID: number) => {
    try {
      await serviceApi.addServiceToCombo(comboID, serviceID);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleServiceChange = (selectedItems: number[]) => {
    setSelectedServices(selectedItems);
    calculateTotalPrice(selectedItems);
  };

  const calculateTotalPrice = (selectedServiceIDs: number[]) => {
    const total = selectedServiceIDs.reduce((acc, serviceID) => {
      const service: any = dataService.find((item: any) => item.value === serviceID);
      return acc + (service ? service.price : 0);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await comboApi.getDetailCombo(id);
        setData(response);
        form.setFieldsValue({
          comboName: response.comboName,
          comboPrice: response.comboPrice,
          comboDescription: response.comboDescription,
        });
        const defaultServices = response.comboDetails.map(
          (element: any) => element.serviceID
        );
        setSelectedServices(defaultServices);
        calculateTotalPrice(defaultServices);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchService = async () => {
      try {
        const response = await serviceApi.getAllServic();
        const filterData = response.map((element: Service) => ({
          label: (
            <p className="text-sm">
              {element.serviceName} - {formatVND(element.servicePrice)}
            </p>
          ),
          value: element.serviceID,
          price: element.servicePrice, // Store price in option
        }));
        setDataService(filterData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (id && open) {
      fetchData();
      fetchService();
    }
  }, [form, id, open]);
  return (
    <>
      <ButtonComponent onClick={() => setOpen(true)}>Detail</ButtonComponent>
      <Modal
        width={800}
        loading={loading}
        title="Detail combo"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key={"update"} onClick={handleSubmit}>
            Update
          </Button>,
        ]}
      >
        {open && (
          <>
            <Form labelCol={{ span: 24 }} form={form} onFinish={handleFinish}>
              <Form.Item
                name={"comboName"}
                label="Combo Name"
                rules={[{ required: true, message: "Must not be emtpy" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"comboPrice"}
                label="Combo Price"
                rules={[{ required: true, message: "Must not be emtpy" }]}
              >
                <InputNumber
                  type="number"
                  controls={false}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                name={"comboDescription"}
                label="Combo Description"
                rules={[{ required: true, message: "Must not be emtpy" }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Form>
            <div className="flex flex-row gap-5 flex-wrap items-center">
              <p>
                Service{" "}
                <span className="text-red-500 font-bold">
                  (The total of service add must not be greater than combo price
                  is {formatVND(data ? data?.comboPrice : 0)})
                </span>
                :
              </p>
              <Select
                mode="multiple"
                placeholder="Select"
                style={{ width: "100%" }}
                options={dataService}
                value={selectedServices}
                onChange={handleServiceChange}
                onSelect={(item) =>
                  onSelectService(data ? data?.comboID : 0, item)
                }
                onDeselect={(item) => console.log(item)}
              />
            </div>
            <div className="mt-4">
              <p className="font-bold">
                Total Price of Selected Services: {formatVND(totalPrice)}
              </p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalDetail;
