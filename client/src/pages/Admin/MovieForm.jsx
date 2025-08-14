import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Input, Select, DatePicker, message } from "antd";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { hideGlobalLoader, showGlobalLoader } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../apicalls/movies";
import dayjs from "dayjs";


function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedMovie && formType === "edit") {
            form.setFieldsValue({
                ...selectedMovie,
                releaseDate: selectedMovie.releaseDate ? dayjs(selectedMovie.releaseDate) : null,
            });
        } else {
            form.resetFields();
        }
    }, [selectedMovie, formType, form]);

    const onFinish = async (values) => {
        try {
            dispatch(showGlobalLoader());
            let response = null;

            if (formType === "add") {
                response = await AddMovie(values);
            } else {
                response = await UpdateMovie(selectedMovie._id, values);
            }

            if (response?.success) {
                message.success(response.message || "Movie saved successfully");
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            } else {
                message.error(response?.error || "Something went wrong");
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            dispatch(hideGlobalLoader());
        }
    };

    return (
        <Modal
            title={formType === "add" ? "Add Movie" : "Edit Movie"}
            open={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title" rules={[{ required: true, message: "Please enter the movie name" }]}>
                            <Input placeholder="Enter movie name" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description" rules={[{ required: true, message: "Please enter a description" }]}>
                            <Input.TextArea rows={4} placeholder="Enter movie description" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration" name="duration" rules={[{ required: true, message: "Please enter duration" }]}>
                            <Input placeholder="e.g., 120 min" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name="language" rules={[{ required: true, message: "Please select a language" }]}>
                            <Select placeholder="Select Language">
                                <Select.Option value="english">English</Select.Option>
                                <Select.Option value="hindi">Hindi</Select.Option>
                                <Select.Option value="bengali">Bengali</Select.Option>
                                <Select.Option value="tamil">Tamil</Select.Option>
                                <Select.Option value="spanish">Spanish</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Release Date" name="releaseDate" rules={[{ required: true, message: "Please select a date" }]}>
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name="genre" rules={[{ required: true, message: "Please select a genre" }]}>
                            <Select placeholder="Select Genre">
                                <Select.Option value="action">Action</Select.Option>
                                <Select.Option value="comedy">Comedy</Select.Option>
                                <Select.Option value="drama">Drama</Select.Option>
                                <Select.Option value="horror">Horror</Select.Option>
                                <Select.Option value="romance">Romance</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster" rules={[{ required: true, message: "Please enter a poster URL" }]}>
                            <Input placeholder="Enter poster image URL" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end gap-2">
                    <Button title="Cancel" type="button" onClick={() => setShowMovieFormModal(false)} />
                    <Button title="Save" type="submit" />
                </div>
            </Form>
        </Modal>
    );
}

export default MovieForm;
