"use client"
import { Api } from '@/utils/GroupCoder';
import { EditOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Form, GetProp, Image, Input, Row, Upload, UploadProps, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {  useEffect, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const ViewProfile = (props: any) => {
    console.log("ViewProfile props", props);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [value, setValue] = useState('');
    const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [bgGradient, setBgGradient] = useState<string>(''); // State to hold the background gradient


    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    var dp = "";

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        } else {
            setLoading(false);
            message.error('something went wrong');
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const uploadProps: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            dp = info.file.name
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onFinish = async (value: any) => {
        try {
            const api = new Api(props.accessToken)
            const payload = {
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                bio: value.bio,
                dp: dp,
                banner: "string"
            }

            console.log(value);

            const apiRes = await api.Users.update()
            if (!apiRes.ok) {
                message.error("somthing went wrong")
                console.log("onfinish apiRes =>",apiRes);
                return 
            }
            message.success('Profile updated successfully');
            setIsFormDisabled(true);

        } catch (error) {
            console.log("user update error =>", error);
        }
    };

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

    const generateRandomGradient = () => {
        const color1 = generateRandomColor();
        const color2 = generateRandomColor();
        const gradient = `linear-gradient(to right, ${color1}, ${color2})`;
        return gradient;
      };

      useEffect(() => {
        setBgGradient(generateRandomGradient()); // Set the background gradient when the component mounts
      }, []);

    return (
        <div className=' h-[90vh] w-full flex items-center' style={{ background: bgGradient }}>
        <Card
            title="Profile"
            extra={isFormDisabled ? <EditOutlined onClick={() => setIsFormDisabled(false)} /> : ""}
            style={{ width: "50%" }}
        >
            <Form
                disabled={isFormDisabled}
                layout="vertical"
                onFinish={onFinish}
                initialValues={props}
            >
                <Flex gap={"small"} justify='center' align="center">
                    {/* <Card style={{ width: "40%" }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '450px' }}>
                            <span>
                                <Image
                                    width={300}
                                    style={{ borderRadius: "20px" }}
                                    src={imageUrl || src}
                                />
                                <div style={{ display: 'block' }}>
                                    <Upload {...uploadProps}>
                                        <Button style={{ width: 300, marginTop: '10px' }} icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </div>
                            </span>
                        </div>
                    </Card> */}
                    <Card style={{ width: "60%", padding: '50px 50px 10px 50px' }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="First name" name='firstName' required>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last name" name='lastName' required>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Email" name='email' required>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Bio" name='bio' required>
                            <TextArea
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Controlled autosize"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '70px 0px 0px 0px' }}>
                            <Button type='primary' htmlType='submit'>Save changes</Button>
                        </div>
                    </Card>
                </Flex>
            </Form>
        </Card>
                    </div>
    );
};

export default ViewProfile;
