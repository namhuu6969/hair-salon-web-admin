import { Button, Form, Modal, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonComponent from "../../../../components/Button/ButtonComponent";
import { Stylist } from "../../../../model/Stylist";
import { scheduleApi } from "../../../../service/scheduleApi";
import { stylistApi } from "../../../../service/stylistApi";

dayjs.extend(customParseFormat);

const { Option } = Select;

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

interface ModalAddScheduleProps {
  setRender: any;
}

const ModalAddSchedule = ({ setRender }: ModalAddScheduleProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stylist, setStylist] = useState<any[]>([]);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpen(false);
    form.resetFields(); // Reset the form fields when the modal closes
  };

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const details = values.schedules.map((schedule: any) => ({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime.format("HH:mm:ss"),
        endTime: schedule.endTime.format("HH:mm:ss"),
      }));
      const stylistID = values.stylist;

      const body = { details };
      await scheduleApi.createScheduleForstylist(stylistID, body);
      setRender(true)
      handleCancel();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await stylistApi.getAllStylist();
        const filteredResponse = response.data.map((element: Stylist) => ({
          value: element.stylistID,
          label: element.stylistName,
        }));
        setStylist(filteredResponse);
      } catch (error: any) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ButtonComponent onClick={() => setOpen(true)}>
        Add schedule
      </ButtonComponent>
      <Modal
        loading={loading}
        onCancel={handleCancel}
        open={open}
        footer={null}
        title="Add Schedule"
        width={1000}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{ schedules: [{}] }}
          className="flex flex-col gap-5"
        >
          <Form.Item
            name={"stylist"}
            label={"Choose Stylist:"}
            rules={[{ required: true, message: "Must not be empty" }]}
          >
            <Select className="!w-1/3" options={stylist} />
          </Form.Item>
          <p>Schedule for stylist:</p>
          <Form.List name="schedules">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    key={key}
                    className="grid grid-cols-4 items-center gap-x-5"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "dayOfWeek"]}
                      label={"Day of week"}
                      rules={[{ required: true, message: "Select a day" }]}
                    >
                      <Select placeholder="Select Day" className="!w-full">
                        {daysOfWeek.map((day) => (
                          <Option key={day} value={day}>
                            {day}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "startTime"]}
                      label={"Start time"}
                      rules={[{ required: true, message: "Select start time" }]}
                    >
                      <TimePicker className="!w-full" format="HH:mm" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "endTime"]}
                      label={"End time"}
                      rules={[{ required: true, message: "Select end time" }]}
                    >
                      <TimePicker className="!w-full" format="HH:mm" />
                    </Form.Item>
                    {index > 0 && (
                      <Button danger onClick={() => remove(name)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Schedule
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSchedule;
