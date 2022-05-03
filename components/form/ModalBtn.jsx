import React from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, } from 'antd';
import { useState } from 'react';
import SignUpForm from '../form/SignUpForm';
import LoginForm from '../form/LoginForm';

const ModalBtn = ({ btnName }) => {

  const selectedModal = btnName === '로그인' ? <LoginForm /> : <SignUpForm />
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={()=> showModal()}>
          {btnName}
      </Button>
      <Modal 
        title={btnName}
        visible={isModalVisible} 
        onOk={() => handleClose()} 
        onCancel={() => handleClose()}
        footer={''} 
        >
        {selectedModal}
      </Modal>
    </div>
  )
}

ModalBtn.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default ModalBtn