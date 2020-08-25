import React, { useState, useEffect } from 'react';
import {
  Button, Modal, Input, message,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.less';
import gwRequest from '../../utils/request';

export default function List() {
  const [deleteModal, setDeleteModal] = useState();
  const [addModal, setAddModal] = useState();
  const [editModal, setEditModal] = useState();
  const [list, setList] = useState();

  function getList() {
    gwRequest({
      path: '/api/project/item/list',
    }).then((res) => {
      setList(res.data.data || []);
    });
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.btns}>
          <Button
            type="primary"
            onClick={() => setAddModal(true)}
          >添加楼盘
          </Button>
        </div>
        <ul className={styles.list}>
          {list && list.map((item) => (
            <li className={styles.item} key={item.adId}>
              <img className={styles.img} src={item.coverPic?.split(/\s+/)[0]} alt="" />
              <h3 className={styles.title}>
                {item.display_name}
                <EditOutlined
                  style={{ marginLeft: 5 }}
                  onClick={() => setEditModal({ adTitle: item.adTitle, adId: item.adId })}
                />
              </h3>
              <a
                onClick={() => setDeleteModal(item.adId)}
                className={styles.delete}
              >删除
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* 添加modal */}
      {addModal && (
      <AddModal
        onReFresh={getList}
        onCancel={() => setAddModal(false)}
      />
      )}
      {/* 修改modal */}
      {editModal && (
      <EditModal
        onReFresh={getList}
        estateName={editModal.adTitle}
        adId={editModal.adId}
        onCancel={() => setEditModal(false)}
      />
      )}
      {/* 删除modal */}
      {deleteModal && (
      <DelModal
        adId={deleteModal}
        onReFresh={getList}
        onCancel={() => setDeleteModal(false)}
      />
      )}
    </>
  );
}

function EditModal({
  estateName, adId, onCancel, onReFresh,
}) {
  const [adTitle, setAdTitle] = useState(estateName);
  function handleSave() {
    gwRequest({
      method: 'POST',
      path: `/promotion/${adId}/update`,
      json: {
        adTitle,
      },
    }).then(() => {
      message.success('修改成功');
      onReFresh();
      onCancel();
    });
  }
  return (
    <Modal
      closable={false}
      title="修改楼盘名称"
      visible
      onOk={handleSave}
      onCancel={onCancel}
      okText="保存"
      cancelText="取消"
      okButtonProps={{ disabled: !estateName }}
    >
      <Input
        placeholder="楼盘名称"
        value={adTitle}
        onChange={(e) => setAdTitle(e.target.value)}
      />
    </Modal>
  );
}

function AddModal({ onCancel, onReFresh }) {
  const [estateName, setEstateName] = useState();
  function handleAdd() {
    gwRequest({
      method: 'POST',
      path: '/promotion/add',
      json: {
        adTitle: estateName,
        coverPic: 'https://oss-public.fangdd.com/prod/static/FrpPJTZBuPp5ZQaH7GQ0QWgCAl0M.jpg',
        uiConfig: JSON.stringify(defaultConfigJson),
      },
    }).then(() => {
      message.success('添加成功');
      onReFresh();
      onCancel();
    });
  }
  return (
    <Modal
      closable={false}
      title="添加楼盘"
      visible
      onOk={handleAdd}
      onCancel={onCancel}
      okText="添加"
      cancelText="取消"
      okButtonProps={{ disabled: !estateName }}
    >
      <Input
        placeholder="楼盘名称"
        value={estateName}
        onChange={(e) => setEstateName(e.target.value)}
      />
    </Modal>
  );
}

function DelModal({ onCancel, onReFresh, adId }) {
  const [delConfirmValue, setDelConfirmValue] = useState();
  function handleDelete() {
    gwRequest({
      method: 'DELETE',
      action: 'deletePage',
      qs: {
        adId,
      },
    }).then(() => {
      message.success('删除成功');
      onReFresh();
      onCancel();
    });
  }
  return (
    <Modal
      visible
      title="删除楼盘"
      closable={false}
      onOk={handleDelete}
      onCancel={onCancel}
      okText="删除"
      cancelText="取消"
      okButtonProps={{ disabled: delConfirmValue !== '确认删除' }}
    >
      <div>请输入“确认删除”</div>
      <Input value={delConfirmValue} onChange={(e) => setDelConfirmValue(e.target.value)} />
    </Modal>
  );
}
