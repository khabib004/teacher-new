import { Button, Checkbox, Form, Input, message, Modal, Space, Table, } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import request from '../server';

const TeachersPage = () => {
  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'image',
      dataIndex: 'avatar',
      key: 'avatar',
      render: ( data, row ) => {
        return <img height={50} src={data} alt={row.firstName + row.lastName} />;
      },
    },
    {
      title: 'isMarried',
      key: 'isMarried',
      dataIndex: 'isMarried',
      render: ( data ) => ( data ? "Yes" : "No" ),
    },
    {
      title: 'Action',
      key: 'action',
      render: ( _, record ) => {
        return (
          <Space size="middle">
            <Button type='primary' onClick={() => edit(record.id)}>Edit  </Button>
            <Button danger type='primary'>Delete </Button>
          </Space>
        );
      },
    },
  ];

  const [ form ] = Form.useForm();
  const [ data, setData ] = useState( [] );
  const [ isModalOpen, setIsModalOpen ] = useState( false );

  useEffect( () => {
    getData();
  }, [] );
  async function getData() {
    try {
      let { data } = await request.get( 'teacher' )
      setData( data )

    } catch ( err ) {
      message.error
    }
  }
  const showModal = () => {
    form.resetFields();
    setIsModalOpen( true );
  };
  const handleOk = async() => {
    try {
      const values = await form.validateFields();
      await request.post('teacher', values);
      getData();
      setIsModalOpen( false );
      
    } catch(err){
      console.log(err);
    }
  };
  const handleCancel = () => {
    setIsModalOpen( false );
  };
  async function edit (id) {
    setIsModalOpen(true);
    let {data} = request.get(`teacher/${id}`);
    form.setFieldValue(data);
  }
  return (
    <Fragment>
      <Table bordered title={() =>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Teachers ({data.length})</h1>
          <Button onClick={showModal} type='primary'>Add</Button>
        </div>} columns={columns} dataSource={data} />
      <Modal title="Teacher data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="FirstName"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please Fill',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="LastName"
            name="LastName"
            rules={[
              {
                required: true,
                message: 'Please Fill',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: 'Please Fill',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isMarried"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
            okTeaxt="Add teacher"
          >
            <Checkbox>isMarried</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment >
  );
};

export default TeachersPage;