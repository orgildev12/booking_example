import { Button, Form, Input } from "antd"
import { Roboto } from "next/font/google"
import { twMerge } from "tailwind-merge"

const robotoFont = Roboto({
  weight: ['500', '700'],
  subsets: ['cyrillic']
})

const ChangeFlight = () => {
  return (
    <div className="p-4 pb-8 rounded-xl">
      <Form
        className="flex items-center gap-3 flex-wrap"
        layout="vertical"
        onFinish={() => window.open("https://digital.miat.com/booking/manage-booking/retrieve?lang=mn", '_blank').focus()}>
        <Form.Item 
          className="md:flex-1 w-full" 
          name="prn" 
          label={<div className={twMerge("font-medium text-foreground")}>Захиалгын дугаар (PNR):</div>}
          rules={[
            {
              required: true,
              message: 'Захиалгын дугаар заавал оруулана уу!'
            }
          ]}
          extra={`6 үсэг, тоон тэмдэгт бүхий код оруулана уу`}>
          <Input placeholder="######" variant="underlined" size="large">

          </Input>
        </Form.Item>
        <Form.Item 
          className="md:flex-1 w-full" 
          name="name" 
          label={<div className={twMerge("font-medium text-foreground")}>Эцэг/эхийн нэр:</div>}
          extra={" "}>
          <Input placeholder="Таны эцэг эхийн нэр" variant="underlined" size="large">

          </Input>
        </Form.Item>
        <Form.Item noStyle label={null}>
          <Button type="primary" size="large" htmlType="submit">
            Захиалга хайх
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangeFlight